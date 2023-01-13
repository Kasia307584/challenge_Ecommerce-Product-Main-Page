import Gallery from "./gallery.js";

// displays lightbox; uses gallery methods to toggle photos; allows to swich main photo and close the lightbox
export default class Lightbox {
  constructor(selected, imgMain, className) {
    this.selected = selected; // small photo last selected on the main page
    this.imgMain = imgMain; // main photo last displayed on the main page
    this.className = className; // class name --active for selected small photo in lightbox

    this.lightboxElem = this.buildDOM();
    document.body.appendChild(this.lightboxElem);
    this.imgMain = document.querySelector(".lightbox__main-img"); // selected main photo in lightbox

    this.galleryImgs = document.querySelectorAll(".lightbox__gallery-photo"); // gallery small photos in lightbox
    this.findSelectedImg().classList.add(className);
    this.selected = this.findSelectedImg(); // selected small photo in lightbox

    this.gallery = new Gallery(
      this.galleryImgs,
      this.selected,
      this.imgMain,
      className
    );
  }

  buildDOM() {
    const elem = document.createElement("div");
    elem.classList.add("lightbox");
    elem.innerHTML = `<button class="lightbox__close"></button>
    <button class="lightbox__next"></button>
    <button class ="lightbox__prev"></button>
    <div class="lightbox__container">
    <div class="lightbox__main-photo">
          <img
            class="lightbox__main-img lightbox__main-img--active"
            src=${this.imgMain.src}
            alt="Product image"
          />
        </div>
    <div class="lightbox__gallery-photos">
          <img
            class="lightbox__gallery-photo "
            src="images/image-product-1-thumbnail.jpg"
            alt="Product image"
          />
          <img
            class="lightbox__gallery-photo"
            src="images/image-product-2-thumbnail.jpg"
            alt="Product image"
          />
          <img
            class="lightbox__gallery-photo"
            src="images/image-product-3-thumbnail.jpg"
            alt="Product image"
          />
          <img
            class="lightbox__gallery-photo"
            src="images/image-product-4-thumbnail.jpg"
            alt="Product image"
          />
        </div>
    </div>`;

    return elem;
  }

  // find small photo the last selected on the main page in the lightbox's img gallery
  findSelectedImg() {
    return Array.from(this.galleryImgs).find(
      (img) => img.src === this.selected.src
    );
  }
}
