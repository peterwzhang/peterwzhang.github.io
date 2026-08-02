// App registry - the single source of truth for every app in PeterOS.
// The desktop icons, the start menu and the taskbar are all rendered from this
// object, so an app's icon, colour and title can only ever be defined once.

const PROFILE = {
  name: 'Peter Zhang',
  role: 'Senior Software Engineer',
  email: 'peterwengzhang@gmail.com',
  github: 'https://github.com/peterwzhang',
  linkedin: 'https://www.linkedin.com/in/pwzhang/',
  photo: 'assets/images/Peter_Zhang_Profile.webp',
};

// Data here is authored by hand, but templating through innerHTML without
// escaping is a habit worth not having.
const escapeHtml = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]
  );

const CATEGORY_ICONS = {
  web: 'fa-globe',
  mobile: 'fa-mobile-alt',
  api: 'fa-server',
  game: 'fa-gamepad',
  tool: 'fa-code',
};

window.PeterOSApps = {
  about: {
    id: 'about',
    title: 'About Me',
    icon: 'fas fa-user-circle',
    color: 'text-blue-500',
    showOnDesktop: true,
    showInStartMenu: true,
    content: `
      <div class="p-8 max-w-3xl mx-auto dark:text-gray-100">
        <div class="flex flex-col md:flex-row gap-8 items-start">
          <div class="flex flex-col items-center gap-4 min-w-[160px]">
            <img src="${PROFILE.photo}" width="128" height="128" class="w-32 h-32 rounded-full object-cover shadow-lg" alt="${PROFILE.name}">
            <div class="flex flex-col gap-2 w-full">
              <a href="${PROFILE.linkedin}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900 text-gray-700 dark:text-gray-200 hover:text-blue-600 rounded-lg transition-colors text-sm font-medium">
                <i class="fab fa-linkedin text-lg w-5" aria-hidden="true"></i> LinkedIn
              </a>
              <a href="${PROFILE.github}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white rounded-lg transition-colors text-sm font-medium">
                <i class="fab fa-github text-lg w-5" aria-hidden="true"></i> GitHub
              </a>
              <a href="mailto:${PROFILE.email}" class="flex items-center gap-3 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-red-50 dark:hover:bg-red-900 text-gray-700 dark:text-gray-200 hover:text-red-600 rounded-lg transition-colors text-sm font-medium">
                <i class="fas fa-envelope text-lg w-5" aria-hidden="true"></i> Contact Me
              </a>
            </div>
          </div>
          <div>
            <h1 class="text-3xl font-bold mb-2">Hi, I'm ${PROFILE.name}</h1>
            <p class="text-xl text-gray-600 dark:text-gray-400 mb-4">${PROFILE.role}</p>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              I build systems that help businesses move faster, spend smarter, and get more value from their data through distributed systems, data pipelines, or internal tools.
              <br><br>
              My focus involves backend development and data infrastructure. I work on systems that power data analytics and machine learning.
            </p>

            <h2 class="text-xl font-bold mb-4 border-b dark:border-gray-600 pb-2">Experience</h2>
            <div class="space-y-6">
              <div>
                <h3 class="font-bold">Senior Software Engineer @ <a href="https://www.michelin.com/en/" target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 hover:underline">Michelin</a></h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">2024 - Present</p>
                <p class="text-sm mt-1 dark:text-gray-300">Build and deploy containerized data services to support analytics and data science teams.</p>
              </div>
              <div>
                <h3 class="font-bold">Software Engineer @ <a href="https://www.michelin.com/en/" target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 hover:underline">Michelin</a></h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">2023 - 2024</p>
                <p class="text-sm mt-1 dark:text-gray-300">Designed, built, and maintained both streaming and batch data pipelines.</p>
              </div>
              <div>
                <h3 class="font-bold">Web Development Assistant @ <a href="https://cs.ua.edu/" target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 hover:underline">UA</a></h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">2021 - 2022</p>
                <p class="text-sm mt-1 dark:text-gray-300">Developed WordPress webpages for the Computer Science department.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
  },

  projects: {
    id: 'projects',
    title: 'Projects',
    icon: 'fas fa-folder-open',
    color: 'text-yellow-500',
    showOnDesktop: true,
    showInStartMenu: true,
    render: () => {
      const projects = window.projectsData || [];
      return `
        <div class="p-6 bg-gray-50 dark:bg-gray-800 min-h-full">
          <h2 class="sr-only">Projects</h2>
          <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0 m-0">
            ${projects
              .map(
                (project) => `
              <li class="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow flex flex-col h-full">
                <div class="h-32 bg-gray-100 dark:bg-gray-600 rounded mb-4 flex items-center justify-center text-4xl text-gray-300 dark:text-gray-400">
                  <i class="fas ${CATEGORY_ICONS[project.category] || CATEGORY_ICONS.tool}" aria-hidden="true"></i>
                </div>
                <h3 class="font-bold text-lg mb-1 dark:text-white">${escapeHtml(project.title)}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">${escapeHtml(project.description)}</p>
                <div class="flex flex-wrap gap-1 mb-4">
                  ${project.technologies
                    .slice(0, 3)
                    .map(
                      (tech) =>
                        `<span class="px-2 py-0.5 bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-xs rounded-full">${escapeHtml(tech)}</span>`
                    )
                    .join('')}
                </div>
                <div class="flex gap-3 text-sm mt-auto pt-2 border-t border-gray-100 dark:border-gray-600">
                  ${
                    project.githubUrl
                      ? `<a href="${escapeHtml(project.githubUrl)}" target="_blank" rel="noopener noreferrer" class="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"><i class="fab fa-github" aria-hidden="true"></i> Code<span class="sr-only"> for ${escapeHtml(project.title)}</span></a>`
                      : ''
                  }
                  ${
                    project.liveUrl
                      ? `<a href="${escapeHtml(project.liveUrl)}" target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 hover:text-blue-800"><i class="fas fa-external-link-alt" aria-hidden="true"></i> Demo<span class="sr-only"> of ${escapeHtml(project.title)}</span></a>`
                      : ''
                  }
                </div>
              </li>
            `
              )
              .join('')}
          </ul>
        </div>
      `;
    },
  },

  library: {
    id: 'library',
    title: 'Library',
    icon: 'fas fa-book',
    color: 'text-emerald-600',
    showOnDesktop: true,
    showInStartMenu: true,
    render: () => {
      const books = window.booksData || [];
      return `
        <div class="p-6 bg-[#fcfbf9] dark:bg-gray-800 min-h-full">
          <h2 class="text-2xl font-serif font-bold mb-6 text-gray-800 dark:text-white">Recommended Reading</h2>
          <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 list-none p-0 m-0">
            ${books
              .map(
                (book) => `
              <li class="bg-white dark:bg-gray-700 p-4 rounded shadow-sm border border-gray-100 dark:border-gray-600 flex flex-col">
                <div class="aspect-[2/3] bg-gray-100 dark:bg-gray-600 rounded mb-3 overflow-hidden relative flex items-center justify-center">
                  <img src="https://covers.openlibrary.org/b/isbn/${escapeHtml(book.isbn)}-M.jpg"
                       alt="Cover of ${escapeHtml(book.title)}"
                       loading="lazy"
                       class="max-w-full max-h-full object-contain"
                       onerror="this.onerror=null; this.src='https://placehold.co/200x300?text=Book';">
                </div>
                <h3 class="font-bold text-sm mb-1 line-clamp-2 dark:text-white">${escapeHtml(book.title)}</h3>
                <p class="text-xs text-gray-500 dark:text-gray-400">${escapeHtml(book.author)}</p>
              </li>
            `
              )
              .join('')}
          </ul>
        </div>
      `;
    },
  },

  terminal: {
    id: 'terminal',
    title: 'Terminal',
    icon: 'fas fa-terminal',
    color: 'text-gray-800',
    showOnDesktop: true,
    showInStartMenu: true,
    content: `
      <div id="terminal-scroll" class="bg-[#1e1e1e] text-gray-300 font-mono p-4 h-full text-sm overflow-y-auto">
        <div class="mb-2">Welcome to PeterOS v1.0.0</div>
        <div class="mb-4">Type 'help' for a list of commands.</div>
        <div id="terminal-output"></div>
        <label class="flex items-center">
          <span class="text-green-500 mr-2">peter@portfolio:~$</span>
          <span class="sr-only">Terminal command</span>
          <input type="text" id="cmd-input" class="bg-transparent border-none outline-none text-white flex-1" autocomplete="off" autocapitalize="off" spellcheck="false">
        </label>
      </div>
    `,
    onOpen: () => {
      const input = document.getElementById('cmd-input');
      const output = document.getElementById('terminal-output');
      const scroller = document.getElementById('terminal-scroll');
      if (!input || !output || !scroller) return;

      // Clicking anywhere in the terminal body focuses the prompt.
      scroller.addEventListener('click', () => input.focus());
      input.focus();

      const print = (text, className) => {
        const line = document.createElement('div');
        if (className) line.className = className;
        line.textContent = text;
        output.appendChild(line);
        return line;
      };

      const COMMANDS = {
        help: () => `Available commands: ${Object.keys(COMMANDS).sort().join(', ')}`,
        about: () => (window.WindowManager.openWindow('about'), 'Opening About Me...'),
        projects: () => (window.WindowManager.openWindow('projects'), 'Opening Projects...'),
        library: () => (window.WindowManager.openWindow('library'), 'Opening Library...'),
        settings: () => (window.WindowManager.openWindow('settings'), 'Opening Settings...'),
        date: () => new Date().toString(),
        whoami: () => 'peter',
        clear: () => {
          output.innerHTML = '';
          return '';
        },
      };

      input.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter') return;

        const raw = input.value;
        const command = raw.trim().toLowerCase();

        // textContent, never innerHTML - the prompt is styled separately so
        // typed input can never be parsed as markup.
        const echo = document.createElement('div');
        const prompt = document.createElement('span');
        prompt.className = 'text-green-500 mr-2';
        prompt.textContent = 'peter@portfolio:~$';
        echo.append(prompt, document.createTextNode(raw));
        output.appendChild(echo);

        if (command) {
          const handler = COMMANDS[command];
          const response = handler ? handler() : `Command not found: ${command}`;
          if (response) print(response, 'text-gray-400 mb-2');
        }

        input.value = '';
        // The scroll container is the terminal body, not the output div.
        scroller.scrollTop = scroller.scrollHeight;
      });
    },
  },

  settings: {
    id: 'settings',
    title: 'Settings',
    icon: 'fas fa-cog',
    color: 'text-gray-600',
    showOnDesktop: false,
    showInStartMenu: true,
    render: () => `
      <div class="p-6 bg-gray-50 dark:bg-gray-800 min-h-full">
        <h2 class="text-2xl font-bold mb-6 dark:text-white">Settings</h2>

        <div class="bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 p-4 mb-4">
          <h3 class="font-semibold mb-4 dark:text-white">Appearance</h3>
          <div class="flex items-center justify-between">
            <div>
              <label for="dark-mode-toggle" class="font-medium dark:text-white cursor-pointer">Dark Mode</label>
              <p id="dark-mode-hint" class="text-sm text-gray-500 dark:text-gray-400">Toggle dark theme for the interface</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <span class="sr-only">Dark Mode</span>
              <input type="checkbox" id="dark-mode-toggle" class="sr-only peer"
                     aria-describedby="dark-mode-hint"
                     ${window.WindowManager.darkMode ? 'checked' : ''}
                     onchange="WindowManager.toggleDarkMode()">
              <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-600 peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 p-4">
          <h3 class="font-semibold mb-4 dark:text-white">About</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">PeterOS v1.0.0</p>
          <p class="text-sm text-gray-500 dark:text-gray-500 mt-1">A portfolio website disguised as an operating system.</p>
        </div>
      </div>
    `,
  },
};

// External destinations shown in the start menu. Not apps - they never open a
// window - but they live here so the start menu has exactly one definition.
window.PeterOSLinks = [
  { label: 'GitHub', icon: 'fab fa-github', url: PROFILE.github },
  { label: 'Email Me', icon: 'fas fa-envelope', url: `mailto:${PROFILE.email}` },
];

window.PeterOSProfile = PROFILE;
