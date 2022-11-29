export default class Lightbox {
  static init() {
    const mainPhoto = document.querySelector(".main-img--active");
    mainPhoto.addEventListener("click", (e) => {
      e.preventDefault();
      new Lightbox(e.currentTarget.src);
    });
  }

  constructor(url) {
    this.lightboxElem = this.buildDOM(url);
    document.body.appendChild(this.lightboxElem);
    this.onKeyUp = this.onKeyUp.bind(this); // allows to keep version of the function in the line below and then remove the event when needed
    document.addEventListener("keyup", this.onKeyUp);
  }

  buildDOM(url) {
    const elem = document.createElement("div");
    elem.classList.add("lightbox");
    elem.innerHTML = `<button class="lightbox__close"></button>
    <button class="lightbox__next"></button>
    <button class ="lightbox__prev"></button>
    <div class="lightbox__container"><img src="${url}"></div>`;
    elem
      .querySelector(".lightbox__close")
      .addEventListener("click", this.close.bind(this));
    return elem;
  }

  close(e) {
    e.preventDefault();
    this.lightboxElem.classList.add("fadeOut"); // to style the gradual disappearing effect
    window.setTimeout(() => {
      this.lightboxElem.remove();
    }, 500); // removes lightbox in 5 sec; gradual disappearing effect in CSS is 3 sec
    document.removeEventListener("keyup", this.onKeyUp);
  }
  // keybord navigation events
  onKeyUp(e) {
    if (e.key === "Escape") {
      this.close(e);
    }
  }
}

Lightbox.init();
