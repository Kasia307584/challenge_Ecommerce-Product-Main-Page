const productCountCart = document.querySelector(".cart-product-count");
const plusIcon = document.querySelector(".plus-icon");
const minusIcon = document.querySelector(".minus-icon");
const productCount = document.querySelector(".count-article");
const btnAdd = document.querySelector(".btn-add");
const productPriceCart = document.querySelector(".cart-product-price");
const productPrice = document.querySelector(".product-price");
const productPriceTotalCart = document.querySelector(
  ".cart-product-price-total"
);

let count = 0;

const displayCountCart = (number) => {
  productCountCart.textContent = " x " + number + " ";
  productPriceCart.textContent = productPrice.textContent;
  const price = productPrice.textContent.substring(1);
  const priceTotal = price * number;
  productPriceTotalCart.textContent = "$" + priceTotal + ".00";
};

plusIcon.addEventListener("click", () => {
  count++;
  console.log(count);
  productCount.textContent = count;
});

minusIcon.addEventListener("click", () => {
  if (count > 0) {
    count--;
    console.log(count);
    productCount.textContent = count;
  }
});

btnAdd.addEventListener("click", () => {
  if (count > 0) {
    displayCountCart(count);
  }
});
