import { elements } from "./ui_elements.js";
import { createBooks } from "./helper_functions.js";
import { genreList } from "./helper_objects.js";
const { booksPanel, genrePanel ,bookText} = elements;

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

fetch("js/books.json", {})
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
