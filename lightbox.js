import { ImgSrc } from "./gallery.js";
import Gallery from "./gallery.js";

export default class Lightbox {
  static init() {
    const mainPhoto = document.querySelector(".main-img--active");
    mainPhoto.addEventListener("click", (e) => {
      e.preventDefault();
      new Lightbox(e.currentTarget.src, linksArr);
    });

    const imgs = new ImgSrc();
    const imgsObj = imgs.createArrOfObjSrc();
    const linksArr = imgsObj.map((obj) => obj.big);
  }

  constructor(url, links) {
    this.lightboxElem = this.buildDOM(url);
    document.body.appendChild(this.lightboxElem);

    const galleryNode = document.querySelector(".lightbox__gallery-photos");
    const selected = document.querySelector(".lightbox__gallery-photo--active"); // selected photo in gallery
    const imgMain = document.querySelector(".lightbox__main-img--active"); // selected main photo
    const className = "lightbox__gallery-photo--active";

    const gallery = new Gallery(galleryNode, selected, imgMain, className);
    // this.galleryList = document.querySelectorAll(".lightbox__gallery-photo");
    // gallery.galleryPh(this.galleryList, "lightbox__gallery-photo--active");

    this.onKeyUp = this.onKeyUp.bind(this); // allows to keep version of the function in the line below and then remove the event when needed
    document.addEventListener("keyup", this.onKeyUp);

    this.links = links;
  }

  buildDOM(url) {
    const elem = document.createElement("div");
    elem.classList.add("lightbox");
    elem.innerHTML = `<button class="lightbox__close"></button>
    <button class="lightbox__next"></button>
    <button class ="lightbox__prev"></button>
    <div class="lightbox__container">
    <div class="lightbox__main-photo">
          <img
            class="main-img lightbox__main-img--active"
            src="${url}"
            alt="Product image"
          />
        </div>
    <div class="lightbox__gallery-photos">
          <img
            class="lightbox__gallery-photo lightbox__gallery-photo--active"
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

    this.url = url; // url of currently displayed img

    elem
      .querySelector(".lightbox__close")
      .addEventListener("click", this.close.bind(this));
    elem
      .querySelector(".lightbox__next")
      .addEventListener("click", this.next.bind(this));
    elem
      .querySelector(".lightbox__prev")
      .addEventListener("click", this.prev.bind(this));
    return elem;
  }

  loadImage(url) {
    const image = new Image();
    const containerMainPh = this.lightboxElem.querySelector(
      ".lightbox__main-photo"
    );
    containerMainPh.innerHTML = "";
    containerMainPh.appendChild(image);
    image.src = url;
    this.url = url;
  }

  close(e) {
    e.preventDefault();
    this.lightboxElem.classList.add("fadeOut"); // to style the gradual disappearing effect
    window.setTimeout(() => {
      this.lightboxElem.remove();
    }, 500); // removes lightbox in 5 sec; gradual disappearing effect in CSS is 3 sec
    document.removeEventListener("keyup", this.onKeyUp);
  }
  next(e) {
    e.preventDefault();
    let pos = this.links.findIndex((img) => img === this.url); // find index of currently displayed img
    if (pos === this.links.length - 1) {
      pos = -1;
    }
    this.loadImage(this.links[pos + 1]);
  }
  prev(e) {
    e.preventDefault();
    let pos = this.links.findIndex((img) => img === this.url);
    if (pos === 0) {
      pos = this.links.length;
    }
    this.loadImage(this.links[pos - 1]);
  }

  // keybord navigation events
  onKeyUp(e) {
    if (e.key === "Escape") {
      this.close(e);
    } else if (e.key === "ArrowLeft") {
      this.prev(e);
    } else if (e.key === "ArrowRight") {
      this.next(e);
    }
  }
}

Lightbox.init();
