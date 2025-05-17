import { elements } from "./ui_elements.js";
import { favoriteBooks } from "./helper_objects.js";
const { bookDetails, FavoriteBooksList, successMessage, favoriteCount } =
  elements;

function showMessage(message) {
  successMessage.classList.toggle("show");
  successMessage.append(message);
  setTimeout(() => {
    successMessage.innerHTML = "";
    successMessage.classList.toggle("show");
  }, 2000);
}

function getFavoriteCount(arr) {
  favoriteCount.innerHTML = ` (${arr.length})`;
}

function setFavorite(elem, book) {
  let favorites = JSON.parse(localStorage.getItem("favorite")) || [];
  getFavoriteCount(favorites);
  const elemId = parseInt(elem.id);
  const index = favorites.findIndex((item) => item.id === elemId);

  if (index !== -1) {
    elem.classList.add("fa-solid");
    elem.classList.remove("fa-regular");
  } else {
    elem.classList.add("fa-regular");
    elem.classList.remove("fa-solid");
  }

  elem.addEventListener("click", () => {
    favorites = JSON.parse(localStorage.getItem("favorite")) || [];
    const index = favorites.findIndex((item) => item.id === elemId);

    if (index !== -1) {
      setTimeout(() => {
        showMessage("Removed successfully");
        favorites.splice(index, 1);
        elem.classList.remove("fa-solid");
        elem.classList.add("fa-regular");
        localStorage.setItem("favorite", JSON.stringify(favorites));
        getFavoriteCount(favorites);
      }, 1000);
    } else {
      setTimeout(() => {
        showMessage("Added successfully");
        favorites.push(book);
        elem.classList.remove("fa-regular");
        elem.classList.add("fa-solid");
        localStorage.setItem("favorite", JSON.stringify(favorites));
        getFavoriteCount(favorites);
      }, 1000);
    }
  });
}

function viewBook(item) {
  bookDetails.innerHTML = `
  <i class="fa-solid fa-times"></i>
    <div class='left'>
        <div class="viewed-book-cover" style="background-image:url(${item.cover_image})"></div>
    </div>
    <div class='right'>
        <h1>Title:${item.title}</h1>
        <h3>Author </h3>
        <p>${item.author}</p>
        <h3>Genre </h3>
        <p>${item.genre}</p>
        <h3>Description:</h3>
        <p>${item.description}</p>
        <h3>Rating </h3>
        <p><i class="fa-solid fa-star"></i> ${item.rating}</p>
        <h3>ISBN</h3>
        <p>${item.isbn}</p>
        <h3>Date Published</h3>
        <p><i class="fa-solid fa-calendar"></i> ${item.published_date}</p>
        <h3>Number of pages</h3>
        <p>${item.page_count}</p>
    </div>
    `;
}

function populateFavorite() {
  let refreshStorage = favoriteBooks;
  if (refreshStorage.length > 0) {
    refreshStorage = favoriteBooks;
    FavoriteBooksList.innerHTML = "";
    refreshStorage.forEach((item) => {
      const book = document.createElement("div");
      const deleteBtn = document.createElement("div");
      deleteBtn.className = "remove-favorite";
      deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i> Remove`;
      book.innerHTML = `<div class="favorite-book">
      <div class="favorite-book-cover" style="background-image: url(${item.cover_image});"></div>
      <div class="favorite-book-text">
      <strong><p>${item.title}</p></strong>
      <p><strong>Author</strong> ${item.author}</p>
      </div>
      </div>`;
      book.append(deleteBtn);
      FavoriteBooksList.append(book);
    });
  } else {
    FavoriteBooksList.innerHTML = "No books found!";
  }
}

export { viewBook, populateFavorite, setFavorite };
