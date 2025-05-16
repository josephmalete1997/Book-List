const booksPanel = document.querySelector(".books-panel");
const genrePanel = document.querySelector(".genre-list");

const genreList = [
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
  const genre = document.createElement("input");
  genre.setAttribute("type", "checkbox");
  genre.value = item;
  genrePanel.append(genre);
});

fetch("js/data.json", {})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    data["data"]["books"].forEach((item) => {
      const book = document.createElement("div");
      book.className = "book";
      book.id = item.id;
      book.innerHTML = `
            <h3>${item.title.slice(0, 20)}...</h3>
            <div class="book-cover" style="background-image:url(${
              item.cover_image
            })">
       `;
      booksPanel.append(book);
    });
  })
  .catch((error) => {
    console.error(error);
  });
