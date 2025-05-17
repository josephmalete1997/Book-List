import { elements } from "./ui_elements.js";
const { bookDetails, overlay } = elements;

overlay.addEventListener("click", () => {
  closePopUps();
});



function closePopUps() {
  bookDetails.classList.toggle("show");
  overlay.classList.toggle("show");
}

export { closePopUps };
