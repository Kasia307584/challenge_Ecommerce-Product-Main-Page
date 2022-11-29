import Counter from "./counter.js";
import Cart from "./cart.js";
import Gallery from "./gallery.js";
import Lightbox from "./lightbox.js";

const plusIcon = document.querySelector(".plus-icon");
const minusIcon = document.querySelector(".minus-icon");
const productCount = document.querySelector(".count-article");
const btnAdd = document.querySelector(".btn-add");
const cart = document.querySelector(".cart-content");
const basketIcon = document.querySelector(".basket-icon > img");

const counter = new Counter(0);
const cartInstance = new Cart(counter, cart);
const gallery = new Gallery();

plusIcon.addEventListener("click", () => {
  productCount.textContent = counter.addCount();
});

minusIcon.addEventListener("click", () => {
  productCount.textContent = counter.subtractCount();
});

btnAdd.addEventListener("click", () => {
  cartInstance.updateBasketBullet();
  cartInstance.updateCart();
  cartInstance.registerBinEvent();
});

basketIcon.addEventListener("click", () => {
  cartInstance.toggleCart();
  cartInstance.showCart();
  cartInstance.registerBinEvent();
});
