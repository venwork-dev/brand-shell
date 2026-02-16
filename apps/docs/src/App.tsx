import { useMemo, useState } from "react";

import Ajv2020, { type ErrorObject } from "ajv/dist/2020";

import {
  Footer,
  Header,
  type BrandDetails,
  type BrandTheme,
  validateBrandDetails,
  validateBrandTheme,
} from "brand-shell";
import schema from "brand-shell/schema";
import "brand-shell/default.css";

type Framework = "react" | "next" | "tanstack" | "vue" | "svelte" | "web";

const DEFAULT_DETAILS: BrandDetails = {
  name: "Brand Shell",
  homeHref: "/",
  navLinks: [
    { label: "Docs", href: "/docs" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
  ],
  primaryAction: { label: "Contact", href: "mailto:hello@example.com" },
  secondaryAction: { label: "GitHub", href: "https://github.com/example", target: "_blank" },
  website: "https://brand-shell.dev",
  linkedin: "https://linkedin.com/in/example",
  github: "https://github.com/example",
  twitter: "https://x.com/example",
  gmail: "hello@example.com",
  tagline: "One shared brand shell across frameworks.",
};

const DEFAULT_THEME: BrandTheme = {
  primaryColor: "#0ea5e9",
  backgroundColor: "#0f172a",
  textColor: "#f8fafc",
  linkColor: "#94a3b8",
  fontFamily: '"Space Grotesk", system-ui, sans-serif',
  socialIconSize: "2.25rem",
};

const DEFAULT_DETAILS_TEXT = JSON.stringify(DEFAULT_DETAILS, null, 2);
const DEFAULT_THEME_TEXT = JSON.stringify(DEFAULT_THEME, null, 2);
const FRAMEWORK_ORDER: Framework[] = ["react", "next", "tanstack", "vue", "svelte", "web"];
const FRAMEWORK_LABELS: Record<Framework, string> = {
  react: "React",
  next: "Next.js",
  tanstack: "TanStack",
  vue: "Vue",
  svelte: "Svelte",
  web: "Web",
};

const FRAMEWORK_SNIPPETS: Record<Framework, string> = {
  react: `import { Header, Footer } from "brand-shell";
import "brand-shell/default.css";

<Header details={details} theme={theme} />
<Footer details={details} theme={theme} />`,
  next: `import { Header, Footer } from "brand-shell";
import "brand-shell/default.css";

// app/page.tsx (Next App Router)
export default function Page() {
  return (
    <>
      <Header details={details} theme={theme} />
      <Footer details={details} theme={theme} />
    </>
  );
}`,
  tanstack: `import { createRootRoute, createRoute, createRouter, RouterProvider } from "@tanstack/react-router";
import { Header, Footer } from "brand-shell";
import "brand-shell/default.css";

// Route component
function Home() {
  return (
    <>
      <Header details={details} theme={theme} />
      <Footer details={details} theme={theme} />
    </>
  );
}`,
  vue: `import { BrandHeader, BrandFooter } from "brand-shell/vue";
import "brand-shell/default.css";

<BrandHeader :details="details" :theme="theme" />
<BrandFooter :details="details" :theme="theme" />`,
  svelte: `import { brandShell } from "brand-shell/svelte";
import "brand-shell/default.css";

<brand-header use:brandShell={{ details, theme }} />
<brand-footer use:brandShell={{ details, theme }} />`,
  web: `import { applyBrandShellProps, registerBrandShellElements } from "brand-shell/web";
import "brand-shell/default.css";

registerBrandShellElements();
applyBrandShellProps(headerElement, { details, theme });
applyBrandShellProps(footerElement, { details, theme });`,
};

const HOW_IT_WORKS = [
  {
    title: "Single Contract",
    description: "All adapters accept the same BrandDetails and BrandTheme payloads.",
  },
  {
    title: "Shared Core",
    description: "Normalization + validation live in core, so adapter behavior stays aligned.",
  },
  {
    title: "Framework Adapters",
    description: "React, Next.js, TanStack Router, Vue, Svelte, and Web adapters render from the same normalized model.",
  },
];

const SECURITY_GUARDS = [
  {
    title: "Safe Link Protocols",
    description: "Core normalization allows only http/https/mailto/tel or relative paths and strips unsafe URLs.",
  },
  {
    title: "Blank-Target Hardening",
    description: "Links that open in new tabs always include noopener/noreferrer for safer cross-window behavior.",
  },
  {
    title: "No HTML Injection Path",
    description: "Adapters render user values as text/attributes, not raw HTML, reducing XSS risk by design.",
  },
  {
    title: "Schema + Runtime Validation",
    description: "JSON Schema and core validators provide explicit, test-backed contract checks before rendering.",
  },
];

const DOCS_SHELL_DETAILS: BrandDetails = {
  name: "Brand Shell",
  homeHref: "#top",
  navLinks: [
    { label: "How it works", href: "#how-it-works" },
    { label: "Frameworks", href: "#quickstart" },
    { label: "Security", href: "#security" },
    { label: "Playground", href: "#playground" },
  ],
  primaryAction: { label: "Try Live Preview", href: "#preview" },
  tagline: "Build once. Reuse everywhere with one validated shell contract.",
};

const DOCS_SHELL_THEME: BrandTheme = {
  primaryColor: "#2dd4bf",
  backgroundColor: "rgba(2, 6, 23, 0.94)",
  textColor: "#f8fafc",
  linkColor: "#cbd5e1",
  fontFamily: '"Space Grotesk", "Manrope", system-ui, sans-serif',
};

const SECTION_SHORTCUTS = [
  { label: "How", href: "#how-it-works" },
  { label: "Frameworks", href: "#quickstart" },
  { label: "Security", href: "#security" },
  { label: "Playground", href: "#playground" },
  { label: "Preview", href: "#preview" },
];

const fallbackDetails = validateBrandDetails(DEFAULT_DETAILS).normalized ?? DEFAULT_DETAILS;
const fallbackTheme = validateBrandTheme(DEFAULT_THEME).normalized ?? DEFAULT_THEME;

type JsonParseResult = {
  error: string | null;
  value: unknown;
};

type RuntimeValidationState = {
  detailsErrors: string[];
  themeErrors: string[];
  schemaErrors: string[];
  normalizedDetails: BrandDetails | null;
  normalizedTheme: BrandTheme | null;
  valid: boolean;
};

function parseJson(text: string, label: "details" | "theme"): JsonParseResult {
  try {
    return { error: null, value: JSON.parse(text) };
  } catch (error) {
    return {
      error: `${label} JSON parse error: ${(error as Error).message}`,
      value: null,
    };
  }
}

function formatAjvErrors(errors: ErrorObject[] | null | undefined): string[] {
  if (!errors || errors.length === 0) return [];
  return errors.map((error) => {
    const path = error.instancePath || "/";
    const additionalProperty =
      error.keyword === "additionalProperties" && typeof error.params === "object"
        ? (error.params as { additionalProperty?: string }).additionalProperty
        : undefined;
    if (additionalProperty) {
      return `${path} ${error.message}: ${additionalProperty}`;
    }
    return `${path} ${error.message}`;
  });
}

export default function App() {
  const [detailsText, setDetailsText] = useState(DEFAULT_DETAILS_TEXT);
  const [themeText, setThemeText] = useState(DEFAULT_THEME_TEXT);
  const [activeFramework, setActiveFramework] = useState<Framework>("react");

  const schemaValidator = useMemo(() => {
    const ajv = new Ajv2020({
      allErrors: true,
      strict: false,
    });
    return ajv.compile(schema as object);
  }, []);

  const validation = useMemo<RuntimeValidationState>(() => {
    const detailsParse = parseJson(detailsText, "details");
    const themeParse = parseJson(themeText, "theme");

    const detailsResult =
      detailsParse.error == null ? validateBrandDetails(detailsParse.value) : { valid: false, errors: [], normalized: null };
    const themeResult =
      themeParse.error == null ? validateBrandTheme(themeParse.value) : { valid: false, errors: [], normalized: null };

    const detailsErrors = detailsParse.error
      ? [detailsParse.error]
      : detailsResult.valid
        ? []
        : detailsResult.errors;
    const themeErrors = themeParse.error ? [themeParse.error] : themeResult.valid ? [] : themeResult.errors;

    const payload =
      detailsParse.error || themeParse.error
        ? null
        : {
            details: detailsParse.value,
            theme: themeParse.value,
          };

    let schemaErrors: string[] = [];
    if (payload) {
      const schemaIsValid = schemaValidator(payload);
      if (!schemaIsValid) {
        schemaErrors = formatAjvErrors(schemaValidator.errors);
      }
    }

    return {
      detailsErrors,
      themeErrors,
      schemaErrors,
      normalizedDetails: detailsResult.valid ? detailsResult.normalized : null,
      normalizedTheme: themeResult.valid ? themeResult.normalized : null,
      valid: detailsErrors.length === 0 && themeErrors.length === 0 && schemaErrors.length === 0,
    };
  }, [detailsText, themeText, schemaValidator]);

  const previewDetails = validation.normalizedDetails ?? fallbackDetails;
  const previewTheme = validation.normalizedTheme ?? fallbackTheme;

  return (
    <div className="docs-site" id="top">
      <Header className="docs-site-header" details={DOCS_SHELL_DETAILS} theme={DOCS_SHELL_THEME} />
      <div className="docs-app">
        <header className="hero">
          <div className="hero__badge">Brand Shell Dev Webapp</div>
          <h1>Build once. Reuse everywhere.</h1>
          <p>
            Brand Shell gives you a shared, validated header/footer contract across React, Next.js, TanStack Router, Vue,
            Svelte, and Web Components.
            Test payloads here before integrating with customer apps.
          </p>
        </header>
        <nav className="section-shortcuts" aria-label="Section shortcuts">
          {SECTION_SHORTCUTS.map((shortcut) => (
            <a key={shortcut.href} className="section-shortcuts__link" href={shortcut.href}>
              {shortcut.label}
            </a>
          ))}
        </nav>

        <main className="content-grid">
          <section className="panel" id="how-it-works">
            <h2>How it works</h2>
            <div className="work-grid">
              {HOW_IT_WORKS.map((item) => (
                <article key={item.title} className="work-card">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="panel" id="quickstart">
            <h2>Framework quickstart</h2>
            <div className="framework-tabs">
              {FRAMEWORK_ORDER.map((framework) => (
                <button
                  key={framework}
                  className={framework === activeFramework ? "tab tab--active" : "tab"}
                  onClick={() => setActiveFramework(framework)}
                  type="button"
                >
                  {FRAMEWORK_LABELS[framework]}
                </button>
              ))}
            </div>
            <pre className="code-block">
              <code>{FRAMEWORK_SNIPPETS[activeFramework]}</code>
            </pre>
          </section>

          <section className="panel panel--security" id="security">
            <h2>Security by default</h2>
            <div className="security-grid">
              {SECURITY_GUARDS.map((item) => (
                <article key={item.title} className="security-card">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="panel panel--playground" id="playground">
            <div className="panel__header">
              <h2>Contract playground</h2>
              <button
                className="ghost-button"
                onClick={() => {
                  setDetailsText(DEFAULT_DETAILS_TEXT);
                  setThemeText(DEFAULT_THEME_TEXT);
                }}
                type="button"
              >
                Reset defaults
              </button>
            </div>

            <div className="playground-grid">
              <label className="editor">
                <span>details (BrandDetails)</span>
                <textarea value={detailsText} onChange={(event) => setDetailsText(event.target.value)} />
              </label>
              <label className="editor">
                <span>theme (BrandTheme)</span>
                <textarea value={themeText} onChange={(event) => setThemeText(event.target.value)} />
              </label>
            </div>

            <div className={validation.valid ? "status status--ok" : "status status--warn"}>
              {validation.valid
                ? "Payload is valid. Preview uses your edited contract."
                : "Validation errors detected. Preview is using safe fallback values."}
            </div>

            <div className="error-grid">
              <ErrorList title="Core Details Validation" errors={validation.detailsErrors} />
              <ErrorList title="Core Theme Validation" errors={validation.themeErrors} />
              <ErrorList title="JSON Schema (Ajv) Validation" errors={validation.schemaErrors} />
            </div>
          </section>

          <section className="panel panel--preview" id="preview">
            <h2>Live preview</h2>
            <div className="preview-shell">
              <Header details={previewDetails} theme={previewTheme} />
              <main className="preview-main">
                <h3>Integration Preview</h3>
                <p>
                  This preview uses the same adapter and normalized contract you will use in consuming apps.
                  Fix validation errors before shipping configuration to customers.
                </p>
              </main>
              <Footer details={previewDetails} theme={previewTheme} />
            </div>
          </section>
        </main>
      </div>
      <Footer className="docs-site-footer" details={DOCS_SHELL_DETAILS} theme={DOCS_SHELL_THEME} />
    </div>
  );
}

function ErrorList({ title, errors }: { title: string; errors: string[] }) {
  return (
    <div className="error-list">
      <h3>{title}</h3>
      {errors.length === 0 ? (
        <p className="ok-text">No issues</p>
      ) : (
        <ul>
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
