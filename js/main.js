const cartButton = document.querySelector("#cart-button");
const model = document.querySelector(".model");
const close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModel);
close.addEventListener("click", toggleModel);

function toggleModel() {
    model.classList.toggle("is-open");
}