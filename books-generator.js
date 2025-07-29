// Books Data - Easy to maintain
const booksData = [
  {
    title: "The Pragmatic Programmer",
    author: "David Thomas, Andrew Hunt",
    description: "",
    rating: 5,
    isbn: "9780201616224",
  },
  {
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    description: "",
    rating: 5,
    isbn: "9781449373320",
  },
  {
    title: "Refactoring",
    author: "Martin Fowler",
    description: "",
    rating: 5,
    isbn: "9780134757599",
  },
  {
    title: "Software Engineering at Google",
    author: "Titus Winters, Hyrum Wright, Tom Manshreck",
    description: "",
    rating: 5,
    isbn: "9781492082798",
  },
  {
    title: "Accelerate",
    author: "Nicole Forsgren, Jez Humble, Gene Kim",
    description: "",
    rating: 5,
    isbn: "9781942788331",
  },
  {
    title: "The Manager's Path",
    author: "Camille Fournier",
    description: "",
    rating: 5,
    isbn: "9781491973899",
  },
  {
    title: "Staff Engineer",
    author: "Will Larson",
    description: "",
    rating: 5,
    isbn: "9781736417911",
  },
  {
    title: "Making Work Visible",
    author: "Dominica DeGrandis",
    description: "",
    rating: 5,
    isbn: "9781942788157",
  },
];

// Cover generation options
const coverOptions = {
  useAPI: true, // Use Open Library API as primary
  useGeneratedCovers: true, // Fallback to custom SVG covers
  useLocalImages: false, // If you want to store images in assets/covers/
};

// Generate a custom SVG cover
const generateCustomCover = (book) => {
  const colors = [
    ["#667eea", "#764ba2"],
    ["#f093fb", "#f5576c"],
    ["#4facfe", "#00f2fe"],
    ["#43e97b", "#38f9d7"],
    ["#fa709a", "#fee140"],
    ["#a8edea", "#fed6e3"],
    ["#ffecd2", "#fcb69f"],
    ["#ff8a80", "#ffccbc"],
  ];

  const colorIndex = book.title.length % colors.length;
  const [color1, color2] = colors[colorIndex];

  // Create initials from title
  const initials = book.title
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

  return `data:image/svg+xml;base64,${btoa(`
    <svg width="120" height="160" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="120" height="160" fill="url(#grad)" rx="8"/>
      <text x="60" y="90" font-family="Arial, sans-serif" font-size="24" font-weight="bold" 
            text-anchor="middle" fill="white" opacity="0.9">${initials}</text>
      <rect x="10" y="130" width="100" height="2" fill="white" opacity="0.3"/>
      <rect x="10" y="135" width="80" height="2" fill="white" opacity="0.2"/>
    </svg>
  `)}`;
};

// Get Open Library cover URL (legal API)
const getOpenLibraryCover = (isbn) => {
  return `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg?default=false`;
};

// Generate cover HTML based on options
const generateCoverHTML = (book) => {
  if (coverOptions.useLocalImages && book.coverUrl) {
    // Local images stored in assets/covers/
    return `<img src="assets/covers/${book.coverUrl}" alt="${book.title} cover" class="book-cover-img">`;
  } else if (coverOptions.useAPI && book.isbn) {
    // Use Open Library API (legal, free) with custom white book SVG fallback
    const fallbackCover = `<svg width="40" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 19.5C4 18.837 4.264 18.201 4.732 17.732C5.201 17.264 5.837 17 6.5 17H20" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6.5 2H20V22H6.5C5.837 22 5.201 21.736 4.732 21.268C4.264 20.799 4 20.163 4 19.5V4.5C4 3.837 4.264 3.201 4.732 2.732C5.201 2.264 5.837 2 6.5 2Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M9 7H16" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M9 11H16" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M9 15H13" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`;

    return `<img src="${getOpenLibraryCover(book.isbn)}" alt="${
      book.title
    } cover" class="book-cover-img" 
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div class="book-cover-fallback" style="display: none;">
                ${fallbackCover}
            </div>`;
  } else if (coverOptions.useGeneratedCovers) {
    // Custom generated SVG covers
    return `<img src="${generateCustomCover(book)}" alt="${
      book.title
    } cover" class="book-cover-img">`;
  } else {
    // Default icon fallback with custom SVG
    return `<svg width="40" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 19.5C4 18.837 4.264 18.201 4.732 17.732C5.201 17.264 5.837 17 6.5 17H20" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6.5 2H20V22H6.5C5.837 22 5.201 21.736 4.732 21.268C4.264 20.799 4 20.163 4 19.5V4.5C4 3.837 4.264 3.201 4.732 2.732C5.201 2.264 5.837 2 6.5 2Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M9 7H16" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M9 11H16" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M9 15H13" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`;
  }
};

// Generate star rating HTML
const generateStars = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - Math.ceil(rating);

  let starsHTML = "";

  // Full stars
  for (let i = 0; i < fullStars; i++) {
    starsHTML += '<i class="fas fa-star"></i>\n                            ';
  }

  // Half star (if needed)
  if (hasHalfStar) {
    starsHTML +=
      '<i class="fas fa-star-half-alt"></i>\n                            ';
  }

  // Empty stars
  for (let i = 0; i < emptyStars; i++) {
    starsHTML += '<i class="far fa-star"></i>\n                            ';
  }

  return starsHTML.trim();
};

// Generate HTML for a single book
const generateBookHTML = (book) => {
  return `                <div class="book-card">
                    <div class="book-cover">
                        ${generateCoverHTML(book)}
                    </div>
                    <div class="book-info">
                        <h3>${book.title}</h3>
                        <p class="book-author">by ${book.author}</p>
                        <p class="book-description">${book.description}</p>
                        <div class="book-rating">
                            ${generateStars(book.rating)}
                        </div>
                    </div>
                </div>`;
};

// Generate complete books grid HTML
const generateBooksGridHTML = () => {
  const booksHTML = booksData.map(generateBookHTML).join("\n");

  return `            <div class="books-grid">
${booksHTML}
                
                <!-- Add more book recommendations -->
            </div>`;
};

// Main function to generate and display HTML
const generateHTML = () => {
  const html = generateBooksGridHTML();

  console.log("📚 Generated Books HTML:");
  console.log("========================");
  console.log(html);
  console.log("========================");
  console.log(
    "📋 Copy the above HTML and replace the books-grid div in your index.html file"
  );

  // Also create a file with the HTML for easy copying
  // return html;
};

// Browser compatibility check
if (typeof module !== "undefined" && module.exports) {
  // Node.js environment
  module.exports = { generateHTML, booksData };
} else {
  // Browser environment
  window.generateHTML = generateHTML;
  window.booksData = booksData;
}

// Auto-run if in browser console
if (typeof window !== "undefined") {
  console.log(
    "📚 Books Generator loaded! Run generateHTML() to generate your book HTML."
  );
}
