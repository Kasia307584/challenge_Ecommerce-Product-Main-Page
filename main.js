import Counter from "./counter.js";
import { getPrice } from "./helpers.js";

const counter = new Counter(0);

const plusIcon = document.querySelector(".plus-icon");
const minusIcon = document.querySelector(".minus-icon");
const productCount = document.querySelector(".count-article");
const btnAdd = document.querySelector(".btn-add");
const productPrice = document.querySelector(".product-price");
const cart = document.querySelector(".cart-content");
const articlesInBasket = document.querySelector(".basket-icon");
const basketIcon = document.querySelector(".basket-icon > img");
// const productPriceCart = document.querySelector(".cart-product-price");
// const productCountCart = document.querySelector(".cart-product-count");
// const productSumCart = document.querySelector(".cart-product-sum");

plusIcon.addEventListener("click", () => {
  productCount.textContent = counter.addCount();
});

minusIcon.addEventListener("click", () => {
  productCount.textContent = counter.subtractCount();
});

let countValue = "";

btnAdd.addEventListener("click", () => {
  countValue = productCount.textContent;
  if (countValue > 0) {
    articlesInBasket.classList.add("bullet-icon");
    articlesInBasket.setAttribute("value", countValue);
  } else {
    articlesInBasket.classList.remove("bullet-icon");
  }
});

basketIcon.addEventListener("click", () => {
  cart.classList.toggle("cart-content--hidden");

  if (!articlesInBasket.classList.contains("bullet-icon")) {
    cart.innerHTML = `<h3>Cart</h3><hr class="for-empty-cart"><div class="cart-message">Your cart is empty.</div>`;
  } else {
    cart.innerHTML = `<h3>Cart</h3>
        <hr /><div class="cart-info-wrapper">
      <img
        class="cart-photo"
        src="images/image-product-1-thumbnail.jpg"
        alt="Product image"
      />
      <span class="cart-product-name">Fall Limited Edition Sneakers</span>
      <span class="cart-product-price">${productPrice.textContent}</span
      ><span class="cart-product-count"> x${countValue} </span
      ><span class="cart-product-sum">$${counter.sumToDisplay(
        getPrice(productPrice)
      )}.00</span>
      <i class="fa-solid fa-trash-can"></i>
    </div>
    <div class="button-box">
      <button class="btn btn-checkout" type="button">Checkout</button>
    </div>`;
  }
});

// const deleter = document.querySelector(".fa-solid");

// deleter.addEventListener("click", () => {
//   cart.innerHTML = `<h3>Cart</h3><hr class="for-empty-cart"><div class="cart-message">Your cart is empty.</div>`;
// });
