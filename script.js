let foods = [
    {
        'name': 'Ziti alla genovese',
        'description': 'Dieses Gericht ist mehr als nur eine einfache Pasta – es spiegelt die italienische Kultur und die Liebe zu frischen und hochwertigen Zutaten wider. Die Kombination aus Ziti, einer Art hohler, röhrenförmiger Nudeln, und der reichhaltigen, würzigen Sauce aus zart geschmortem Rindfleisch und Zwiebeln ist einfach köstlich.',
        'englishDescription': 'This dish is more than just a simple pasta - it reflects Italian culture and the love for fresh and quality ingredients. The combination of ziti, a type of hollow, tube-shaped noodle, and the rich, flavorful sauce made from tender braised beef and onions is simply delicious.',
        'img': './img/Ziti-alla-genovese.webp',
        'price': 7.59,
        'isInBasket': false,
        'number': 0,
        'id': 0
    },
    {
        'name': 'Spaghetti Carbonara',
        'description': 'Dieser Klassiker ist ein einfaches Pastagericht mit fünf ganz einfachen Zutaten. Nämlich Guanciale, Pecorino, Ei & Pfeffer, basta! Es stammt aus der italienischen Region Latium und gehört heute zu den Klassikern der italienischen Küche. Das Original verzichtet komplett auf die Zugabe von frischer Sahne. Stattdessen wird etwas Nudelwasser hinzugefügt. Dadurch erreichen wir eine schöne Cremigkeit und sparen uns zugleich unnütze Kalorien.',
        'englishDescription': 'This classic is a simple pasta dish with five very simple ingredients. Namely guanciale, pecorino, egg & pepper, thats it! It comes from the Italian region of Lazio and is now one of the classics of Italian cuisine. The original completely dispenses with the addition of fresh cream. Instead, some pasta water is added. This way we achieve a nice creaminess and at the same time save ourselves unnecessary calories.',
        'img': './img/Spaghetti-carbonara.webp',
        'price': 8.99,
        'isInBasket': false,
        'number': 0,
        'id': 1
    },
    {
        'name': 'Lachslasagne mit Spinat',
        'description': 'Himmlisch lecker!',
        'englishDescription': 'Heavenly delicious!',
        'img': './img/Lachslasagne-mit-Spinat.webp',
        'price': 8.99,
        'isInBasket': false,
        'number': 0,
        'id': 2
    },
    {
        'name': 'Spaghetti Cacio e Pepe',
        'description': 'Diese Pasta, die nur aus wenigen Zutaten besteht, beeindruckt durch ihren intensiven Geschmack. "Cacio" steht für Pecorino-Käse, "Pepe" für Pfeffer – eine unschlagbare Kombination, die wahre Gaumenfreude verspricht. Die Zubereitung dieser Köstlichkeit erfordert Fingerspitzengefühl und Liebe zur Tradition.',
        'englishDescription': 'This pasta, which consists of only a few ingredients, impresses with its intense taste. "Cacio" stands for Pecorino cheese, "Pepe" for pepper - an unbeatable combination that promises true culinary delight. Preparing this delicacy requires sensitivity and a love of tradition.',
        'img': './img/Spaghetti-cacio-e-pepe-isc.webp',
        'price': 10.99,
        'isInBasket': false,
        'number': 0,
        'id': 3
    },
    {
        'name': 'Pasta e patate alla Napoletana',
        'description': 'Diese Pasta ist ein herzhaftes, wärmendes Gericht, das sich in vielen italienischen Haushalten großer Beliebtheit erfreut. Diese vereint die einfachen, aber köstlichen Zutaten von Pasta, Kartoffeln, Karotten, Sellerie und Pancetta, durchzogen mit Aromen von Gewürzen und Parmesan.',
        'englishDescription': 'This pasta is a hearty, warming dish that is popular in many Italian households. This combines the simple but delicious ingredients of pasta, potatoes, carrots, celery and pancetta, infused with flavors of spices and parmesan.',
        'img': './img/Pasta-e-patate.webp',
        'price': 11.99,
        'isInBasket': false,
        'number': 0,
        'id': 4
    }
]


function init() {
    includeHTML();
    getLocalStorage();
    renderDish(foods);
    showGermanDescription();
    showInBasket();
    updateShopingBasket();
}

function initDatenschutz() {
    includeHTML();
    setTimeout(removeHeaderIcons, 500);
}


function initImpressum() {
    includeHTML();
    setTimeout(removeHeaderIcons, 500);
}


function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            /* Make an HTTP request using the attribute value as the file name: */
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) { elmnt.innerHTML = this.responseText; }
                    if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
                    /* Remove the attribute, and call this function once more: */
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /* Exit the function: */
            return;
        }
    }
}


function renderDish(foodsArr) {
    let dishSection = document.getElementById('dish-section');
    dishSection.innerHTML = '';
    for (let i = 0; i < foodsArr.length; i++) {
        const food = foodsArr[i];
        dishSection.innerHTML += generateDishHTML(i, food);
        addNumber(i, food);
    }
}


function generateDishHTML(i, food) {
    return /*html*/`
            <div class="dish-container">
        <div class="dish-left-part">
            <h4 class="dish-headline">${food.name}</h4>
            <p id="food-description-german${i}" class="dish-description d-none">${food.description}</p>
            <p id="food-description-english${i}" class="dish-description d-none">${food.englishDescription}</p>
            <p class="dish-dressing"></p>
            <div class="dish-price"><b>${food.price} €</b></div>
        </div>
        <div class="dish-right-part">

            <img class="dish-img" src="${food.img}" alt="">
        </div>
        <button class="plus-icon-button" id="plus-button${i}" onclick="pushInBasket(${i})"></button>
    </div>
    `
}


function saveFoodsLocal() {
    let foodsAsText = JSON.stringify(foods);
    localStorage.setItem('foods', foodsAsText);
}


function getLocalStorage() {
    let foodsAsText = localStorage.getItem('foods');
    if (foodsAsText !== null) {
        foods = JSON.parse(foodsAsText);
    }
}


function addNumber(i, food) {
    let plusButton = document.getElementById(`plus-button${i}`);
    if (food.isInBasket) {
        plusButton.innerHTML = food.number;
    } else {
        plusButton.innerHTML = '+';
    }
}


function pushInBasket(i) {
    let food = foods[i];
    food.isInBasket = true;
    food.number++;
    addNumber(i, food);
    saveFoodsLocal();
    updateShopingBasket();
    showInBasket(i);
}


function showInBasket() {
    let placeholder = document.getElementById('placeholder-basket');
    let foodInBasket = foods.filter(food => food.isInBasket);
    let basketDish = document.getElementById('basket-dishes');
    if (foodInBasket.length !== 0) {
        placeholder.classList.add('d-none');
        basketDish.innerHTML = '';
        for (let f = 0; f < foodInBasket.length; f++) {
            const food = foodInBasket[f];
            basketDish.innerHTML += generateBasketHTML(food.id, food);
        }
    } else {
        basketDish.innerHTML = '';
        placeholder.classList.remove('d-none');
    }
}


function generateBasketHTML(id, food) {
    return /*html*/`
        <div class="basket-dish">
            <span><b>${foods[id].number}x</b></span>
            <span>${foods[id].name}</span>
            <div class="basket-dish-buttons">
                <div onclick="minus(${id})" id="minus${id}" class="minusplus"><img src="./img/minus.png" alt=""></div>
                <div onclick="plus(${id})" id="plus${id}" class="minusplus"><img src="./img/plus.png" alt=""></div>
                <div onclick="dishDelete(${id})" id="delete${id}" class="minusplus"><img src="./img/trash.png" alt=""></div>
            </div>
            <span>${foods[id].price} €</span>
        </div>
    `
}


function plus(i) {
    let food = foods[i];
    food.number++;
    addNumber(i, food);
    updateShopingBasket();
    showInBasket(i);
    saveFoodsLocal();
}


function minus(i) {
    let food = foods[i];
    numberMinusOne(i, food);
    showInBasket();
    updateShopingBasket();
    saveFoodsLocal();
}


function dishDelete(id) {
    let food = foods[id];
    food.number = 0;
    food.isInBasket = false;
    showInBasket();
    saveFoodsLocal();
    addNumber(id, food);
    updateShopingBasket();
}


function numberMinusOne(i, food) {
    let plusButton = document.getElementById(`plus-button${i}`);
    food.number--;
    if (food.number > 0) {
        plusButton.innerHTML = food.number;
    } else {
        food.isInBasket = false;
        plusButton.innerHTML = '+';
    }
}


function updateShopingBasket() {
    let sum = 0;
    for (s = 0; s < foods.length; s++) {
        let food = foods[s];
        sum += food.price * food.number;
    }
    let priceSum = document.getElementById('price-sum');
    let finalSum = document.getElementById('final-sum');
    let sumFixed = sum.toFixed(2);
    let finalSumFixed = (sum + 3).toFixed(2);
    priceSum.innerHTML = `${sumFixed} €`;
    finalSum.innerHTML = `${finalSumFixed} €`;
    placeholderMinOrder(sum);
}


function placeholderMinOrder(sum) {
    let placeholder = document.getElementById('mindestbestellwert-placeholder');
    let readyToOrderText = document.getElementById('readyToOrderText');
    let placeholderToMuch = document.getElementById('placeholderToMuch');
    if (sum > 10) {
        sumBiggerTen(placeholderToMuch, placeholder, readyToOrderText);
    } else {
        sumToLittle(placeholderToMuch, placeholder, readyToOrderText);
    }
    if (sum > 100) {
        sumToBig(readyToOrderText, placeholderToMuch);
    }
}


function sumBiggerTen(placeholderToMuch, placeholder, readyToOrderText) {
    placeholderToMuch.classList.add('d-none');
    placeholder.classList.add('d-none');
    readyToOrderText.classList.remove('d-none');
}


function sumToLittle(placeholderToMuch, placeholder, readyToOrderText) {
    placeholderToMuch.classList.add('d-none');
    placeholder.classList.remove('d-none');
    readyToOrderText.classList.add('d-none');
}


function sumToBig(readyToOrderText, placeholderToMuch) {
    readyToOrderText.classList.add('d-none');
    placeholderToMuch.classList.remove('d-none');
}


function sendOrder() {
    let placeholder = document.getElementById('mindestbestellwert-placeholder');
    let placeholderToMuch = document.getElementById('placeholderToMuch');
    let minPrice = placeholder.classList.contains('d-none');
    let maxPrice = placeholderToMuch.classList.contains('d-none');
    sendPlaceholder(placeholder, minPrice, maxPrice);
}


function sendPlaceholder(placeholder, minPrice, maxPrice) {
    if (minPrice && maxPrice) {
        for (let i = 0; i < foods.length; i++) {
            dishDelete(i)
        }
        if (placeholder.classList.contains('red')) {
            placeholder.classList.remove('red');
        }
        orderCompledet();
    } else {
        placeholder.classList.add('red');
    }
}


function orderCompledet() {
    let text = document.getElementById('orderCopledet');
    let german = document.getElementById('german');
    if (german.classList.contains('d-none')) {
        let orderCopledet = document.getElementById('orderCopledet');
        orderCopledet.innerHTML = 'Order Copledet';
    }
    text.classList.remove('d-none');
    setTimeout(removeCompledet, 2000);
}


function removeCompledet() {
    let text = document.getElementById('orderCopledet');
    text.classList.add('d-none');
}


function showBasketResponsive() {
    let mainSectionContent = document.getElementById('main-section-content');
    let basket = document.getElementById('shopping-basket-content');
    let window = document.getElementById('main-container-window');
    if (basket.classList.contains('shopping-basket')) {
        showResponsiveBasket(mainSectionContent, basket, window);
    } else {
        hideResponsiveBasket(mainSectionContent, basket, window);
    }
}


function showResponsiveBasket(mainSectionContent, basket, window) {
    mainSectionContent.classList.add('d-none');
    basket.classList.remove('shopping-basket');
    basket.classList.add('responsive-shopping-basket');
    window.classList.add('responsive-window');
}


function hideResponsiveBasket(mainSectionContent, basket, window) {
    mainSectionContent.classList.remove('d-none');
    basket.classList.add('shopping-basket');
    basket.classList.remove('responsive-shopping-basket');
    window.classList.remove('responsive-window');
}


function changeEnglish() {
    changePlaceholder();
    changeTable();
    changeLanguageIcon();
    showEnglishDescription();
}


function changePlaceholder() {
    let shoppingBag = document.getElementById('shopping-Bag-german');
    let minOrder = document.getElementById('mindestbestellwert-placeholder');
    let orderButton = document.getElementById('order-button');
    shoppingBag.innerHTML = 'Choose delicious dishes from the menu and order your menu';
    minOrder.innerHTML = 'You have your minimum order value of €10.00 reached and can now continue.';
    orderButton.innerHTML = 'Order';
    changeTextPlaceholder();
}


function changeTextPlaceholder() {
    let placeholderToMuch = document.getElementById('placeholderToMuch');
    let readyToOrderText = document.getElementById('readyToOrderText');
    readyToOrderText.innerHTML = 'You have reached your minimum order value of €10.00 and can now continue.';
    placeholderToMuch.innerHTML = 'Maximum order value €100.00 excluding delivery costs';
}


function changeTable() {
    let subtitel = document.getElementById('subtotal');
    let deliveryCosts = document.getElementById('delivery-cost');
    let total = document.getElementById('total');
    let shoppingBasket = document.getElementById('shopping-basket');
    shoppingBasket.innerHTML = 'Shopping Basket'
    subtitel.innerHTML = 'Subtitel:'
    deliveryCosts.innerHTML = 'Delivery Costs:'
    total.innerHTML = 'Total:'
}


function showEnglishDescription() {
    for (i = 0; i < foods.length; i++) {
        let englishDescription = document.getElementById(`food-description-english${i}`)
        let germanDescription = document.getElementById(`food-description-german${i}`)
        englishDescription.classList.remove('d-none');
        germanDescription.classList.add('d-none');
    }
    let reviews = document.getElementById('reviews');
    reviews.innerHTML = '(363 Reviews)'
}


function showGermanDescription() {
    for (i = 0; i < foods.length; i++) {
        let englishDescription = document.getElementById(`food-description-english${i}`)
        let germanDescription = document.getElementById(`food-description-german${i}`)
        englishDescription.classList.add('d-none');
        germanDescription.classList.remove('d-none');
    }
}


function changeLanguageIcon() {
    let english = document.getElementById('english');
    let german = document.getElementById('german');

    english.classList.remove('d-none');
    german.classList.add('d-none');
}


function removeHeaderIcons() {
    let headerIcons = document.getElementById('header-Icons');
    headerIcons.classList.add('d-none');
}