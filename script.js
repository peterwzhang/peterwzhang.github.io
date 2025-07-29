// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const themeToggle = document.getElementById('theme-toggle');
const navbar = document.getElementById('navbar');

// Theme Management
const initTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const theme = savedTheme || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
  updateThemeIcon(theme);
};

const toggleTheme = () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
};

const updateThemeIcon = (theme) => {
  const icon = themeToggle.querySelector('i');
  icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
};

// Mobile Navigation
const toggleMobileMenu = () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
  document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
};

const closeMobileMenu = () => {
  hamburger.classList.remove('active');
  navMenu.classList.remove('active');
  document.body.style.overflow = '';
};

// Smooth Scrolling for Navigation Links
const handleNavClick = (e) => {
  const target = e.target;
  if (target.classList.contains('nav-link')) {
    e.preventDefault();
    const targetId = target.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      closeMobileMenu();
    }
  }
};

// Navbar Scroll Effect
const handleScroll = () => {
  const scrollY = window.scrollY;
  
  if (scrollY > 100) {
    navbar.style.backgroundColor = 'rgba(var(--bg-primary-rgb), 0.95)';
    navbar.style.backdropFilter = 'blur(10px)';
  } else {
    navbar.style.backgroundColor = 'var(--bg-primary)';
    navbar.style.backdropFilter = 'blur(0px)';
  }
};

// Intersection Observer for Animations
const observeElements = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll([
    '.timeline-item',
    '.skill-category',
    '.project-card',
    '.book-card'
  ].join(', '));

  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
};

// Active Navigation Link Highlighting
const updateActiveNavLink = () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
};

// Typing Animation for Hero Text
const typeWriter = (element, text, speed = 100) => {
  let i = 0;
  element.textContent = '';
  
  const timer = setInterval(() => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(timer);
    }
  }, speed);
};

// Initialize Typing Animation
const initTypeWriter = () => {
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    setTimeout(() => {
      typeWriter(heroTitle, originalText, 50);
    }, 500);
  }
};

// Parallax Effect for Hero Section
const handleParallax = () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  const rate = scrolled * -0.5;
  
  if (hero) {
    hero.style.transform = `translate3d(0, ${rate}px, 0)`;
  }
};

// Skill Tags Animation
const animateSkillTags = () => {
  const skillTags = document.querySelectorAll('.skill-tag');
  
  skillTags.forEach((tag, index) => {
    tag.style.animationDelay = `${index * 0.1}s`;
    tag.classList.add('animate-in');
  });
};

// Add CSS animation class
const addAnimationStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    .animate-in {
      animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .nav-link.active {
      color: var(--primary-color);
    }
    
    .nav-link.active::after {
      width: 100%;
    }
  `;
  document.head.appendChild(style);
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  observeElements();
  addAnimationStyles();
  
  // Event Listeners
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
  
  if (hamburger) {
    hamburger.addEventListener('click', toggleMobileMenu);
  }
  
  if (navMenu) {
    navMenu.addEventListener('click', handleNavClick);
  }
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
      closeMobileMenu();
    }
  });
  
  // Scroll events
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    handleScroll();
    updateActiveNavLink();
    
    // Throttle parallax for better performance
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(() => {
        handleParallax();
        scrollTimeout = null;
      }, 10);
    }
  });
  
  // Resize event
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      closeMobileMenu();
    }
  });
  
  // Initialize animations after a short delay
  setTimeout(() => {
    animateSkillTags();
  }, 1000);
});

// Utility Functions
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Add smooth hover effects to cards
const addCardEffects = () => {
  const cards = document.querySelectorAll('.project-card, .book-card, .skill-category');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });
};

// Drag to scroll functionality for books and projects
const initDragScroll = () => {
  const scrollableGrids = document.querySelectorAll('.books-grid, .projects-grid');
  
  scrollableGrids.forEach(grid => {
    let isDown = false;
    let startX;
    let scrollLeft;

    const handleMouseDown = (e) => {
      isDown = true;
      grid.classList.add('dragging');
      startX = e.pageX - grid.offsetLeft;
      scrollLeft = grid.scrollLeft;
      grid.style.cursor = 'grabbing';
      grid.style.userSelect = 'none';
    };

    const handleMouseLeave = () => {
      isDown = false;
      grid.classList.remove('dragging');
      grid.style.cursor = 'grab';
      grid.style.userSelect = 'auto';
    };

    const handleMouseUp = () => {
      isDown = false;
      grid.classList.remove('dragging');
      grid.style.cursor = 'grab';
      grid.style.userSelect = 'auto';
    };

    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - grid.offsetLeft;
      const walk = (x - startX) * 2; // Scroll speed multiplier
      grid.scrollLeft = scrollLeft - walk;
    };

    // Touch events for mobile
    const handleTouchStart = (e) => {
      isDown = true;
      startX = e.touches[0].pageX - grid.offsetLeft;
      scrollLeft = grid.scrollLeft;
    };

    const handleTouchMove = (e) => {
      if (!isDown) return;
      const x = e.touches[0].pageX - grid.offsetLeft;
      const walk = (x - startX) * 2;
      grid.scrollLeft = scrollLeft - walk;
    };

    const handleTouchEnd = () => {
      isDown = false;
    };

    // Mouse events
    grid.addEventListener('mousedown', handleMouseDown);
    grid.addEventListener('mouseleave', handleMouseLeave);
    grid.addEventListener('mouseup', handleMouseUp);
    grid.addEventListener('mousemove', handleMouseMove);

    // Touch events
    grid.addEventListener('touchstart', handleTouchStart, { passive: true });
    grid.addEventListener('touchmove', handleTouchMove, { passive: true });
    grid.addEventListener('touchend', handleTouchEnd);

    // Set initial cursor
    grid.style.cursor = 'grab';

    // Prevent click events during drag
    grid.addEventListener('click', (e) => {
      if (grid.classList.contains('dragging')) {
        e.preventDefault();
        e.stopPropagation();
      }
    }, true);
  });
};

// Initialize card effects after DOM load
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(addCardEffects, 100);
  initDragScroll();
});

// Prefers reduced motion check
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
  // Disable animations for users who prefer reduced motion
  document.documentElement.style.setProperty('--transition', 'none');
}
