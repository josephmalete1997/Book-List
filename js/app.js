import { closePopUps } from "./pop_up.js";
import { elements } from "./ui_elements.js";
import { viewBook } from "./helper_functions.js";
const { bookDetails, booksPanel, genrePanel, overlay, closeBtn } = elements;

const genreList = [
  "All",
  "Fiction",
  "Dystopian",
  "Fantasy",
  "Romance",
  "Adventure",
  "Gothic",
  "Mystery",
  "Psychological",
  "Epic",
  "Non-fiction",
  "Horror",
  "Science Fiction",
];

function getAllBooks(data) {
  data["data"]["books"].forEach((item, index) => {
    const favBtn = document.createElement("i");
    favBtn.className = "fa-regular fa-heart fav-icon";

    const bookCover = document.createElement("div");
    bookCover.className = "book-cover";
    bookCover.style.backgroundImage = `url(${item.cover_image})`;

    const book = document.createElement("div");
    book.className = "book";
    book.id = item.id;
    book.innerHTML = `
            <span class="genre-tag">${item.genre}</span>
            <span class="book-tool-tip"><i class="fa-solid fa-circle-info"></i> View details</span>
            <h3>${
              item.title.length > 20
                ? item.title.slice(0, 20) + "..."
                : item.title
            }</h3>
       `;
    book.append(bookCover);
    book.append(favBtn);
    favBtn.addEventListener("click", () => {
      favBtn.classList.toggle("fa-solid");
      favBtn.classList.toggle("scale");
    });
    bookCover.addEventListener("click", () => {
      viewBook(item);
      overlay.classList.toggle("show");
      bookDetails.classList.toggle("show");
      document.querySelector(".fa-times").addEventListener("click", () => {
        closePopUps();
      });
    });

    booksPanel.append(book);
  });
}

function getBooksByGenre(data, genre) {
  booksPanel.innerHTML = "";
  data["data"]["books"].forEach((item) => {
    if (item.genre === genre) {
      const favBtn = document.createElement("i");
      favBtn.className = "fa-regular fa-heart fav-icon";
      const book = document.createElement("div");
      book.className = "book";
      book.id = item.id;
      book.innerHTML = `
            <span class="genre-tag">${item.genre}</span>
            <h3>${item.title.slice(0, 20)}...</h3>
            <div class="book-cover" style="background-image:url(${
              item.cover_image
            })">
       `;
      book.append(favBtn);
      booksPanel.append(book);
    }
  });
  if (genre === "All") {
    getAllBooks(data);
  }
}

fetch("js/data.json", {})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    getAllBooks(data);

    genreList.forEach((item) => {
      const genre = document.createElement("div");
      genre.className = "genre-btn";
      genre.id = item;
      genre.addEventListener("click", () => {
        removeActiveGenre();
        genre.classList.add("active-genre");
        getBooksByGenre(data, item);
      });
      genre.innerHTML = item;
      genrePanel.append(genre);
    });
  })

  .catch((error) => {
    console.error(error);
  });

function removeActiveGenre() {
  document.querySelectorAll(".genre-btn").forEach((item) => {
    item.classList.remove("active-genre");
  });
}
