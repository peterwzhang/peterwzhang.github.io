# Peter Zhang - Portfolio Website

A modern, responsive portfolio website showcasing projects, skills, and book recommendations with beautiful SVG fallbacks and horizontal scrolling galleries.

## Features

- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Dark/Light Mode** - Toggle between themes
- **Horizontal Scrolling** - Interactive project and book galleries
- **Smart Fallbacks** - Custom SVG icons when images fail to load
- **Generated Content** - Easy-to-maintain book and project generators
- **Modern UI** - Clean, professional design with smooth animations

## Project Structure

```text
├── index.html              # Main website file
├── styles.css              # All styling and responsive design
├── script.js               # Interactive functionality
├── books-generator.js      # Book recommendations generator
├── projects-generator.js   # Projects showcase generator
├── test-fallbacks.html     # Test page for book cover fallbacks
└── assets/
    └── groupmeutils.png    # Project assets
```

## Content Generators

This portfolio includes powerful generator tools to easily manage your projects and book recommendations.

### Book Generator

The book generator creates a beautiful scrolling gallery of book recommendations with:

- Real book covers from Open Library API
- Custom SVG fallbacks for missing covers
- Star ratings and descriptions
- Automatic ISBN-based cover fetching

#### How to Use the Book Generator

1. **Edit Book Data** - Open `books-generator.js` and modify the `booksData` array:

```javascript
const booksData = [
  {
    title: "Your Book Title",
    author: "Author Name",
    isbn: "9780123456789",
    description: "Why you recommend this book",
    rating: 5, // 1-5 stars
    amazonUrl: "https://amazon.com/link" // Optional
  }
];
```

2. **Generate HTML** - Run the generator:

```bash
# From your project directory:
node -e "const { generateHTML } = require('./books-generator.js'); console.log(generateHTML());"
```

3. **Update Your Site** - Copy the generated HTML and replace the `books-grid` section in `index.html`

#### Book Generator Features

- **Real Book Covers**: Automatically fetches covers using ISBN from Open Library
- **Smart Fallbacks**: Beautiful white SVG book icons for missing covers
- **Easy Maintenance**: Just edit the data array and regenerate
- **Flexible Options**: Toggle Amazon links, local images, or fallback types

### Project Generator

**Note: The projects section has been temporarily removed from the website but can be easily restored using the project generator.**

The project generator creates a horizontal scrolling showcase of your projects with:

- Category-based SVG icons (web, mobile, API, tools)
- Technology tags
- GitHub and live demo links
- Professional descriptions

#### How to Re-add the Projects Section

1. **Add Navigation Link** - In `index.html`, add the projects navigation item:

```html
<li class="nav-item">
    <a href="#projects" class="nav-link">Projects</a>
</li>
```

2. **Add Projects Section** - Insert the projects section HTML between the Skills and Library sections:

```html
<!-- Projects Section -->
<section id="projects" class="section">
    <div class="container">
        <h2 class="section-title">Projects</h2>
        <p class="section-subtitle">Some of my favorite personal projects</p>
        <div class="projects-grid">
            <!-- Generated project cards will go here -->
            
            <!-- Generated from projects-generator.js -->
        </div>
    </div>
</section>
```

3. **Generate Project Content** - Use the project generator to create project cards:

1. **Edit Project Data** - Open `projects-generator.js` and modify the `projectsData` array:

```javascript
const projectsData = [
  {
    title: "My Awesome Project",
    description: "What your project does and what problem it solves",
    technologies: ["React", "Node.js", "MongoDB"],
    githubUrl: "https://github.com/username/project",
    liveUrl: "https://project-demo.com", // Optional
    category: "web", // web, mobile, api, tool, game
    featured: true
  }
];
```

2. **Generate HTML** - Run the generator:

```bash
# From your project directory:
node -e "const { generateProjectsHTML } = require('./projects-generator.js'); console.log(generateProjectsHTML());"
```

3. **Update Your Site** - Copy the generated HTML and replace the `projects-grid` section in `index.html`

#### Project Categories & Icons

- **Web Apps** - Layered stack icon (React, Vue, Angular apps)
- **Mobile Apps** - Phone icon (React Native, Flutter apps)
- **APIs** - Document icon (REST APIs, GraphQL services)
- **Tools** - Wrench icon (Developer tools, utilities)
- **Games** - Controller icon (Games, interactive apps)

#### Project Generator Options

```javascript
const projectOptions = {
  useLocalImages: false,      // Set true for local screenshots
  useGeneratedFallbacks: true, // Custom SVG icons
  showOnlyFeatured: false     // Filter to featured projects only
};
```

## Customization

### Adding Your Own Content

1. **Personal Info** - Update the hero section in `index.html` with your details
2. **Experience** - Add your work history in the timeline section
3. **Skills** - Modify the skills grid with your technologies
4. **Contact** - Update contact information and social links

### Styling

- **Colors** - Modify CSS custom properties in `styles.css` `:root` section
- **Fonts** - Change `--font-primary` variable for different typography
- **Layout** - Adjust spacing, sizing, and responsive breakpoints

### Adding Screenshots

For projects with screenshots:

1. Create `assets/projects/` directory
2. Add your screenshots (e.g., `ecommerce-demo.png`)
3. Set `useLocalImages: true` in `projects-generator.js`
4. Add `imageUrl: "screenshot.png"` to your project data

## Quick Start

1. **Clone/Download** this repository
2. **Edit Content** - Update personal information in `index.html`
3. **Add Projects** - Use the project generator to add your work
4. **Add Books** - Use the book generator for recommendations
5. **Customize** - Adjust colors, fonts, and styling as needed
6. **Deploy** - Upload to GitHub Pages, Netlify, or your hosting service

## Testing

- **Responsive Design** - Test on different screen sizes
- **Dark Mode** - Toggle theme switch to test both modes

## Pro Tips

### Generator Usage

- Run generators whenever you add new projects or books
- Keep the original files as your source of truth
- Use meaningful commit messages when updating generated content

### Performance

- Optimize images before adding to `assets/` folder
- Book covers load from CDN automatically
- Consider lazy loading for large image collections

### SEO

- Update meta description in `index.html` head section
- Add relevant keywords for your skills and projects
- Use descriptive alt text for images

**Built with modern CSS, vanilla JavaScript, and smart content generators.**
