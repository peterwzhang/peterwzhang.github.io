// OS Simulator Logic

window.WindowManager = {
    windows: {},
    zIndex: 100,
    activeWindow: null,

    windowCount: 0,

    darkMode: false,

    init() {
        this.renderDesktopIcons();
        this.updateClock();
        setInterval(() => this.updateClock(), 1000);
        
        // Load dark mode preference
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode === 'true') {
            this.toggleDarkMode(true);
        }
        
        // Close start menu when clicking outside
        document.addEventListener('click', (e) => {
            const startMenu = document.getElementById('start-menu');
            const startButton = document.getElementById('start-button');
            if (!startMenu.contains(e.target) && !startButton.contains(e.target)) {
                startMenu.classList.add('hidden');
            }
        });
    },

    toggleDarkMode(force) {
        this.darkMode = force !== undefined ? force : !this.darkMode;
        document.documentElement.classList.toggle('dark', this.darkMode);
        localStorage.setItem('darkMode', this.darkMode);
        
        // Update settings toggle if open
        const toggle = document.getElementById('dark-mode-toggle');
        if (toggle) {
            toggle.checked = this.darkMode;
        }
    },

    apps: {
        about: {
            id: 'about',
            title: 'About Me',
            icon: 'fas fa-user-circle',
            color: 'text-blue-500',
            content: `
                <div class="p-8 max-w-3xl mx-auto dark:text-gray-100">
                    <div class="flex flex-col md:flex-row gap-8 items-start">
                        <div class="flex flex-col items-center gap-4 min-w-[160px]">
                            <img src="assets/images/Peter_Zhang_Profile.webp" class="w-32 h-32 rounded-full object-cover shadow-lg" alt="Peter Zhang">
                            <div class="flex flex-col gap-2 w-full">
                                <a href="https://www.linkedin.com/in/pwzhang/" target="_blank" class="flex items-center gap-3 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900 text-gray-700 dark:text-gray-200 hover:text-blue-600 rounded-lg transition-colors text-sm font-medium">
                                    <i class="fab fa-linkedin text-lg w-5"></i> LinkedIn
                                </a>
                                <a href="https://github.com/peterwzhang" target="_blank" class="flex items-center gap-3 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white rounded-lg transition-colors text-sm font-medium">
                                    <i class="fab fa-github text-lg w-5"></i> GitHub
                                </a>
                                <a href="mailto:peterwengzhang@gmail.com" class="flex items-center gap-3 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-red-50 dark:hover:bg-red-900 text-gray-700 dark:text-gray-200 hover:text-red-600 rounded-lg transition-colors text-sm font-medium">
                                    <i class="fas fa-envelope text-lg w-5"></i> Contact Me
                                </a>
                            </div>
                        </div>
                        <div>
                            <h1 class="text-3xl font-bold mb-2">Hi, I'm Peter Zhang</h1>
                            <p class="text-xl text-gray-600 dark:text-gray-400 mb-4">Senior Software Engineer</p>
                            <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                                I build systems that help businesses move faster, spend smarter, and get more value from their data through distributed systems, data pipelines, or internal tools.
                                <br><br>
                                My focus involves backend development and data infrastructure. I work on systems that power data analytics and machine learning.
                            </p>
                            
                            <h2 class="text-xl font-bold mb-4 border-b dark:border-gray-600 pb-2">Experience</h2>
                            <div class="space-y-6">
                                <div>
                                    <h3 class="font-bold">Senior Software Engineer @ <a href="https://www.michelin.com/en/" target="_blank" class="text-blue-600 dark:text-blue-400 hover:underline">Michelin</a></h3>">Michelin</a></h3>
                                    <p class="text-sm text-gray-500 dark:text-gray-400">2024 - Present</p>
                                    <p class="text-sm mt-1 dark:text-gray-300">Build and deploy containerized data services to support analytics and data science teams.</p>
                                </div>
                                <div>
                                    <h3 class="font-bold">Software Engineer @ <a href="https://www.michelin.com/en/" target="_blank" class="text-blue-600 dark:text-blue-400 hover:underline">Michelin</a></h3>
                                    <p class="text-sm text-gray-500 dark:text-gray-400">2023 - 2024</p>
                                    <p class="text-sm mt-1 dark:text-gray-300">Designed, built, and maintained both streaming and batch data pipelines.</p>
                                </div>
                                <div>
                                    <h3 class="font-bold">Web Development Assistant @ <a href="https://cs.ua.edu/" target="_blank" class="text-blue-600 dark:text-blue-400 hover:underline">UA</a></h3>
                                    <p class="text-sm text-gray-500 dark:text-gray-400">2021 - 2022</p>
                                    <p class="text-sm mt-1 dark:text-gray-300">Developed WordPress webpages for the Computer Science department.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        projects: {
            id: 'projects',
            title: 'Projects',
            icon: 'fas fa-folder-open',
            color: 'text-yellow-500',
            render: () => {
                const projects = window.projectsData || [];
                return `
                    <div class="p-6 bg-gray-50 dark:bg-gray-800 min-h-full">
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            ${projects.map(p => `
                                <div class="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow flex flex-col h-full">
                                    <div class="h-32 bg-gray-100 dark:bg-gray-600 rounded mb-4 flex items-center justify-center text-4xl text-gray-300 dark:text-gray-400">
                                        ${p.category === 'web' ? '<i class="fas fa-globe"></i>' : 
                                          p.category === 'mobile' ? '<i class="fas fa-mobile-alt"></i>' : 
                                          p.category === 'api' ? '<i class="fas fa-server"></i>' : 
                                          p.category === 'game' ? '<i class="fas fa-gamepad"></i>' : '<i class="fas fa-code"></i>'}
                                    </div>
                                    <h3 class="font-bold text-lg mb-1 dark:text-white">${p.title}</h3>
                                    <p class="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">${p.description}</p>
                                    <div class="flex flex-wrap gap-1 mb-4">
                                        ${p.technologies.slice(0, 3).map(t => `<span class="px-2 py-0.5 bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-xs rounded-full">${t}</span>`).join('')}
                                    </div>
                                    <div class="flex gap-3 text-sm mt-auto pt-2 border-t border-gray-100 dark:border-gray-600">
                                        ${p.githubUrl ? `<a href="${p.githubUrl}" target="_blank" class="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"><i class="fab fa-github"></i> Code</a>` : ''}
                                        ${p.liveUrl ? `<a href="${p.liveUrl}" target="_blank" class="text-blue-600 dark:text-blue-400 hover:text-blue-800"><i class="fas fa-external-link-alt"></i> Demo</a>` : ''}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            }
        },
        library: {
            id: 'library',
            title: 'Library',
            icon: 'fas fa-book',
            color: 'text-emerald-600',
            render: () => {
                const books = window.booksData || [];
                return `
                    <div class="p-6 bg-[#fcfbf9] dark:bg-gray-800 min-h-full">
                        <h2 class="text-2xl font-serif font-bold mb-6 text-gray-800 dark:text-white">Recommended Reading</h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            ${books.map(b => `
                                <div class="bg-white dark:bg-gray-700 p-4 rounded shadow-sm border border-gray-100 dark:border-gray-600 flex flex-col">
                                    <div class="aspect-[2/3] bg-gray-100 dark:bg-gray-600 rounded mb-3 overflow-hidden relative flex items-center justify-center">
                                        <img src="https://covers.openlibrary.org/b/isbn/${b.isbn}-M.jpg" class="max-w-full max-h-full object-contain" onerror="this.src='https://placehold.co/200x300?text=Book'">
                                    </div>
                                    <h3 class="font-bold text-sm mb-1 line-clamp-2 dark:text-white">${b.title}</h3>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">${b.author}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            }
        },
        terminal: {
            id: 'terminal',
            title: 'Terminal',
            icon: 'fas fa-terminal',
            color: 'text-gray-800',
            content: `
                <div class="bg-[#1e1e1e] text-gray-300 font-mono p-4 h-full text-sm overflow-y-auto" onclick="document.getElementById('cmd-input').focus()">
                    <div class="mb-2">Welcome to PeterOS v1.0.0</div>
                    <div class="mb-4">Type 'help' for a list of commands.</div>
                    <div id="terminal-output"></div>
                    <div class="flex items-center">
                        <span class="text-green-500 mr-2">peter@portfolio:~$</span>
                        <input type="text" id="cmd-input" class="bg-transparent border-none outline-none text-white flex-1" autocomplete="off">
                    </div>
                </div>
            `,
            onOpen: () => {
                const input = document.getElementById('cmd-input');
                const output = document.getElementById('terminal-output');
                
                if(input) {
                    input.focus();
                    input.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter') {
                            const cmd = input.value.trim().toLowerCase();
                            const line = document.createElement('div');
                            line.innerHTML = `<span class="text-green-500 mr-2">peter@portfolio:~$</span> ${input.value}`;
                            output.appendChild(line);
                            
                            let response = '';
                            switch(cmd) {
                                case 'help':
                                    response = 'Available commands: about, projects, library, clear, date, whoami';
                                    break;
                                case 'about':
                                    WindowManager.openWindow('about');
                                    response = 'Opening About Me...';
                                    break;
                                case 'projects':
                                    WindowManager.openWindow('projects');
                                    response = 'Opening Projects...';
                                    break;
                                case 'library':
                                    WindowManager.openWindow('library');
                                    response = 'Opening Library...';
                                    break;
                                case 'clear':
                                    output.innerHTML = '';
                                    break;
                                case 'date':
                                    response = new Date().toString();
                                    break;
                                case 'whoami':
                                    response = 'root';
                                    break;
                                case '':
                                    break;
                                default:
                                    response = `Command not found: ${cmd}`;
                            }
                            
                            if (response && cmd !== 'clear') {
                                const respLine = document.createElement('div');
                                respLine.className = 'text-gray-400 mb-2';
                                respLine.textContent = response;
                                output.appendChild(respLine);
                            }
                            
                            input.value = '';
                            output.scrollTop = output.scrollHeight;
                        }
                    });
                }
            }
        },
        settings: {
            id: 'settings',
            title: 'Settings',
            icon: 'fas fa-cog',
            color: 'text-gray-600',
            render: () => {
                return `
                    <div class="p-6 bg-gray-50 dark:bg-gray-800 min-h-full">
                        <h2 class="text-2xl font-bold mb-6 dark:text-white">Settings</h2>
                        
                        <div class="bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 p-4 mb-4">
                            <h3 class="font-semibold mb-4 dark:text-white">Appearance</h3>
                            
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="font-medium dark:text-white">Dark Mode</p>
                                    <p class="text-sm text-gray-500 dark:text-gray-400">Toggle dark theme for the interface</p>
                                </div>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" id="dark-mode-toggle" class="sr-only peer" 
                                           ${WindowManager.darkMode ? 'checked' : ''} 
                                           onchange="WindowManager.toggleDarkMode()">
                                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                        </div>
                        
                        <div class="bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 p-4">
                            <h3 class="font-semibold mb-4 dark:text-white">About</h3>
                            <p class="text-sm text-gray-600 dark:text-gray-400">PeterOS v1.0.0</p>
                            <p class="text-sm text-gray-500 dark:text-gray-500 mt-1">A portfolio website disguised as an operating system.</p>
                        </div>
                    </div>
                `;
            }
        }
    },

    renderDesktopIcons() {
        const desktop = document.getElementById('desktop');
        const icons = [
            { id: 'about', label: 'About Me', icon: 'fas fa-user-circle', color: 'text-blue-500' },
            { id: 'projects', label: 'Projects', icon: 'fas fa-folder', color: 'text-yellow-500' },
            { id: 'library', label: 'Library', icon: 'fas fa-book', color: 'text-emerald-600' },
            { id: 'terminal', label: 'Terminal', icon: 'fas fa-terminal', color: 'text-gray-800' }
            // { id: 'resume', label: 'Resume.pdf', icon: 'fas fa-file-pdf', color: 'text-red-500', action: () => alert('Resume download would happen here!') }
        ];

        desktop.innerHTML = icons.map(icon => `
            <div class="desktop-icon flex flex-col items-center gap-1 p-2 rounded cursor-pointer transition-colors group" 
                 onclick="${icon.action ? 'WindowManager.apps.resume.action()' : `WindowManager.openWindow('${icon.id}')`}">
                <div class="w-12 h-12 bg-white dark:bg-gray-700 rounded-lg shadow-md flex items-center justify-center text-2xl ${icon.color} group-hover:scale-105 transition-transform">
                    <i class="${icon.icon}"></i>
                </div>
                <span class="text-white text-xs font-medium drop-shadow-md bg-black/20 dark:bg-black/40 px-2 py-0.5 rounded text-center w-24 break-words leading-tight">${icon.label}</span>
            </div>
        `).join('');
        
        // Add resume action manually since it's not a window app
        this.apps.resume = { action: () => window.open('assets/resume.pdf', '_blank') };
    },

    openWindow(appId) {
        const app = this.apps[appId];
        if (!app) return;

        // If window already exists, focus it
        if (this.windows[appId]) {
            this.focusWindow(appId);
            if (this.windows[appId].minimized) {
                this.restoreWindow(appId);
            }
            return;
        }

        // Increment window count for cascading effect
        this.windowCount++;
        const offset = (this.windowCount % 10) * 30; // 30px offset

        // Create window
        const win = document.createElement('div');
        win.className = 'window absolute bg-white dark:bg-gray-800 rounded-lg shadow-2xl flex flex-col overflow-hidden border border-gray-300 dark:border-gray-600 pointer-events-auto';
        
        // Initial size and position with cascade
        const isMobile = window.innerWidth < 768;
        win.style.width = isMobile ? '90%' : '800px';
        win.style.height = isMobile ? '80%' : '600px';
        win.style.top = isMobile ? '10%' : `${100 + offset}px`;
        win.style.left = isMobile ? '5%' : `${100 + offset}px`;
        win.style.zIndex = ++this.zIndex;
        win.id = `window-${appId}`;

        const content = app.render ? app.render() : app.content;

        win.innerHTML = `
            <div class="window-header bg-gray-100 dark:bg-gray-700 px-4 py-2 flex items-center justify-between border-b border-gray-200 dark:border-gray-600 select-none" onmousedown="WindowManager.startDrag(event, '${appId}')" ontouchstart="WindowManager.startDrag(event, '${appId}')">
                <div class="flex items-center gap-2">
                    <div class="flex gap-1.5">
                        <button onclick="WindowManager.closeWindow('${appId}')" class="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 border border-red-600"></button>
                        <button onclick="WindowManager.minimizeWindow('${appId}')" class="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 border border-yellow-600"></button>
                        <button onclick="WindowManager.maximizeWindow('${appId}')" class="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 border border-green-600"></button>
                    </div>
                    <span class="ml-4 text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center gap-2">
                        <i class="${app.icon} text-xs"></i> ${app.title}
                    </span>
                </div>
            </div>
            <div class="flex-1 overflow-auto bg-white dark:bg-gray-800 relative">
                ${content}
            </div>
            <div class="resize-handle" onmousedown="WindowManager.startResize(event, '${appId}')" ontouchstart="WindowManager.startResize(event, '${appId}')"></div>
        `;

        document.getElementById('windows-container').appendChild(win);
        this.windows[appId] = { element: win, minimized: false, maximized: false };
        
        // Add to taskbar
        this.renderTaskbarItem(appId);
        
        // Focus listener
        win.addEventListener('mousedown', () => this.focusWindow(appId));
        
        // Run onOpen callback if exists
        if (app.onOpen) app.onOpen();
    },

    closeWindow(appId) {
        const win = this.windows[appId];
        if (win) {
            win.element.remove();
            delete this.windows[appId];
            this.removeTaskbarItem(appId);
        }
    },

    minimizeWindow(appId) {
        const win = this.windows[appId];
        if (win) {
            win.element.classList.add('minimized');
            win.minimized = true;
        }
    },

    restoreWindow(appId) {
        const win = this.windows[appId];
        if (win) {
            win.element.classList.remove('minimized');
            win.minimized = false;
            this.focusWindow(appId);
        }
    },

    maximizeWindow(appId) {
        const win = this.windows[appId];
        if (win) {
            if (win.maximized) {
                win.element.style.width = window.innerWidth < 768 ? '90%' : '800px';
                win.element.style.height = window.innerWidth < 768 ? '80%' : '600px';
                win.element.style.top = window.innerWidth < 768 ? '10%' : '100px';
                win.element.style.left = window.innerWidth < 768 ? '5%' : '100px';
                win.element.style.borderRadius = '0.5rem';
                win.maximized = false;
            } else {
                win.element.style.width = '100%';
                win.element.style.height = 'calc(100% - 48px)'; // Minus taskbar
                win.element.style.top = '0';
                win.element.style.left = '0';
                win.element.style.borderRadius = '0';
                win.maximized = true;
            }
        }
    },

    focusWindow(appId) {
        const win = this.windows[appId];
        if (win) {
            win.element.style.zIndex = ++this.zIndex;
            this.activeWindow = appId;
            
            // Update taskbar active state
            document.querySelectorAll('.taskbar-item').forEach(el => el.classList.remove('bg-white/40'));
            const taskbarItem = document.getElementById(`taskbar-item-${appId}`);
            if (taskbarItem) taskbarItem.classList.add('bg-white/40');
        }
    },

    renderTaskbarItem(appId) {
        const app = this.apps[appId];
        const container = document.getElementById('taskbar-apps');
        const item = document.createElement('div');
        item.id = `taskbar-item-${appId}`;
        item.className = 'taskbar-item p-2 rounded-lg cursor-pointer hover:bg-white/20 transition-colors bg-white/40';
        item.onclick = () => {
            if (this.windows[appId].minimized) {
                this.restoreWindow(appId);
            } else if (this.activeWindow === appId) {
                this.minimizeWindow(appId);
            } else {
                this.focusWindow(appId);
            }
        };
        item.innerHTML = `<i class="${app.icon} text-xl ${app.color}"></i>`;
        container.appendChild(item);
    },

    removeTaskbarItem(appId) {
        const item = document.getElementById(`taskbar-item-${appId}`);
        if (item) item.remove();
    },

    toggleStartMenu() {
        const menu = document.getElementById('start-menu');
        menu.classList.toggle('hidden');
    },

    lock() {
        document.getElementById('lock-screen').classList.remove('hidden');
        document.getElementById('start-menu').classList.add('hidden');
    },

    unlock() {
        document.getElementById('lock-screen').classList.add('hidden');
    },

    shutdown() {
        document.getElementById('start-menu').classList.add('hidden');
        const screen = document.getElementById('shutdown-screen');
        screen.classList.remove('hidden');
        
        // Simulate shutdown delay then show boot button
        setTimeout(() => {
            screen.innerHTML = `
                <button onclick="location.reload()" class="flex flex-col items-center gap-4 group cursor-pointer">
                    <div class="w-20 h-20 rounded-full border-2 border-white/20 flex items-center justify-center group-hover:border-white/60 group-hover:bg-white/10 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_50px_rgba(255,255,255,0.3)]">
                        <i class="fas fa-power-off text-3xl text-white/50 group-hover:text-white transition-colors"></i>
                    </div>
                    <span class="text-white/50 group-hover:text-white transition-colors font-light tracking-widest text-sm">BOOT SYSTEM</span>
                </button>
            `;
        }, 3000);
    },

    updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        document.getElementById('clock').textContent = timeString;
        
        const lockClock = document.getElementById('lock-clock');
        if (lockClock) {
            lockClock.textContent = timeString;
        }
    },

    // Dragging Logic
    startDrag(e, appId) {
        if (e.target.closest('button')) return; // Don't drag if clicking buttons
        
        const win = this.windows[appId];
        if (win.maximized) return;

        const element = win.element;
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        
        // Get client coordinates (mouse or touch)
        const getClientCoords = (event) => {
            return {
                x: event.clientX || (event.touches && event.touches[0].clientX),
                y: event.clientY || (event.touches && event.touches[0].clientY)
            };
        };

        const coords = getClientCoords(e);
        pos3 = coords.x;
        pos4 = coords.y;
        
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
        document.ontouchend = closeDragElement;
        document.ontouchmove = elementDrag;
        
        // Add overlay to prevent iframe capturing mouse events if any
        const overlay = document.createElement('div');
        overlay.className = 'absolute inset-0 z-50';
        element.appendChild(overlay);

        function elementDrag(e) {
            // Prevent default to stop scrolling on touch devices while dragging
            // e.preventDefault(); 
            
            const currentCoords = getClientCoords(e);
            if (!currentCoords.x || !currentCoords.y) return;

            pos1 = pos3 - currentCoords.x;
            pos2 = pos4 - currentCoords.y;
            pos3 = currentCoords.x;
            pos4 = currentCoords.y;
            
            element.style.top = (element.offsetTop - pos2) + "px";
            element.style.left = (element.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
            document.ontouchend = null;
            document.ontouchmove = null;
            overlay.remove();
        }
        
        this.focusWindow(appId);
    },

    // Resizing Logic
    startResize(e, appId) {
        e.preventDefault();
        e.stopPropagation(); // Prevent drag from triggering
        
        const win = this.windows[appId];
        const element = win.element;
        
        const getClientCoords = (event) => {
            return {
                x: event.clientX || (event.touches && event.touches[0].clientX),
                y: event.clientY || (event.touches && event.touches[0].clientY)
            };
        };

        const startCoords = getClientCoords(e);
        const startX = startCoords.x;
        const startY = startCoords.y;
        
        const startWidth = parseInt(document.defaultView.getComputedStyle(element).width, 10);
        const startHeight = parseInt(document.defaultView.getComputedStyle(element).height, 10);
        
        // Add overlay to prevent iframe capturing mouse events
        const overlay = document.createElement('div');
        overlay.className = 'absolute inset-0 z-50 cursor-se-resize';
        document.body.appendChild(overlay);

        const doDrag = (e) => {
            const currentCoords = getClientCoords(e);
            if (!currentCoords.x || !currentCoords.y) return;

            const newWidth = startWidth + currentCoords.x - startX;
            const newHeight = startHeight + currentCoords.y - startY;
            
            // Minimum size constraints
            if (newWidth > 300) element.style.width = newWidth + 'px';
            if (newHeight > 200) element.style.height = newHeight + 'px';
        };
        
        const stopDrag = () => {
            document.removeEventListener('mousemove', doDrag, false);
            document.removeEventListener('mouseup', stopDrag, false);
            document.removeEventListener('touchmove', doDrag, false);
            document.removeEventListener('touchend', stopDrag, false);
            overlay.remove();
        };
        
        document.addEventListener('mousemove', doDrag, false);
        document.addEventListener('mouseup', stopDrag, false);
        document.addEventListener('touchmove', doDrag, { passive: false });
        document.addEventListener('touchend', stopDrag, false);
        
        this.focusWindow(appId);
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    WindowManager.init();
    
    // Open About window by default
    setTimeout(() => WindowManager.openWindow('about'), 500);
});
