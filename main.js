import Counter from "./counter.js";

const counter = new Counter();

const productCountCart = document.querySelector(".cart-product-count");
const plusIcon = document.querySelector(".plus-icon");
const minusIcon = document.querySelector(".minus-icon");
const productCount = document.querySelector(".count-article");
const btnAdd = document.querySelector(".btn-add");
const productPriceCart = document.querySelector(".cart-product-price");
const productPrice = document.querySelector(".product-price");
const productSumCart = document.querySelector(".cart-product-sum");

const getPrice = () => {
  return productPrice.textContent.substring(1);
};

plusIcon.addEventListener("click", () => {
  productCount.textContent = counter.addCount();
});

minusIcon.addEventListener("click", () => {
  productCount.textContent = counter.subtractCount();
});

btnAdd.addEventListener("click", () => {
  productPriceCart.textContent = productPrice.textContent;
  productCountCart.textContent = " x " + counter.countToDisplay() + " ";
  productSumCart.textContent = "$" + counter.sumToDisplay(getPrice()) + ".00";
});
