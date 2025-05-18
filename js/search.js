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
        booksPanel.innerHTML = `
        <div style="margin:auto;display:flex;flex-direction:column;justify-content:center;align-items:center;">
        <i style="font-size:140px;"class="fa-brands fa-optin-monster"></i>
        <h3>Oops! No results f <i class="fa-solid fa-search"></i>und for "${searchTerm}"</h3>.
        </div>`;
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
              <div class="book-card-image image" style="background-image:url(${
                book.cover_image
              })">
              <span class="search-genre-tag">${book.genre}</span>
              
              </div>
              <h3>${book.title}</h3>
              <p><strong>Author:</strong> ${book.author}</p>
              <p><strong>Rating:</strong> ${book.rating}</p>
              <p style="font-size:12px;">${
                book.description.split(" ").length > 10
                  ? book.description.split(" ").slice(0, 20).join(" ")
                  : book.description
              }</p>
            </div>
          `
            )
            .join("")}
        </div>
      `;
        const isDark = localStorage.getItem("theme") === "dark";
        document.querySelectorAll(".book-card").forEach((text) => {
          text.classList.toggle("dark-panel", isDark);
        });
      }
    });
});
