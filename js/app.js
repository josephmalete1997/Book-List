const booksPanel = document.querySelector(".books-panel");

fetch("js/data.json", {})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    data["data"]["books"].forEach((item) => {
      const book = document.createElement("div");
      book.className = "book";
      book.id = item.id;
      book.innerHTML = `
            <h2>${item.title}</h2>
            <img src="${item.cover_image}" alt="${item.title} cover">
       `;
      booksPanel.append(book);
    });
  })
  .catch((error) => {
    console.error(error);
  });
