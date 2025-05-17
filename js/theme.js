const switchBtn = document.querySelector(".theme-switch .dot");
const switchBtnIcon = document.querySelector(".theme-switch .dot i");

// Apply the stored theme on load
applyStoredTheme();

switchBtn.addEventListener("click", () => {
  const isDark = switchBtnIcon.classList.contains("fa-moon");

  if (isDark) {
    setTheme("dark");
  } else {
    setTheme("light");
  }
});

function setTheme(theme) {
  if (theme === "dark") {
    document.body.style.background = "black";
    document.querySelectorAll(".book").forEach((book) => {
      book.style.background = "#323232";
      book.style.color = "white";
    });
    switchBtn.classList.add("move");
    switchBtnIcon.classList.remove("fa-moon");
    switchBtnIcon.classList.add("fa-sun");
  } else {
    document.body.style.background = "#ccc";
    document.querySelectorAll(".book").forEach((book) => {
      book.style.background = "#f9f9f9";
      book.style.color = "#333";
    });
    switchBtn.classList.remove("move");
    switchBtnIcon.classList.remove("fa-sun");
    switchBtnIcon.classList.add("fa-moon");
  }

  localStorage.setItem("theme", theme);
}

function applyStoredTheme() {
  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);
}
