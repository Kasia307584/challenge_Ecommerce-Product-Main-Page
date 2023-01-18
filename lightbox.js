import Gallery from "./gallery.js";

// displays lightbox; uses gallery methods to toggle photos; allows to swich main photo and close the lightbox
export default class Lightbox {
  constructor(selected, imgMain, className) {
    this.selected = selected; // small photo last selected on the main page
    this.imgMain = imgMain; // main photo last displayed on the main page
    this.className = className; // class name --active for selected small photo in lightbox

    this.lightboxElem = this.buildDOM();
    document.body.appendChild(this.lightboxElem);
    this.imgMain = document.querySelector(".lightbox__main-img"); // currently displayed main photo in lightbox

    this.galleryImgs = document.querySelectorAll(".lightbox__gallery-photo"); // gallery small photos in lightbox
    this.findSelectedImg().classList.add(this.className);
    this.selected = this.findSelectedImg(); // selected small photo in lightbox

    this.gallery = new Gallery(
      this.galleryImgs,
      this.selected,
      this.imgMain,
      className
    );
    this.arrBigImgSrc = this.gallery.arrOfObjSrc.map((obj) => obj.big);
    // Question: should I use new instance of the class ImgSrc here instead? / AND put it inside the next() method

    this.registerLightboxEvents();
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
            class="lightbox__main-img"
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

  // identify small photo the last selected on the main page in the lightbox's img gallery
  findSelectedImg() {
    return Array.from(this.galleryImgs).find(
      (img) => img.src === this.selected.src
    );
  }

  registerLightboxEvents() {
    this.lightboxElem
      .querySelector(".lightbox__close")
      .addEventListener("click", this.close.bind(this));
    this.lightboxElem
      .querySelector(".lightbox__next")
      .addEventListener("click", () => {
        this.next();
        this.toggleCorrespondingImg();
      });
  }

  close(e) {
    e.preventDefault();
    this.lightboxElem.classList.add("fadeOut"); // to style the gradual disappearing effect
    window.setTimeout(() => {
      this.lightboxElem.remove();
    }, 500); // removes lightbox in 5 sec; gradual disappearing effect in CSS is 3 sec
  }

  // allows to switch the main photo to the next one
  next() {
    const index = this.arrBigImgSrc.findIndex(
      (imgSrc) => imgSrc === this.imgMain.src
    ); // identify the array's index of currently displayed main photo
    let nextImg;

    if (this.imgMain.src === this.arrBigImgSrc.at(-1)) {
      nextImg = this.arrBigImgSrc.at(0);
    } else {
      nextImg = this.arrBigImgSrc.at(index + 1);
    } // identify the src of the next img in the array, or the first one if no more items in the array

    this.imgMain.src = nextImg; // displays the next img as the main photo
  }

  // allows to select the corresponding small photo to the main photo
  toggleCorrespondingImg() {
    this.objTarget = this.gallery.arrOfObjSrc.find(
      (item) => item.big === this.imgMain.src
    ); // find the object with the src of currently displayed main photo
    this.imgSmallTarget = this.gallery.imgSrc.getSrc(this.objTarget, "small"); // src of the correspondig small photo

    this.galleryImgs.forEach((img) => {
      if (img.src === this.imgSmallTarget) {
        this.gallery.selected.classList.remove(this.className);
        img.classList.add(this.className);
        this.gallery.selected = img;
      } // selects the corresponding small photo
    });
    // Question: is ok to use this.gallery.selected instead of this.selected?
  }
}
