const cartButton = document.querySelector("#cart-button");
const model = document.querySelector(".model");
const close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModel);
close.addEventListener("click", toggleModel);

function toggleModel() {
    model.classList.toggle("is-open");
}

const buttonAuth = document.querySelector('.button-auth');
const modelAuth = document.querySelector('.model-auth');
const closeAuth = document.querySelector('.close-auth');
const logInForm = document.querySelector('#loginform');
const loginInput = document.querySelector('#login');
const userName = document.querySelector('.username');
const buttonOut = document.querySelector('.button-out');
let login = localStorage.getItem('gloDelivery');
function toggleModelAuth() {
    modelAuth.classList.toggle("is-open");
    if (modelAuth.classList.contains("model-auth")) {
        disableScroll();
    } else {
        enableScroll();
    }
}



function clearForm() {
    loginInput.style.borderColor = '';
    logInForm.reset();
}



function authorized() {

    function logOut() {
        login = null;
        localStorage.removeItem('gloDelivery');
        buttonAuth.style.display = '';
        userName.style.display = '';
        userName.style.fontWeight = '';
        userName.style.fontSize = '';
        buttonOut.style.display = '';
        buttonOut.removeEventListener('click', logOut);
        checkAuth();
    }

    console.log('Авторизований');
    userName.textContent = login;
    buttonAuth.style.display = 'none';
    userName.style.display = 'inline';
    userName.style.fontWeight = 'bold';
    userName.style.fontSize = '20px';
    buttonOut.style.display = 'block';
    buttonOut.addEventListener('click', logOut);

}

function notAuthorized() {
    console.log('Не авторизований');
    function logIn(event) {
        event.preventDefault();
        if (loginInput.value.trim()) {
            login = loginInput.value;
            localStorage.setItem('gloDelivery', login);
            toggleModelAuth();
            buttonAuth.removeEventListener('click', toggleModelAuth);
            closeAuth.removeEventListener('click', toggleModelAuth);
            logInForm.removeEventListener('submit', logIn);
            logInForm.reset();
            checkAuth();
        } else {
            loginInput.style.borderColor = '#ff0000';
            loginInput.value = '';
        }
    }

    buttonAuth.addEventListener('click', toggleModelAuth);
    closeAuth.addEventListener('click', toggleModelAuth);
    logInForm.addEventListener('submit', logIn);
    modelAuth.addEventListener('click', function (event) {
        if (event.target.classList.contains('model-auth')) {
            toggleModelAuth();
        }
    })
}

function checkAuth() {
    if (login) {
        authorized();
    } else {
        notAuthorized();
    }
}

checkAuth();