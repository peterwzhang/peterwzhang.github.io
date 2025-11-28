# Peter Zhang - Portfolio

A modern, responsive portfolio website showcasing projects, skills, and book recommendations.

## Features

- **OS Simulator Theme**: A unique, interactive desktop environment experience.
- **Window Management**: Open, close, minimize, maximize, drag, and resize windows.
- **Responsive Design**: Works seamlessly on desktop and mobile devices.
- **Dynamic Content**: Projects and book recommendations are loaded from separate data files for easy updates.
- **Interactive Elements**:
  - **Start Menu**: Access apps and system functions.
  - **Taskbar**: Switch between open windows.
  - **Terminal**: A functional command-line interface.
  - **Lock Screen**: Secure your session (simulated).
  - **Shutdown**: Simulate a system shutdown.

## Technologies Used

- **HTML5**: Semantic structure.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **JavaScript (ES6+)**: Core logic for the OS simulator and window management.
- **FontAwesome**: Icons for apps and UI elements.
- **Google Fonts**: Typography (Inter font family).

## Setup & Development

1. **Clone the repository**:

   ```bash
   git clone https://github.com/peterwzhang/peterwzhang.github.io.git
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Build CSS**:
   The project uses Tailwind CSS. To generate the `styles.css` file:

   ```bash
   npx tailwindcss-cli -i ./input.css -o ./styles.css --minify
   ```

4. **Open `index.html`**: You can view the site directly in your browser.

## Customization

- **Projects**: Edit `projects-generator.js` to add or modify your projects.
- **Books**: Edit `books-generator.js` to update your reading list.
- **Profile**: Update `index.html` and `script.js` with your personal details and links.

## Deployment

This site is designed to be hosted on **GitHub Pages**. Simply push your changes to the `master` branch, and GitHub will automatically build and deploy your site.
