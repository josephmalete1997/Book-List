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

const favoriteBooks = JSON.parse(localStorage.getItem("favorite" || []));
export { genreList, favoriteBooks };
