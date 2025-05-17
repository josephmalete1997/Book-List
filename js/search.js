import { elements } from "./ui_elements.js";
const { searchInput, searchButton, booksPanel } = elements;

function searchRegexFunction(likePattern) {
  const reg =
    "^" +
    likePattern
      .replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&")
      .replace(/%/g, ".*")
      .replace(/_/g, ".") +
    "$";
  return new RegExp(reg, "i");
}

function bookMatches(book, pattern) {
  const regex = searchRegexFunction(`%${pattern}%`);
  return (
    regex.test(book.title) ||
    regex.test(book.author) ||
    regex.test(book.genre) ||
    regex.test(book.description)
  );
}

searchButton.addEventListener("click", () => {
  const searchTerm = searchInput.value.trim();
  
  fetch("./js/books.json")
  .then((response) => response.json())
  .then((data) => {
    const results = data.data.books.filter((book) =>
      bookMatches(book, searchTerm)
  );
  
  if (results.length === 0) {
        booksPanel.innerHTML = "";
        booksPanel.innerHTML = `<p>No results found for "${searchTerm}".</p>`;
        return;
      }
      if (searchTerm != "") {
        booksPanel.innerHTML = `
        <h2 style="margin-left:50px;">Results for "${searchTerm}":</h2>
        <div class="book-results">
          ${results
            .map(
              (book) => `
            <div class="book-card">
              <div class="book-card-image image" style="background-image:url(${book.cover_image})"></div>
              <h3>${book.title}</h3>
              <p><strong>Author:</strong> ${book.author}</p>
              <p><strong>Genre:</strong> ${book.genre}</p>
              <p><strong>Rating:</strong> ${book.rating}</p>
              <p>${book.description}</p>
            </div>
          `
            )
            .join("")}
        </div>
      `;
      }
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      booksPanel.innerHTML =
        "<p>Error fetching book data. Please try again.</p>";
    });
});
