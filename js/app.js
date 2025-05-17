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

genreList.forEach((item) => {
  const genre = document.createElement("div");
  genre.id = item;
  if (item === "All") genre.className = "active-genre";
  genre.innerHTML = item;
  genrePanel.append(genre);
});

fetch("js/data.json", {})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    data["data"]["books"].forEach((item) => {
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
    });
  })
  .catch((error) => {
    console.error(error);
  });
