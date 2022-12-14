const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

cartButton.addEventListener('click', toggleModal);
close.addEventListener('click', toggleModal);

function toggleModal() {
    modal.classList.toggle("is-open");
}

const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const logInForm = document.querySelector('#logInform');
const loginInput = document.querySelector('#login');


let login = localStorage.getItem('gloDelivery');

function toggleModalAuth() {
    modalAuth.classList.toggle("is-open");
}

buttonAuth.addEventListener('click', toggleModalAuth);
closeAuth.addEventListener('click', toggleModalAuth);



function authorized() {
    console.log('Avtorizovan');

}

function notAuthorized() {
    console.log('Ne avtorizovan');

    function logIn(event) {
        event.preventDefault();
        login = loginInput.value;
        toggleModalAuth();
        checkAuth();
    }
    //
    logInForm.addEventListener('submit', logIn)
}
function checkAuth() {
    if (login) {
        authorized();
    } else {
        notAuthorized();
    }
}