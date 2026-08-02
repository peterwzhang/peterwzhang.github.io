// PeterOS window manager: desktop icons, start menu, taskbar and windows.
// Every app it renders comes from window.PeterOSApps (see apps.js).

const TASKBAR_HEIGHT = 48;
const HEADER_HEIGHT = 36;
// How much of a window must stay on screen so it can always be dragged back.
const MIN_VISIBLE = 80;
const MOBILE_BREAKPOINT = 768;

const isMobileViewport = () => window.innerWidth < MOBILE_BREAKPOINT;

// Mouse events carry clientX/clientY, touch events carry them on touches[0].
// `??` rather than `||` so a legitimate coordinate of 0 survives.
const getClientCoords = (event) => {
  const touch = event.touches && event.touches[0];
  return {
    x: event.clientX ?? (touch && touch.clientX),
    y: event.clientY ?? (touch && touch.clientY),
  };
};

window.WindowManager = {
  windows: {},
  zIndex: 100,
  activeWindow: null,
  windowCount: 0,
  darkMode: false,

  get apps() {
    return window.PeterOSApps;
  },

  init() {
    // The theme class is already on <html> (set by the inline head script, so
    // there is no flash); this just syncs our own state to it.
    this.darkMode = document.documentElement.classList.contains('dark');

    this.renderDesktopIcons();
    this.renderStartMenu();
    this.updateClock();
    setInterval(() => this.updateClock(), 1000);

    document.addEventListener('click', (event) => {
      const startMenu = document.getElementById('start-menu');
      const startButton = document.getElementById('start-button');
      if (!startMenu.contains(event.target) && !startButton.contains(event.target)) {
        this.closeStartMenu();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      const startMenu = document.getElementById('start-menu');
      if (!startMenu.classList.contains('hidden')) {
        this.closeStartMenu();
        document.getElementById('start-button').focus();
      } else if (this.activeWindow) {
        this.closeWindow(this.activeWindow);
      }
    });

    // Windows are positioned in pixels, so they have to be pulled back into
    // view when the viewport changes (rotation, browser resize).
    window.addEventListener('resize', () => {
      Object.entries(this.windows).forEach(([appId, win]) => {
        if (win.maximized) return;
        this.fitToViewport(win.element);
      });
    });
  },

  toggleDarkMode(force) {
    this.darkMode = force !== undefined ? force : !this.darkMode;
    document.documentElement.classList.toggle('dark', this.darkMode);
    localStorage.setItem('darkMode', this.darkMode);

    const toggle = document.getElementById('dark-mode-toggle');
    if (toggle) toggle.checked = this.darkMode;
  },

  // --- Chrome: desktop, start menu, taskbar ------------------------------

  renderDesktopIcons() {
    const desktop = document.getElementById('desktop');
    desktop.innerHTML = Object.values(this.apps)
      .filter((app) => app.showOnDesktop)
      .map(
        (app) => `
        <button type="button" class="desktop-icon flex flex-col items-center gap-1 p-2 rounded cursor-pointer transition-colors group w-28"
                onclick="WindowManager.openWindow('${app.id}')">
          <span class="w-12 h-12 bg-white dark:bg-gray-700 rounded-lg shadow-md flex items-center justify-center text-2xl ${app.color} group-hover:scale-105 transition-transform">
            <i class="${app.icon}" aria-hidden="true"></i>
          </span>
          <span class="text-white text-xs font-medium drop-shadow-md bg-black/20 dark:bg-black/40 px-2 py-0.5 rounded text-center w-24 break-words leading-tight">${app.title}</span>
        </button>
      `
      )
      .join('');
  },

  renderStartMenu() {
    const list = document.getElementById('start-menu-items');
    const itemClass =
      'w-full text-left px-2 py-1.5 rounded hover:bg-blue-500 hover:text-white dark:text-gray-200 text-sm flex items-center gap-2 transition-colors';

    const apps = Object.values(this.apps)
      .filter((app) => app.showInStartMenu)
      .map(
        (app) => `
        <button type="button" class="${itemClass}" onclick="WindowManager.openWindow('${app.id}')">
          <i class="${app.icon} w-5" aria-hidden="true"></i> ${app.title}
        </button>
      `
      );

    const links = window.PeterOSLinks.map(
      (link) => `
        <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="${itemClass}">
          <i class="${link.icon} w-5" aria-hidden="true"></i> ${link.label}
        </a>
      `
    );

    list.innerHTML = [...apps, ...links].join('');
  },

  renderTaskbarItem(appId) {
    const app = this.apps[appId];
    const container = document.getElementById('taskbar-apps');
    const item = document.createElement('button');
    item.type = 'button';
    item.id = `taskbar-item-${appId}`;
    item.className = 'taskbar-item p-2 rounded-lg cursor-pointer hover:bg-white/20 transition-colors';
    item.setAttribute('aria-label', app.title);
    item.onclick = () => {
      if (this.windows[appId].minimized) {
        this.restoreWindow(appId);
      } else if (this.activeWindow === appId) {
        this.minimizeWindow(appId);
      } else {
        this.focusWindow(appId);
      }
    };
    item.innerHTML = `<i class="${app.icon} text-xl ${app.color}" aria-hidden="true"></i>`;
    container.appendChild(item);
  },

  removeTaskbarItem(appId) {
    const item = document.getElementById(`taskbar-item-${appId}`);
    if (item) item.remove();
  },

  // --- Geometry -----------------------------------------------------------

  // Keeps a window inside the viewport: never wider or taller than the screen,
  // and never dragged so far that its header is unreachable.
  fitToViewport(element) {
    const maxWidth = window.innerWidth;
    const maxHeight = window.innerHeight - TASKBAR_HEIGHT;
    if (element.offsetWidth > maxWidth) element.style.width = `${maxWidth}px`;
    if (element.offsetHeight > maxHeight) element.style.height = `${maxHeight}px`;

    const minLeft = MIN_VISIBLE - element.offsetWidth;
    const maxLeft = window.innerWidth - MIN_VISIBLE;
    const maxTop = Math.max(0, window.innerHeight - TASKBAR_HEIGHT - HEADER_HEIGHT);

    element.style.left = `${Math.min(Math.max(element.offsetLeft, minLeft), maxLeft)}px`;
    element.style.top = `${Math.min(Math.max(element.offsetTop, 0), maxTop)}px`;
  },

  // --- Window lifecycle ---------------------------------------------------

  openWindow(appId) {
    const app = this.apps[appId];
    if (!app) return;

    if (this.windows[appId]) {
      if (this.windows[appId].minimized) this.restoreWindow(appId);
      this.focusWindow(appId);
      return;
    }

    this.windowCount++;
    const offset = (this.windowCount % 10) * 30;
    const mobile = isMobileViewport();

    const win = document.createElement('div');
    win.className =
      'window absolute bg-white dark:bg-gray-800 dark:text-gray-100 rounded-lg shadow-2xl flex flex-col overflow-hidden border border-gray-300 dark:border-gray-600 pointer-events-auto';
    win.id = `window-${appId}`;
    win.style.width = mobile ? '90%' : '800px';
    win.style.height = mobile ? '80%' : '600px';
    win.style.top = mobile ? '10%' : `${100 + offset}px`;
    win.style.left = mobile ? '5%' : `${100 + offset}px`;
    win.setAttribute('role', 'dialog');
    win.setAttribute('aria-labelledby', `window-title-${appId}`);
    win.tabIndex = -1;

    const content = app.render ? app.render() : app.content;

    win.innerHTML = `
      <div class="window-header bg-gray-100 dark:bg-gray-700 px-4 py-2 flex items-center justify-between border-b border-gray-200 dark:border-gray-600 select-none"
           onmousedown="WindowManager.startDrag(event, '${appId}')" ontouchstart="WindowManager.startDrag(event, '${appId}')">
        <div class="flex items-center gap-2">
          <div class="flex gap-1.5">
            <button type="button" aria-label="Close ${app.title}" title="Close" onclick="WindowManager.closeWindow('${appId}')" class="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 border border-red-600"></button>
            <button type="button" aria-label="Minimize ${app.title}" title="Minimize" onclick="WindowManager.minimizeWindow('${appId}')" class="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 border border-yellow-600"></button>
            <button type="button" aria-label="Maximize ${app.title}" title="Maximize" onclick="WindowManager.maximizeWindow('${appId}')" class="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 border border-green-600"></button>
          </div>
          <span id="window-title-${appId}" class="ml-4 text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center gap-2">
            <i class="${app.icon} text-xs" aria-hidden="true"></i> ${app.title}
          </span>
        </div>
      </div>
      <div class="flex-1 overflow-auto bg-white dark:bg-gray-800 relative">
        ${content}
      </div>
      <div class="resize-handle" role="presentation" onmousedown="WindowManager.startResize(event, '${appId}')" ontouchstart="WindowManager.startResize(event, '${appId}')"></div>
    `;

    document.getElementById('windows-container').appendChild(win);
    this.windows[appId] = {
      element: win,
      minimized: false,
      maximized: false,
      restoreGeometry: null,
      // So focus can go back where it came from when the window closes.
      opener: document.activeElement,
    };

    this.renderTaskbarItem(appId);

    const raise = () => this.focusWindow(appId);
    win.addEventListener('mousedown', raise);
    win.addEventListener('touchstart', raise, { passive: true });

    this.fitToViewport(win);
    if (app.onOpen) app.onOpen();

    this.focusWindow(appId);
    // On a phone a floating window buries the desktop icons - fill the screen.
    if (mobile) this.maximizeWindow(appId);
    win.focus({ preventScroll: true });

    this.closeStartMenu();
  },

  closeWindow(appId) {
    const win = this.windows[appId];
    if (!win) return;

    const { opener } = win;
    win.element.remove();
    delete this.windows[appId];
    this.removeTaskbarItem(appId);

    if (this.activeWindow === appId) this.activeWindow = null;

    // offsetParent is null for anything hidden - don't send focus into the void.
    if (opener && document.contains(opener) && opener.offsetParent !== null) {
      opener.focus({ preventScroll: true });
    }
  },

  minimizeWindow(appId) {
    const win = this.windows[appId];
    if (!win) return;
    win.element.classList.add('minimized');
    win.minimized = true;
    if (this.activeWindow === appId) this.activeWindow = null;
    this.updateTaskbarState();
  },

  restoreWindow(appId) {
    const win = this.windows[appId];
    if (!win) return;
    win.element.classList.remove('minimized');
    win.minimized = false;
    this.focusWindow(appId);
  },

  maximizeWindow(appId) {
    const win = this.windows[appId];
    if (!win) return;
    const { element } = win;

    if (win.maximized) {
      // Put the window back exactly where the user last had it.
      const geometry = win.restoreGeometry;
      if (geometry) {
        element.style.width = geometry.width;
        element.style.height = geometry.height;
        element.style.top = geometry.top;
        element.style.left = geometry.left;
      }
      element.style.borderRadius = '0.5rem';
      win.maximized = false;
      this.fitToViewport(element);
    } else {
      win.restoreGeometry = {
        width: element.style.width,
        height: element.style.height,
        top: element.style.top,
        left: element.style.left,
      };
      element.style.width = '100%';
      element.style.height = `calc(100% - ${TASKBAR_HEIGHT}px)`;
      element.style.top = '0';
      element.style.left = '0';
      element.style.borderRadius = '0';
      win.maximized = true;
    }

    const button = element.querySelector('[aria-label^="Maximize"], [aria-label^="Restore"]');
    if (button) {
      const label = win.maximized
        ? `Restore ${this.apps[appId].title}`
        : `Maximize ${this.apps[appId].title}`;
      button.setAttribute('aria-label', label);
      button.title = win.maximized ? 'Restore' : 'Maximize';
    }
  },

  focusWindow(appId) {
    const win = this.windows[appId];
    if (!win) return;
    win.element.style.zIndex = ++this.zIndex;
    this.activeWindow = appId;
    this.updateTaskbarState();
  },

  updateTaskbarState() {
    document.querySelectorAll('.taskbar-item').forEach((el) => {
      const isActive = el.id === `taskbar-item-${this.activeWindow}`;
      el.classList.toggle('bg-white/40', isActive);
      el.setAttribute('aria-pressed', String(isActive));
    });
  },

  // --- Start menu, lock, shutdown, clock ----------------------------------

  toggleStartMenu() {
    const menu = document.getElementById('start-menu');
    const hidden = menu.classList.toggle('hidden');
    document.getElementById('start-button').setAttribute('aria-expanded', String(!hidden));
    if (!hidden) menu.querySelector('#start-menu-items button, #start-menu-items a')?.focus();
  },

  closeStartMenu() {
    const menu = document.getElementById('start-menu');
    if (!menu) return;
    menu.classList.add('hidden');
    const button = document.getElementById('start-button');
    if (button) button.setAttribute('aria-expanded', 'false');
  },

  lock() {
    document.getElementById('lock-screen').classList.remove('hidden');
    this.closeStartMenu();
    document.getElementById('lock-password').focus();
  },

  unlock() {
    document.getElementById('lock-screen').classList.add('hidden');
    document.getElementById('lock-password').value = '';
    document.getElementById('start-button').focus();
  },

  shutdown() {
    this.closeStartMenu();
    const screen = document.getElementById('shutdown-screen');
    screen.classList.remove('hidden');

    setTimeout(() => {
      screen.innerHTML = `
        <button type="button" onclick="location.reload()" class="flex flex-col items-center gap-4 group cursor-pointer">
          <span class="w-20 h-20 rounded-full border-2 border-white/20 flex items-center justify-center group-hover:border-white/60 group-hover:bg-white/10 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_50px_rgba(255,255,255,0.3)]">
            <i class="fas fa-power-off text-3xl text-white/50 group-hover:text-white transition-colors" aria-hidden="true"></i>
          </span>
          <span class="text-white/50 group-hover:text-white transition-colors font-light tracking-widest text-sm">BOOT SYSTEM</span>
        </button>
      `;
      screen.querySelector('button').focus();
    }, 3000);
  },

  updateClock() {
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById('clock').textContent = timeString;
    const lockClock = document.getElementById('lock-clock');
    if (lockClock) lockClock.textContent = timeString;
  },

  // --- Dragging -----------------------------------------------------------

  startDrag(event, appId) {
    if (event.target.closest('button')) return;

    const win = this.windows[appId];
    if (!win || win.maximized) return;

    const { element } = win;
    const start = getClientCoords(event);
    let lastX = start.x;
    let lastY = start.y;

    // Stops the pointer from being swallowed by content while dragging.
    const overlay = document.createElement('div');
    overlay.className = 'absolute inset-0 z-50';
    element.appendChild(overlay);

    const onMove = (moveEvent) => {
      const current = getClientCoords(moveEvent);
      if (current.x === undefined || current.y === undefined) return;

      element.style.left = `${element.offsetLeft + (current.x - lastX)}px`;
      element.style.top = `${element.offsetTop + (current.y - lastY)}px`;
      lastX = current.x;
      lastY = current.y;

      this.fitToViewport(element);
    };

    const onEnd = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onEnd);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchend', onEnd);
      overlay.remove();
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onEnd);
    document.addEventListener('touchmove', onMove, { passive: true });
    document.addEventListener('touchend', onEnd);

    this.focusWindow(appId);
  },

  // --- Resizing -----------------------------------------------------------

  startResize(event, appId) {
    event.preventDefault();
    event.stopPropagation();

    const win = this.windows[appId];
    if (!win) return;
    const { element } = win;

    const start = getClientCoords(event);
    const startWidth = element.offsetWidth;
    const startHeight = element.offsetHeight;

    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 z-50 cursor-se-resize';
    document.body.appendChild(overlay);

    const onMove = (moveEvent) => {
      const current = getClientCoords(moveEvent);
      if (current.x === undefined || current.y === undefined) return;

      const width = startWidth + current.x - start.x;
      const height = startHeight + current.y - start.y;
      if (width > 300) element.style.width = `${width}px`;
      if (height > 200) element.style.height = `${height}px`;
      this.fitToViewport(element);
    };

    const onEnd = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onEnd);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchend', onEnd);
      overlay.remove();
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onEnd);
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('touchend', onEnd);

    this.focusWindow(appId);
  },
};

document.addEventListener('DOMContentLoaded', () => {
  WindowManager.init();
  WindowManager.openWindow('about');
});
