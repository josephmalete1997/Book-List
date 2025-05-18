import { elements } from "./ui_elements.js";
const {
  favoritesPanel,
  headerOverlay,
  bookDetails,
  sideNav,
  headerHeart,
  favoriteCount,
} = elements;

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

  document.querySelectorAll(".book-title").forEach((text) => {
    text.classList.toggle("white-color", isDark);
  });

  document.querySelectorAll(".book-card").forEach((text) => {
    text.classList.toggle("dark-panel", isDark);
  });

  bookDetails.classList.toggle("dark-panel", isDark);
  favoritesPanel.classList.toggle("dark-panel", isDark);
  sideNav.classList.toggle("white-color", isDark);
  headerHeart.classList.toggle("white-color", isDark);
  favoriteCount.classList.toggle("white-color", isDark);

  if (isDark) {
    document.body.style.background = "rgb(60, 60, 60)";
    headerOverlay.classList.add("dark-panel");
    document.querySelector(".header h2").classList.add("white-color");
  } else {
    document.body.style.background = "#f4f4f4";
    headerOverlay.classList.remove("dark-panel");
    document.querySelector(".header h2").classList.remove("white-color");
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
