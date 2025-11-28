// Projects Data
const projectsData = [
  {
    title: "TikTok Trivia Helper",
    description: "A program that finds answers for TikTok Trivia questions using Google search and OpenAI's ChatGPT API. Features Tesseract OCR for question detection and Discord webhook support.",
    technologies: ["Python", "OpenAI API", "OpenCV", "Tesseract OCR", "BeautifulSoup4", "PyAutoGUI"],
    imageUrl: null,
    githubUrl: "https://github.com/peterwzhang/TikTok-Trivia-Helper",
    liveUrl: null,
    category: "tool"
  },
  {
    title: "MRI Research Interface",
    description: "An interface that allows MRI researchers to easily run scripts on a High Performance Computing (HPC) server. Built with React/TypeScript frontend and Java Spring Boot backend.",
    technologies: ["React", "Spring Boot", "PostgreSQL", "TypeScript", "Material UI", "Java 17", "Liquibase", "Maven"],
    imageUrl: null,
    githubUrl: "https://github.com/peterwzhang/MRI",
    liveUrl: "https://peterwzhang.github.io/MRI/",
    category: "web"
  },
  {
    title: "tryPy",
    description: "A block-based programming language built on Python, designed for teaching math to late elementary and middle school students. Created for CS 403 Programming Languages.",
    technologies: ["Python", "Pygame"],
    imageUrl: null,
    githubUrl: "https://github.com/peterwzhang/tryPy",
    category: "tool"
  },
  {
    title: "Game of Life",
    description: "An interactive implementation of Conway's Game of Life with cell placement, grid clearing, and simulation controls. Built with C++ and SFML.",
    technologies: ["C++", "SFML", "CMake", "vcpkg"],
    imageUrl: null,
    githubUrl: "https://github.com/peterwzhang/GameofLife",
    liveUrl: null,
    category: "game"
  },
  {
    title: "LISP Interpreter",
    description: "A Lisp interpreter built in Python, based on Kamin's Pascal implementation. Uses Tim Budd's C++ version for testing. Created for CS 403 Programming Languages.",
    technologies: ["Python"],
    imageUrl: null,
    githubUrl: "https://github.com/peterwzhang/LISP-Interpreter",
    category: "tool"
  }
];

// Expose to window for script.js
if (typeof window !== 'undefined') {
  window.projectsData = projectsData;
}
