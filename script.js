var nav = document.querySelector('nav');

window.addEventListener('scroll',function(){
    if(this.window.pageYOffset>100){
        nav.classList.add('bg-dark', 'shadow');
    }else{
        nav.classList.remove('bg-dark', 'shadow');
    }
}
)
let iconCart = document.querySelector('.iconCart');
let cart = document.querySelector('.cart');
let container = document.querySelector('.container');
let close = document.querySelector('.close');

iconCart.addEventListener('click', () => {
    if (cart.style.right == '-100%') {
        cart.style.right = '0';
        movable.style.transform = 'translateX(-400px)';
    } else {
        cart.style.right = '-100%';
        movable.style.transform = 'translateX(0)';
    }
});

close.addEventListener('click', () => {
    cart.style.right = '-100%';
    movable.style.transform = 'translateX(0)';
});

// Your JSON data
const productsData = [
        {
            "id": 1,
            "name": "Сухомеснато",
            "price": 750,
            "image": "img/suhomesnato.jpg"
        },
        {
            "id": 2,
            "name": "Млади сир",
            "price": 600,
            "image": "img/sir.jpg"
        },
        {
            "id": 3,
            "name": "Ракија",
            "price": 900,
            "image": "img/rakija.jpg"
        },
        {
            "id": 4,
            "name": "Ликер",
            "price": 650,
            "image": "img/liker.jpg"
        }
        ,
        {
            "id": 5,
            "name": "Ајвар",
            "price": 500,
            "image": "img/ajvar.jpg"
        }
        ,
        {
            "id": 6,
            "name": "Џем",
            "price": 500,
            "image": "img/dzem.jpg"
        }
    
    
    
];

// Assign the JSON data to the 'products' variable
let products = productsData;

// Call the function to add data to HTML
addDataToHTML();

function addDataToHTML() {
    let listProductHTML = document.querySelector('.listProduct');
    listProductHTML.innerHTML = '';

    if (products != null) {
        products.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.innerHTML =
                `<img src="${product.image}">
                <h2>${product.name}</h2>
                <div class="price">
                ${product.price} RSD
                </div>
                <button onClick="addCart(${product.id})">Додај у корпу</button>`;
            listProductHTML.appendChild(newProduct);
        });
    }
}


let listCart = [];
function checkCart(){
    var cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('listCart='));
    if(cookieValue){
        listCart = JSON.parse(cookieValue.split('=')[1]);
    }
}
checkCart();
function addCart($idProduct){
    let productCopy = JSON.parse(JSON.stringify(products));
    //ako nije u korpi
    if(!listCart[$idProduct]){
        let dataProduct = productCopy.filter(
            product => product.id == $idProduct
        )[0];
        //dodavanje proizvoda u korpu
        listCart[$idProduct]=dataProduct;
        listCart[$idProduct].quantity = 1;
    }else{
        //ako je vec u korpi +1
        listCart[$idProduct].quantity++;
    }
    //cuvanje korpe u kolacicima
    let timeSave = "expires=Thu,31 Dec 2025 23:59:59 UTC";
    document.cookie = "listCart="+JSON.stringify(listCart)+";"+timeSave+"; path=/;";
    addCartToHTML();
}
addCartToHTML();
function addCartToHTML(){
    let listCartHTML = document.querySelector('.listCart');
    listCartHTML.innerHTML = '';

    let totalHTML = document.querySelector('.totalQuantity');
    let totalQuantity = 0;

    if(listCart){
        listCart.forEach(product=>{
            if(product){
                let newCart = document.createElement('div');
                newCart.classList.add('item');
                newCart.innerHTML = 
                ` <img src="${product.image}">
                <div class="content">
                  <div class="name">${product.name}</div>
                  <div class="price">${product.price}</div>
                </div>
                <div class="quantity">
                  <button onclick ="changeQuantity(${product.id},'-')">-</button>
                  <span class="value">${product.quantity}</span>
                  <button onclick ="changeQuantity(${product.id},'+')">+</button>
                </div>`;
                listCartHTML.appendChild(newCart);
                totalQuantity = totalQuantity + product.quantity;
            }
        })
    }
    totalHTML.innerText = totalQuantity;
}
function changeQuantity($idProduct,$type){
    switch($type){
        case '+':
            listCart[$idProduct].quantity++;
            break;
        case '-':
            listCart[$idProduct].quantity--;
            if(listCart[$idProduct].quantity<=0){
                delete listCart [$idProduct];
            }
            break;

        default:
            break;
    }
    //cuvanje novih podataka u kolacicima
    let timeSave = "expires=Thu,31 Dec 2025 23:59:59 UTC";
    document.cookie = "listCart="+JSON.stringify(listCart)+";"+timeSave+"; path=/;";
    
    //ponovno ucitavanje liste
    addCartToHTML();
}
function submitForm(event) {
    event.preventDefault();
    
    var date = $("#date").val();
      var time = $("#time").val();

      alert('Успешно заказивање! Ваш термин је ' + date + ' , ' + time);
    window.location.href = "index.html"; // Redirects to index.html
}