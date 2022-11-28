export class Lightbox {
  static init() {
    const mainPhoto = document.querySelector(".main-img--active");
    mainPhoto.addEventListener("click", (e) => {
      e.preventDefault();
      new Lightbox(e.currentTarget.src);
    });
  }

  constructor(src) {
    const lightboxElem = this.buildDOM(src);
    document.body.appendChild(lightboxElem);
  }

  buildDOM(src) {
    const elem = document.createElement("div");
    elem.classList.add("lightbox");
    elem.innerHTML = `<button class="lightbox__close"></button>
    <button class="lightbox__next"></button>
    <button class ="lightbox__prev"></button>
    <div class="lightbox__container"><img src="${src}"></div>`;
    return elem;
  }
}

Lightbox.init();
