const closeBtn = document.querySelector(".fa-times");

function closePopUps(...elem) {
  elem.forEach((item) => {
    item.addEventListener("click", () => {
      bookDetails.classList.toggle("show");
      overlay.classList.toggle("show");
    });
  });
}

closePopUps(closeBtn, overlay);
