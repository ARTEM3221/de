'use strict';
import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.esm.browser.min.js'


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
const cardsRestaurants = document.querySelector('.rest-cards');
const containerPromo = document.querySelector('.promo');
const restaurants = document.querySelector('.restaurants');
const menu = document.querySelector('.menu-cards');
const logo = document.querySelector('.logo');
const menuCards = document.querySelector('.menu-cards');

let login = localStorage.getItem('gloDelivery');

const getData = async function (url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Pomulka po adresi ${url}, 
        statys pomulku ${response.status}`);
    }
    return await response.json();
};



function toggleModelAuth() {
    modelAuth.classList.toggle("is-open-auth");
    if (modelAuth.classList.contains("is-open-auth")) {
        enableScroll();
    } else {
        disableScroll();
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
        if (event.target.classList.contains("model-auth")) {
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

function createCardRestaurant(restaurant) {

    const {
        image,
        kitchen,
        name,
        price,
        stars,
        products,
        time_of_delivery
    } = restaurant;

    const card =
        `<div class="card">
    <a><img src="${image}" alt="" class="card-image"></a>
    <div class="card-text">
        <div class="card-head">
            <h3 class="card-title">Піца плюс</h3>
            <span class="card-tag">50 хв</span>
        </div>
        <div class="card-info">
            <div class="raiting">&#9733; 4.5</div>
            <div class="price">від 100 грн</div>
            <div class="category">Піца</div>
        </div>
    </div>
</div>
`;
    cardsRestaurants.insertAdjacentHTML('beforeend', card);
}

createCardRestaurant();
createCardRestaurant();
createCardRestaurant();

function createCardGood() {
    const card = document.createElement('div');
    card.className = 'card';
    card.insertAdjacentHTML('beforeend', `
    <div class="anim animate__animated animate__pulse">
                    <img src="images/menu1.jpg" alt="" class="card-image">
                    <div class="card-text card-text-menu">
                        <div class=" card-head card-head-menu">
                            <h3 class="card-title card-title-menu">Рол вугор стандарт</h3>
                            <span class="card-info card-info-menu">Рис, вугор, соус унаги, кунжут, водорості
                                норі.</span>
                        </div>
                        <div class="card-buy">
                            <button class="button button-menu">
                                <img src="images/basket-button.svg" class="button-icon button-icon-menu"
                                    alt="basket-button">
                                <span class="button-text button-text-menu">В кошик</span>
                            </button>
                            <div class="price price-menu">125 грн</div>
                        </div>
                    </div>
                </div>
    `);
    menuCards.insertAdjacentElement('beforeend', card);
}

function openGoods(event) {
    const target = event.target;

    if (login) {
        const restaurant = target.closest('.rest-cards');
        if (restaurant) {
            containerPromo.classList.add('hide');
            restaurants.classList.add('hide');
            menu.classList.remove('hide');
            createCardGood();
            createCardGood();
            createCardGood();
        }
    } else {
        toggleModelAuth();
    }
}


getData('./db/partners.json').then(function (data) {
    data.forEach(createCardRestaurant)
});

cardsRestaurants.addEventListener('click', openGoods);

logo.addEventListener('click', function () {
    containerPromo.classList.remove('hide')
    restaurants.classList.remove('hide')
    menu.classList.add('hide')
});

new Swiper('.swiper', {
    sliderPreView: 1,
    loop: true,
    autoplay: true
});