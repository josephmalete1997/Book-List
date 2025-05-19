import { elements } from "./ui_elements.js";
const {
  favoritesPanel,
  headerOverlay,
  sideNav,
  headerHeart,
  favoriteCount,
  headerH2,
  switchBtn
} = elements;


const switchBtnIcon = switchBtn.querySelector("i");
applyStoredTheme();

switchBtn.addEventListener("click", () => {
  const currentTheme = switchBtnIcon.classList.contains("fa-moon")
    ? "dark"
    : "light";
  setTheme(currentTheme);
});

function changeToWhiteText(arr, theme) {
  for (let i = 0; i < arr.length; i++)
    arr[i].classList.toggle("white-color", theme);
}

function changeToDark(arr, theme) {
  for (let i = 0; i < arr.length; i++)
    arr[i].classList.toggle("dark-panel", theme);
}

function setTheme(theme) {
  const isDark = theme === "dark";
  document.querySelectorAll(".book-title").forEach((text) => {
    text.classList.toggle("white-color", isDark);
  });

  document.querySelectorAll(".book-card").forEach((text) => {
    text.classList.toggle("dark-panel", isDark);
  });

  changeToWhiteText([sideNav, headerHeart, favoriteCount,headerH2], isDark);
  changeToDark([favoritesPanel,headerOverlay], isDark);

  if (isDark) {
    document.body.style.background = "rgb(60, 60, 60)";
  } else {
    document.body.style.background = "#f4f4f4";
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
