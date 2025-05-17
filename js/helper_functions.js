import { elements } from "./ui_elements.js";
const { bookDetails } = elements;

function addToFavorite(item) {
  if (!localStorage.getItem("favorite")) {
    localStorage.setItem("favorite", JSON.stringify([]));
  }

  let favArray = JSON.parse(localStorage.getItem("favorite"));
  if (!favArray.some((favItem) => favItem.id === item.id)) favArray.push(item);
  localStorage.setItem("favorite", JSON.stringify(favArray));
}

function setFavorite(elem, favorite) {
  favorite.forEach((favItem) => {
    elem.id === favItem
      ? elem.classList.add("fa-solid")
      : elem.classList.add("fa-regular");
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

function populateFavorite(data) {
  `<div class="favorite-book">
      <div class="favorite-book-cover"></div>
      <div class="favorite-book-text">
        <h2>Title</h2>
        <div><button>Remove</button></div>
      </div>
   </div>`;
}

export { viewBook, populateFavorite, addToFavorite, setFavorite };
