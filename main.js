let carts = document.querySelectorAll('.add-cart');

let products = [{
        name: "Wooden Block1",
        tag: "woodenblock1",
        price: 3500,
        inCart: 0

    },
    {
        name: "Wooden Block2",
        tag: "woodenblock2",
        price: 4500,
        inCart: 0

    },
    {
        name: "Wooden Block3",
        tag: "woodenblock3",
        price: 2500,
        inCart: 0

    }

];
// Adding products to the cart 

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }


}
// Getting Product numbers  

function cartNumbers(products) {
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;

    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(products);

}
// Adding products to localStorage

function setItems(products) {
    let cartItems = localStorage.getItem('productsInCart')

    cartItems = JSON.parse(cartItems);


    if (cartItems != null) {
        if (cartItems[products.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [products.tag]: products
            }
        }
        cartItems[products.tag].inCart += 1;
    } else {
        products.inCart = 1;

        cartItems = {
            [products.tag]: products
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

// Adding the cost of items in the cart the total Cost of Cart.
function totalCost(products) {

    // console.log("The products price is ", products.price)
    let cartCost = localStorage.getItem('totalCost');

    console.log("My cartCost is", cartCost);
    console.log(typeof cartCost);

    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + products.price);

    } else

    {
        localStorage.setItem("totalCost", products.price);
    }

}
// Display in Cart 
function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products2");
    let cartCost = localStorage.getItem('totalCost');

    console.log(cartItems);

    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="products2">
            <ion-icon name="close-circle-outline"></ion-icon>
            <img src="./images/${item.tag}.jpg">
            <span>${item.name}</span> 
            </div>

            
            <div class="price">R${item.price},00</div>

            <div class="quantity">
            <ion-icon class="decrease" 
            name="caret-back-outline"></ion-icon>
            <span>${item.inCart}</span>
            <ion-icon class="increase"
            name="caret-forward-outline"></ion-icon>
            </div>

            <div class="total">R${item.inCart * item.price},00
            </div>
            `;
        });
        productContainer.innerHTML +=
            `
        <div class="basketTotalContainer">
        
        <h4 class= "basketTotalTitle"> 
        Basket Total</h4>
        </div>

        <h4 class= "basketTotal"> 
         R${cartCost}</h4>
        </div>
        `;
    }

};
// Calculate promocode

let promocode;
let numberatt;
let pricing = ('totalCost');
let sum;
let finalprice;

$('#update').click(function() {
    promocode = $('#promocode').val();
    finalprice = numberatt * pricing;
    if ((promocode == 'PC321') || (promocode == 'PC123')) {
        finalprice = +(sum + "R") * 0.9;
    } else if (promocode.length < 1) {
        finalprice = +(sum + "R") * 1;
    } else {
        alert("Invalid Promo Code");
        finalprice = 0;
    }

});
// Calculate Shipping Button 
window.addEventListener('load', function() {
    let priceField = document.getElementById('price');

    let calculateButton = document.getElementById('calculate');
    let totalField = document.getElementById('total');

    calculateButton.addEventListener('click', function() {
        let price = parseInt(priceField.value);
        let shipping = calculateShipping(price);
        let total = price + shipping;

        totalField.value = "Your total is $" + total + ".";
    });

    function calculateShipping(price) {
        return (price <= 25) ? 1.5 : price / 10;
    }
});

$(document).ready(function() {
    $("button").click(function() {
        $("#p1").css("color", "red").slideDown(2000).slideUp(2000);
    });
});
onLoadCartNumbers();
displayCart();