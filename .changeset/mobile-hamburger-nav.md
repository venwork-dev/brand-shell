---
"brand-shell": minor
---

Add mobile hamburger navigation to the Header component.

All adapters (React, Web Component, Vue, Svelte) now render a hamburger toggle button when nav content is present. The menu opens and closes via `aria-expanded`, which drives CSS show/hide with no extra JS class manipulation. Keyboard (Escape) and outside-click gestures close the drawer. No API changes — existing `navLinks`, CTA, and social-link props continue to work as before.
