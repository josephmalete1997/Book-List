import { elements } from "./ui_elements.js";
const { bookDetails } = elements;

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
    <p>${item.title}</p>
    <h3>Description:</h3>
    <p>${item.description}</p>
    <h3>Rating <i class="fa-solid fa-star"></i></h3>
    <p>${item.rating}</p>
    <h3>ISBN</h3>
    <p>${item.isbn}</p>
    <h3>Date Published</h3>
    <p>${item.published_date}</p>
    <h3>Number of pages</h3>
    <p>${item.page_count}</p>
    </div>
    `;
}

export { viewBook };
