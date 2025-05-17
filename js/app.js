const booksPanel = document.querySelector(".books-panel");
const genrePanel = document.querySelector(".genre-list");

const genreList = [
  { name: "All", color: "#6c757d" },
  { name: "Fiction", color: "#007bff" },
  { name: "Dystopian", color: "#343a40" },
  { name: "Fantasy", color: "#6f42c1" },
  { name: "Romance", color: "#e83e8c" },
  { name: "Adventure", color: "#fd7e14" },
  { name: "Gothic", color: "#495057" },
  { name: "Mystery", color: "#20c997" },
  { name: "Psychological", color: "#17a2b8" },
  { name: "Epic", color: "#6610f2" },
  { name: "Non-fiction", color: "#28a745" },
  { name: "Horror", color: "#dc3545" },
  { name: "Science Fiction", color: "#0dcaf0" },
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
      genre.id = item.name;
      genre.addEventListener("click", () => {
        removeActiveGenre();
        genre.classList.add("active-genre");
        getBooksByGenre(data, item.name);
      });
      genre.innerHTML = item.name;
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
