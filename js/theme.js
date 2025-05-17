import { elements } from "./ui_elements.js";
const { books } = elements;

books.forEach((book) => {
  book.style.background = "black";
});

const switchBtn = document.querySelector(".theme-switch .dot");
const switchBtnIcon = switchBtn.querySelector("i");

applyStoredTheme();

switchBtn.addEventListener("click", () => {
  const currentTheme = switchBtnIcon.classList.contains("fa-moon")
    ? "dark"
    : "light";
  setTheme(currentTheme);
});



function setTheme(theme) {
  const isDark = theme === "dark";
  if (isDark) {
    document.body.style.background = "rgb(60, 60, 60)";
    // books.forEach((book) => book.classList.add("dark-panel"));
  } else {
    document.body.style.background = "#f4f4f4";
    // books.forEach((book) => book.classList.remove("dark-panel"));
  }

  switchBtn.classList.toggle("move", isDark);
  switchBtnIcon.classList.toggle("fa-moon", !isDark);
  switchBtnIcon.classList.toggle("fa-sun", isDark);

  localStorage.setItem("theme", theme);
}

function applyStoredTheme() {
  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);
}
