const booksPanel = document.querySelector(".books-panel");
const genrePanel = document.querySelector(".genre-list");

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
  data["data"]["books"].forEach((item) => {
    const favBtn = document.createElement("i");
    favBtn.className = "fa-regular fa-heart fav-icon";
    const book = document.createElement("div");
    book.className = "book pseudo-after";
    book.id = item.id;
    book.innerHTML = `
            <span class="genre-tag">${item.genre}</span>
            <h3>${
              item.title.length > 20
                ? item.title.slice(0, 20) + "..."
                : item.title
            }</h3>
            <div class="book-cover" style="background-image:url(${
              item.cover_image
            })">
       `;
    book.append(favBtn);
    book.style.setProperty("--book-pseudo-bg", `url(${item.cover_image})`);
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
      book.className = "book pseudo-after";
      book.id = item.id;
      book.innerHTML = `
            <span class="genre-tag">${item.genre}</span>
            <h3>${item.title.slice(0, 20)}...</h3>
            <div class="book-cover" style="background-image:url(${
              item.cover_image
            })">
       `;
      book.append(favBtn);
      book.style.setProperty("--book-pseudo-bg", `url(${item.cover_image})`);
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
