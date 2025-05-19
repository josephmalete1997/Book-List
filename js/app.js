import { elements } from "./ui_elements.js";
import { createBooks } from "./helper_functions.js";
import { genreList } from "./helper_objects.js";
const { booksPanel, genrePanel } = elements;

function getAllBooks(data) {
  data["data"]["books"].forEach((item) => {
    createBooks(item);
  });
}

function getBooksByGenre(data, genre) {
  booksPanel.innerHTML = "";
  data["data"]["books"].forEach((item) => {
    if (item.genre === genre) {
      createBooks(item);
    }
  });
  if (genre === "All") {
    getAllBooks(data);
  }
}

const storedData = localStorage.getItem("bookData");
const storedGenre = localStorage.getItem("activeGenre");

if (storedData) {
  const data = JSON.parse(storedData);
  getAllBooks(data);

  genreList.forEach((item) => {
    const genre = document.createElement("div");
    genre.className = "genre-btn";
    genre.id = item;
    genre.innerHTML = item;

    if (item === storedGenre) {
      genre.classList.add("active-genre");
      getBooksByGenre(data, item);
    }

    genre.addEventListener("click", () => {
      removeActiveGenre();
      genre.classList.add("active-genre");
      localStorage.setItem("activeGenre", item);
      getBooksByGenre(data, item);
    });

    genrePanel.append(genre);
  });
} else {
  fetch("js/books.json", {})
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("bookData", JSON.stringify(data));
      getAllBooks(data);

      genreList.forEach((item) => {
        const genre = document.createElement("div");
        genre.className = "genre-btn";
        genre.id = item;
        genre.innerHTML = item;

        genre.addEventListener("click", () => {
          removeActiveGenre();
          genre.classList.add("active-genre");
          localStorage.setItem("activeGenre", item);
          getBooksByGenre(data, item);
        });

        genrePanel.append(genre);
      });
    });
}

function removeActiveGenre() {
  document.querySelectorAll(".genre-btn").forEach((item) => {
    item.classList.remove("active-genre");
  });
}
