import { elements } from "./ui_elements.js";
const { bookDetails, overlay, openFavoritesPanel, favoritesPanel ,closeFavoritesPanel} = elements;

closeFavoritesPanel.addEventListener("click", () => {
  favoritesPanel.classList.toggle("open-panel");
  overlay.classList.toggle("show");
})

openFavoritesPanel.addEventListener("click", () => {
  favoritesPanel.classList.toggle("open-panel");
  overlay.classList.toggle("show");
});

overlay.addEventListener("click", () => {
  closePopUps();
  bookDetails.classList.remove("show");
  overlay.classList.remove("show");
  favoritesPanel.classList.remove("open-panel");
});

function closePopUps() {
  bookDetails.classList.toggle("show");
  overlay.classList.toggle("show");
}

export { closePopUps };
