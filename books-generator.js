// Books Data
const booksData = [
  {
    title: "The Pragmatic Programmer",
    author: "David Thomas, Andrew Hunt",
    isbn: "9780201616224",
  },
  {
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    isbn: "9781449373320",
  },
  {
    title: "Refactoring",
    author: "Martin Fowler",
    isbn: "9780134757599",
  },
  {
    title: "Software Engineering at Google",
    author: "Titus Winters, Hyrum Wright, Tom Manshreck",
    isbn: "9781492082798",
  },
  {
    title: "Accelerate",
    author: "Nicole Forsgren, Jez Humble, Gene Kim",
    isbn: "9781942788331",
  },
  {
    title: "The Manager's Path",
    author: "Camille Fournier",
    isbn: "9781491973899",
  },
  {
    title: "Staff Engineer",
    author: "Will Larson",
    isbn: "9781736417911",
  },
  {
    title: "Making Work Visible",
    author: "Dominica DeGrandis",
    isbn: "9781942788157",
  },
];

// Expose to window for script.js
if (typeof window !== 'undefined') {
  window.booksData = booksData;
}
