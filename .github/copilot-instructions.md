# Copilot / agent instructions

This repository is a **vanilla HTML + JavaScript** site styled with **Tailwind CSS**, deployed to GitHub Pages.
There is no React, no TypeScript, no bundler, and no component library. Do not introduce one.

## Stack

- Plain `.html` and browser-global `.js` files loaded with `<script src>` tags. No modules, no build step for JS.
- Tailwind CSS v3 compiled by the Tailwind CLI (`npm run build`) from `input.css` into `styles.css`.
- Font Awesome and Google Fonts are loaded from CDNs in `index.html`.

## Code guidelines

- Style with Tailwind utility classes. Only add custom CSS to `input.css`, inside `@layer components`, when a utility genuinely cannot express it (for example the resize handle gradient).
- `styles.css` is **generated**. Never hand-edit it. After changing any class in an `.html` or `.js` file, run `npm run build` and commit the result - CI fails if it is stale.
- `apps.js` holds the app registry and is the single source of truth for app metadata. Adding an app there wires up its desktop icon, start menu entry, and taskbar button. Do not hardcode app lists anywhere else.
- Keep window/DOM logic in `window-manager.js` and app content in `apps.js`.
- Use `const`/`let`, arrow functions, and descriptive names. Event handlers are named with a `handle` prefix or passed inline for trivial cases.
- Prefer early returns over deep nesting.
- When injecting data into `innerHTML`, run it through the `escapeHtml` helper in `apps.js`. Never interpolate user-typed text into `innerHTML` - use `textContent`.

## Accessibility

Anything clickable must be a real `<button>` or `<a>`, not a `div` with an `onclick`.
Icon-only controls need an `aria-label`; decorative icons need `aria-hidden="true"`.
Images need `alt` text. Keep keyboard focus visible and make sure new UI can be reached with Tab.

## Before finishing

Run `npm run format` and `npm run build`, and verify the change in a browser at both desktop and mobile widths.
