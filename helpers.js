// returns formatted price
export const getPrice = (productPriceElem) => {
  return productPriceElem.textContent.substring(1);
};
