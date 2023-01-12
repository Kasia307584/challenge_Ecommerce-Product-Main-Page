import { getPrice } from "./helpers.js";

export default class Cart {
  constructor(counterObj, parentElem) {
    this.counterObj = counterObj; // instance of the Counter class
    this.parentElem = parentElem; // cart elem

    this.productName = document.querySelector(".product-name");
    this.productPrice = document.querySelector(".product-price");
    this.articlesInBasket = document.querySelector(".basket-icon");
  }

  getEmptyCartHtml() {
    return `<div class="cart-header"><h3>Cart</h3>
    <hr class="for-empty-cart"></div><div class="cart-message">Your cart is empty.</div>`;
  }

  getCartHtml() {
    return `<div class="cart-header"><h3>Cart</h3>
    <hr /> </div>
      <div class="cart-info-wrapper"><img
      class="cart-photo"
      src="images/image-product-1-thumbnail.jpg"
      alt="Product image"
    />
    <span class="cart-product-name">${this.productName.textContent}</span>
    <span class="cart-product-price">$${getPrice(this.productPrice)}</span
    ><span class="cart-product-count"> x${this.counterObj.currentValue} </span
    ><span class="cart-product-sum">$${this.counterObj.sumToDisplay(
      getPrice(this.productPrice)
    )}</span>
    <i class="fa-solid fa-trash-can"></i></div>
    <div class="button-box"><button class="btn btn-checkout" type="button">Checkout</button></div>`;
  }

  // toggle cart display
  toggleCart() {
    this.parentElem.classList.toggle("cart-content--hidden");
  }

  // display cart content
  showCart() {
    if (!this.articlesInBasket.classList.contains("bullet-icon")) {
      this.parentElem.innerHTML = this.getEmptyCartHtml();
    } else {
      this.parentElem.innerHTML = this.getCartHtml();
    }
  }

  // toggle basket bullet and update its content (value)
  updateBasketBullet() {
    if (this.counterObj.currentValue > 0) {
      this.articlesInBasket.classList.add("bullet-icon");
      this.articlesInBasket.setAttribute("value", this.counterObj.currentValue);
    } else {
      this.articlesInBasket.classList.remove("bullet-icon");
    }
  }

  // update the cart when its content is displayed on the screen (not hidden)
  updateCart() {
    if (!this.parentElem.classList.contains("cart-content--hidden")) {
      this.showCart();
    }
  }

  // display empty cart and remove bullet icon
  deleteArticles() {
    this.parentElem.innerHTML = this.getEmptyCartHtml();
    this.articlesInBasket.classList.remove("bullet-icon");
  }

  // empty cart after clicking on bin icon
  registerBinEvent() {
    if (
      !this.parentElem.classList.contains("cart-content--hidden") &&
      this.articlesInBasket.classList.contains("bullet-icon")
    ) {
      const bin = document.querySelector(".fa-solid");
      bin.addEventListener("click", this.deleteArticles.bind(this));
    }
  }
}
