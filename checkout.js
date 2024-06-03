let listCart = [];
//hvatanje podataka od kolacica
function checkCart(){
    var cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('listCart='));
    if(cookieValue){
        listCart = JSON.parse(cookieValue.split('=')[1]);

    }
}
checkCart();
addCartToHTML();
function addCartToHTML(){
    let listCartHTML = document.querySelector('.returnCart .list');
    listCartHTML.innerHTML = '';
    let totalQuantityHTML = document.querySelector('.totalQuantity');
    let totalPriceHTML = document.querySelector('.totalPrice');

    let totalQuantity = 0;
    let totalPrice = 0;

    if(listCart){
        listCart.forEach(product=>{
            if(product){
                let newP = document.createElement('div');
                newP.classList.add('item');
                newP.innerHTML = 
                `<div class="image">
                <img src="${product.image}" alt="Product Image">
              </div>
              <div class="info">
                <div class="name">${product.name}</div>
                <div class="price">${product.price}</div>
              </div>
              <div class="quantity">${product.quantity}</div>
              <div class="returnPrice">RSD${product.price * product.quantity}</div>`;
              listCartHTML.appendChild(newP);
              totalQuantity = totalQuantity + product.quantity;
              totalPrice = totalPrice + (product.price * product.quantity);
            }
        })
    }
    totalQuantityHTML.innerText = totalQuantity;
    totalPriceHTML.innerText = 'RSD' + totalPrice;
}

function clearCart() {
    listCart = [];
    document.cookie = 'listCart=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

document.querySelector('.buttonCheckout').addEventListener('click', function () {
    clearCart();
  
    addCartToHTML();

    alert('Поруџбина успешна!');

    window.location.href = 'index.html'; 
});
