import { Footer, Header } from "brand-shell";
import "brand-shell/default.css";

const details = {
  name: "Brand Shell",
  homeHref: "/",
  navLinks: [
    { label: "Docs", href: "/docs" },
    { label: "Blog", href: "/blog" },
  ],
  primaryAction: { label: "Contact", href: "mailto:hello@example.com" },
  secondaryAction: {
    label: "Storybook",
    href: "https://6992723e39539a58d711f188-ceiwmlxyrh.chromatic.com/",
    target: "_blank",
  },
  github: "https://github.com/venwork-dev/brand-shell",
  linkedin: "https://linkedin.com/in/example",
  email: "hello@example.com",
  tagline: "Starter app consuming npm dist-tags.",
};

const theme = {
  primaryColor: "#2563eb",
  backgroundColor: "#0f172a",
  textColor: "#f8fafc",
};

export function App() {
  return (
    <>
      <Header details={details} theme={theme} />
      <main style={{ padding: "1rem" }}>
        <h1 style={{ margin: 0, fontSize: "1.25rem" }}>Starter smoke</h1>
        <p style={{ marginTop: "0.5rem" }}>
          This app validates the published npm artifact through the React adapter.
        </p>
      </main>
      <Footer details={details} theme={theme} />
    </>
  );
}
