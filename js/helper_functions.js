function viewBook(data, id) {
  bookDetails.innerHTML = `
  <i class="fa-solid fa-times"></i>
    <div class='left'>
        <div class="viewed-book-cover"></div>
    </div>
    <div class='right'>
    <h1>Title:</h1>
    <h3>Author: Joseph Malete</h3>
    <p>Genre: </p>
    <h4>Description:</h4>
    <p>A murder in the Louvre reveals a religious conspiracy.</p>
    <p>Rating: </p>
    <p>ISBN: </p>
    <p>Date Published: 1997-06-26</p>
    <p>Number of pages: 209</p>
    </div>
    `;
}