

const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const logInForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');
const cardsRestaurants = document.querySelector('.cards-restaurants');
const containerPromo = document.querySelector('.container-promo');
const restaurants = document.querySelector('.restaurants');
const menu = document.querySelector('.menu');
const logo = document.querySelector('.logo');
const cardsMenu = document.querySelector('.cards-menu');
const restaurantTitle = document.querySelector('.restaurant-title');
const rating = document.querySelector('.rating');
const minPrice = document.querySelector('.price');
const category = document.querySelector('.category');
const inputSearch = document.querySelector('.input-search');


let login = localStorage.getItem('gloDelivery');

const cart = [];

const getData = async function (url) {

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Помилка по адресі ${url},
         статус помилки ${response.status}!`);
    }

    return await response.json();

};

const toggleModal = function () {
    modal.classList.toggle("is-open");
};

const toogleModalAuth = function () {
    modalAuth.classList.toggle('is-open');
};

function returnMain() {
    containerPromo.classList.remove('hide');
    restaurants.classList.remove('hide');
    menu.classList.add('hide');
}


function authorized() {

    function logOut() {
        login = null;
        localStorage.removeItem('gloDelivery');
        buttonAuth.style.display = '';
        userName.style.display = '';
        buttonOut.style.display = '';
        cartButton.style.display = '';
        buttonOut.removeEventListener('click', logOut);
        checkAuth();
        returnMain();
    }

    console.log('Авторизований');
    userName.textContent = login;
    buttonAuth.style.display = 'none';
    userName.style.display = 'inline';
    buttonOut.style.display = 'flex';
    cartButton.style.display = 'flex';
    buttonOut.addEventListener('click', logOut)

}

function notAuthorized() {
    console.log('Не авторизований');

    function logIn(event) {
        event.preventDefault();
        if (loginInput.value) {
            loginInput.style.borderColor = '';
            login = loginInput.value;
            localStorage.setItem('gloDelivery', login);
            toogleModalAuth();
            buttonAuth.removeEventListener('click', toogleModalAuth);
            closeAuth.removeEventListener('click', toogleModalAuth);
            logInForm.removeEventListener('submit', logIn);
            logInForm.reset();
            checkAuth();
        } else {
            loginInput.style.borderColor = 'red';
        }
    }
    buttonAuth.addEventListener('click', toogleModalAuth);
    closeAuth.addEventListener('click', toogleModalAuth);
    logInForm.addEventListener('submit', logIn);
}

function checkAuth() {
    if (login) {
        authorized();
    } else {
        notAuthorized();
    }
}

function createCardRestaurant({ image, kitchen, name,
    price, products, stars, time_of_delivery }) {

    const card = `
<a class="card card-restaurant"
  data-products="${products}"
  data-info="${[kitchen, name, price, stars]}">
                        <img src="${image}" alt="image" class="card-image" />
                        <div class="card-text">
                            <div class="card-heading">
                                <h3 class="card-title">${name}</h3>
                                <span class="card-tag tag">${time_of_delivery}</span>
                            </div>
                            <div class="card-info">
                                <div class="rating">
                                &#9733; ${stars}
                                </div>
                                <div class="price">Від ${price} грн</div>
                                <div class="category">${kitchen}</div>
                            </div>
                        </div>
                    </a>
`;
    cardsRestaurants.insertAdjacentHTML('beforeend', card);

}

function createCardGood({ description, image, name, price }) {

    const card = document.createElement('div');
    card.className = 'card';
    card.insertAdjacentHTML('beforeend', `
                <div class="card">
                        <img src="${image}" alt="image" class="card-image" />
                        <div class="card-text">
                            <div class="card-heading">
                                <h3 class="card-title card-title-reg">${name}</h3>
                            </div>

                            <div class="card-info">
                                <div class="ingredients">${description}</div>
                            </div>

                            <div class="card-buttons">
                                <button class="button button-primary button-add-cart">
                                    <span class="button-card-text">В кошик</span>
                                    <span class="button-cart-svg"></span>
                                </button>
                                <strong class="card-price-bold">${price}</strong>
                            </div>
                        </div>
                    </div>
    `);
    cardsMenu.insertAdjacentElement('beforeend', card);
}

function openGoods(event) {
    const target = event.target;
    if (login) {

        const restaurant = target.closest('.card-restaurant');
        if (restaurant) {

            const info = restaurant.dataset.info;
            const [name, stars, price, kitchen] = info.split('.');

            cardsMenu.textContent = '';
            containerPromo.classList.add('hide');
            restaurants.classList.add('hide');
            menu.classList.remove('hide');

            restaurantTitle.textContent = name;
            rating.textContent = stars;
            minPrice.textContent = `Від ${price} грн`;
            category.textContent = kitchen;

            getData(`./db/${restaurant.dataset.products}`).then(function (data) {
                data.forEach(createCardGood);
            });
        }
    } else {
        toogleModalAuth();

    }
}


function init() {
    getData('./db/partners.json').then(function (data) {
        data.forEach(createCardRestaurant)
    });

    cartButton.addEventListener("click", toggleModal);

    close.addEventListener("click", toggleModal);

    cardsRestaurants.addEventListener('click', openGoods);

    logo.addEventListener('click', returnMain);

    checkAuth();



    new Swiper('.swiper', {
        sliderPreView: 1,
        loop: true,
        autoplay: true,
        effect: 'coverflow'
    })

    inputSearch.addEventListener('keypress', function (event) {
        if (event.charCode === 13) {
            const value = event.target.value.trim();

            if (!value) {
                return;
            }


            getData('./db/partners.json')
                .then(function (data) {
                    return data.map(function (partner) {
                        return partner.products;
                    });
                })
                .then(function (linksProduct) {
                    cardsMenu.textContent = '';
                    linksProduct.forEach(function (link) {
                        getData(`./db/${link}`)
                            .then(function (data) {

                                const resultSearch = data.filter(function (item) {
                                    const name = item.name.toLowerCase();
                                    return name.includes(value.toLowerCase());
                                })

                                containerPromo.classList.add('hide');
                                restaurants.classList.add('hide');
                                menu.classList.remove('hide');

                                restaurantTitle.textContent = 'Результат пошуку';
                                rating.textContent = '';
                                minPrice.textContent = '';
                                category.textContent = 'Різна кухня';
                                resultSearch.forEach(createCardGood);
                            })
                    })
                })
        }
    })

}

init();