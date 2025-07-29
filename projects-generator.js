// Projects Data - Easy to maintain
const projectsData = [
  {
    title: "E-Commerce Platform",
    description: "Full-stack shopping platform with React, Node.js, and secure payment integration. Features include user authentication, product catalog, shopping cart, and order management.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "JWT"],
    imageUrl: null, // For local screenshots: "assets/projects/ecommerce.png"
    githubUrl: "https://github.com/username/ecommerce-platform",
    liveUrl: "https://my-ecommerce-demo.vercel.app",
    category: "web", // web, mobile, api, tool, game
    featured: true
  },
  {
    title: "Weather Dashboard",
    description: "Real-time weather application with location-based forecasts, interactive maps, and weather alerts. Built with modern React and integrated with multiple weather APIs.",
    technologies: ["React", "TypeScript", "OpenWeather API", "Chart.js", "Geolocation"],
    imageUrl: null,
    githubUrl: "https://github.com/username/weather-dashboard",
    liveUrl: "https://weather-app-demo.netlify.app",
    category: "web",
    featured: true
  },
  {
    title: "Task Management API",
    description: "RESTful API for task management with user authentication, team collaboration, and real-time notifications. Includes comprehensive documentation and testing.",
    technologies: ["Node.js", "Express", "PostgreSQL", "Socket.io", "Docker"],
    imageUrl: null,
    githubUrl: "https://github.com/username/task-api",
    liveUrl: null, // No live demo for API
    category: "api",
    featured: false
  },
  {
    title: "Mobile Expense Tracker",
    description: "Cross-platform mobile app for tracking expenses with category management, budget planning, and visual analytics. Includes offline data sync.",
    technologies: ["React Native", "Redux", "SQLite", "Chart.js", "AsyncStorage"],
    imageUrl: null,
    githubUrl: "https://github.com/username/expense-tracker",
    liveUrl: null, // Mobile app
    category: "mobile",
    featured: true
  },
  {
    title: "Code Snippet Manager",
    description: "Developer tool for organizing and sharing code snippets with syntax highlighting, tagging system, and team collaboration features.",
    technologies: ["Vue.js", "Python", "FastAPI", "SQLite", "Prism.js"],
    imageUrl: null,
    githubUrl: "https://github.com/username/snippet-manager",
    liveUrl: "https://snippet-manager-demo.herokuapp.com",
    category: "tool",
    featured: false
  },
  {
    title: "Real-time Chat App",
    description: "Modern chat application with real-time messaging, file sharing, emoji reactions, and group chat functionality. Features responsive design and dark mode.",
    technologies: ["Next.js", "Socket.io", "MongoDB", "Cloudinary", "TailwindCSS"],
    imageUrl: null,
    githubUrl: "https://github.com/username/chat-app",
    liveUrl: "https://chat-app-demo.vercel.app",
    category: "web",
    featured: true
  }
];

// Project image options
const projectOptions = {
  useLocalImages: false, // Set to true if you want to store screenshots in assets/projects/
  useGeneratedFallbacks: true, // Custom SVG icons based on category
  showOnlyFeatured: false // Set to true to only show featured projects
};

// Category-based SVG icons for fallbacks
const getCategoryIcon = (category) => {
  const icons = {
    web: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M2 17L12 22L22 17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M2 12L12 17L22 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    mobile: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" stroke="white" stroke-width="2"/>
      <line x1="12" y1="18" x2="12.01" y2="18" stroke="white" stroke-width="2" stroke-linecap="round"/>
    </svg>`,
    api: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" stroke="white" stroke-width="2"/>
      <polyline points="14,2 14,8 20,8" stroke="white" stroke-width="2"/>
      <line x1="16" y1="13" x2="8" y2="13" stroke="white" stroke-width="2"/>
      <line x1="16" y1="17" x2="8" y2="17" stroke="white" stroke-width="2"/>
      <polyline points="10,9 9,9 8,9" stroke="white" stroke-width="2"/>
    </svg>`,
    tool: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke="white" stroke-width="2"/>
    </svg>`,
    game: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="6" y1="2" x2="6" y2="6" stroke="white" stroke-width="2"/>
      <line x1="18" y1="2" x2="18" y2="6" stroke="white" stroke-width="2"/>
      <line x1="6" y1="10" x2="6" y2="14" stroke="white" stroke-width="2"/>
      <line x1="18" y1="10" x2="18" y2="14" stroke="white" stroke-width="2"/>
      <line x1="6" y1="18" x2="6" y2="22" stroke="white" stroke-width="2"/>
      <line x1="18" y1="18" x2="18" y2="22" stroke="white" stroke-width="2"/>
    </svg>`
  };
  return icons[category] || icons.web;
};

// Generate project image HTML
const generateProjectImageHTML = (project) => {
  if (projectOptions.useLocalImages && project.imageUrl) {
    // Local images stored in assets/projects/
    return `<img src="assets/projects/${project.imageUrl}" alt="${project.title} screenshot" class="project-img">`;
  } else if (projectOptions.useGeneratedFallbacks) {
    // Custom SVG icons based on category
    return getCategoryIcon(project.category);
  } else {
    // Default icon fallback
    return `<i class="fas fa-code"></i>`;
  }
};

// Generate project links HTML
const generateProjectLinksHTML = (project) => {
  let linksHTML = '';
  
  if (project.githubUrl) {
    linksHTML += `<a href="${project.githubUrl}" target="_blank" class="project-link">
                    <i class="fab fa-github"></i> Code
                  </a>`;
  }
  
  if (project.liveUrl) {
    linksHTML += `<a href="${project.liveUrl}" target="_blank" class="project-link">
                    <i class="fas fa-external-link-alt"></i> Live Demo
                  </a>`;
  }
  
  return linksHTML;
};

// Generate HTML for a single project
const generateProjectHTML = (project) => {
  const techTags = project.technologies.map(tech => 
    `<span class="tech-tag">${tech}</span>`
  ).join('\n                            ');
  
  return `                <div class="project-card">
                    <div class="project-image">
                        ${generateProjectImageHTML(project)}
                    </div>
                    <div class="project-content">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <div class="project-tech">
                            ${techTags}
                        </div>
                        <div class="project-links">
                            ${generateProjectLinksHTML(project)}
                        </div>
                    </div>
                </div>`;
};

// Generate complete projects grid HTML
const generateProjectsGridHTML = () => {
  let filteredProjects = projectsData;
  
  if (projectOptions.showOnlyFeatured) {
    filteredProjects = projectsData.filter(project => project.featured);
  }
  
  const projectsHTML = filteredProjects.map(generateProjectHTML).join('\n');
  
  return `            <div class="projects-grid">
${projectsHTML}
                
                <!-- Generated from projects-generator.js -->
            </div>`;
};

// Main function to generate and display HTML
const generateProjectsHTML = () => {
  const html = generateProjectsGridHTML();
  
  console.log('🚀 Generated Projects HTML:');
  console.log('============================');
  console.log(html);
  console.log('============================');
  console.log('📋 Copy the above HTML and replace the projects-grid div in your index.html file');
  
  // return html;
};

// Browser compatibility check
if (typeof module !== 'undefined' && module.exports) {
  // Node.js environment
  module.exports = { generateProjectsHTML, projectsData };
} else {
  // Browser environment
  window.generateProjectsHTML = generateProjectsHTML;
  window.projectsData = projectsData;
}

// Auto-run if in browser console
if (typeof window !== 'undefined') {
  console.log('🚀 Projects Generator loaded! Run generateProjectsHTML() to generate your projects HTML.');
}
