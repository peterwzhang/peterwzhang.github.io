# Peter Zhang - Portfolio

A portfolio site built as a browser-based desktop environment ("PeterOS").
Vanilla HTML and JavaScript, styled with Tailwind CSS, hosted on GitHub Pages.

## Features

- **OS Simulator Theme**: An interactive desktop environment with windows, a taskbar, and a start menu.
- **Window Management**: Open, close, minimize, maximize, drag, and resize windows. Windows stay inside the viewport and reflow when the browser is resized.
- **Terminal**: A working command line - try `help`.
- **Dark Mode**: Persisted to `localStorage` and applied before first paint, so there is no flash on reload.
- **Keyboard Accessible**: Every control is reachable by keyboard, with `Escape` to close the focused window.
- **No-JS Fallback**: A `<noscript>` block carries the real content for crawlers and link previews.

## Project structure

| File                | Purpose                                                                                                                                                                     |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `index.html`        | Page shell: taskbar, start menu, lock and shutdown screens. Contains no app content.                                                                                        |
| `apps.js`           | The app registry - the single source of truth for every app's id, title, icon, colour, and markup. Desktop icons, the start menu, and the taskbar are all rendered from it. |
| `window-manager.js` | Window lifecycle, dragging, resizing, focus, the clock, and dark mode.                                                                                                      |
| `projects-data.js`  | Project entries shown in the Projects app.                                                                                                                                  |
| `books-data.js`     | Book entries shown in the Library app.                                                                                                                                      |
| `input.css`         | Tailwind entrypoint plus the handful of custom component styles.                                                                                                            |
| `styles.css`        | **Generated** by `npm run build`. Committed because GitHub Pages serves the repo as-is. Never edit by hand.                                                                 |

## Setup & Development

```bash
git clone https://github.com/peterwzhang/peterwzhang.github.io.git
cd peterwzhang.github.io
npm install
```

Build the stylesheet, or rebuild it automatically while you work:

```bash
npm run build    # one-off, minified
npm run watch    # rebuild on change
```

Then open `index.html` in a browser.

Before committing, format and rebuild:

```bash
npm run format
npm run build
```

CI runs `format:check` and rebuilds `styles.css`, failing if the committed copy is out of date.

## Customization

- **Projects**: edit `projects-data.js`.
- **Books**: edit `books-data.js` (covers are fetched from OpenLibrary by ISBN).
- **Apps, icons, start menu**: edit the registry in `apps.js` - adding an entry with `showOnDesktop` / `showInStartMenu` wires up the desktop icon, start menu entry, and taskbar button at once.
- **Profile and links**: the `PROFILE` object at the top of `apps.js`.

## Deployment

Pushing to `master` publishes the site via GitHub Pages.
Because `styles.css` is committed, make sure `npm run build` has been run and the result committed alongside any markup or class changes.
