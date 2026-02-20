<script>
  import { brandShell } from "brand-shell/svelte";
  import "brand-shell/default.css";

  const shellProps = {
    details: {
      name: "Brand Shell",
      homeHref: "/",
      navLinks: [
        { label: "Docs", href: "/docs" },
        { label: "Blog", href: "/blog" }
      ],
      primaryAction: { label: "Contact", href: "mailto:hello@example.com" },
      secondaryAction: {
        label: "Storybook",
        href: "https://6992723e39539a58d711f188-ceiwmlxyrh.chromatic.com/",
        target: "_blank"
      },
      github: "https://github.com/venwork-dev/brand-shell",
      linkedin: "https://linkedin.com/in/example",
      gmail: "hello@example.com",
      tagline: "Starter app validating npm package publish output."
    },
    theme: {
      primaryColor: "#2563eb",
      backgroundColor: "#0f172a",
      textColor: "#f8fafc"
    }
  };
</script>

<brand-header use:brandShell={shellProps}></brand-header>
<main style="padding: 1rem;">
  <h1 style="margin: 0; font-size: 1.25rem;">Starter smoke (Svelte)</h1>
  <p style="margin-top: 0.5rem;">This app validates the published npm artifact through the Svelte adapter.</p>
</main>
<brand-footer use:brandShell={shellProps}></brand-footer>
