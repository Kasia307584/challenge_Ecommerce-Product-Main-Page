export default class Gallery {
  constructor() {
    const galleryNode = document.querySelector(".gallery-photos");
    const listImg = galleryNode.childNodes; // .childNodes forms an iterable list; not required when using querySelectorAll(".gallery-photo")
    let selected = document.querySelector(".gallery-photo--active");

    listImg.forEach((img) => {
      img.addEventListener("click", (e) => {
        selected?.classList.remove("gallery-photo--active");
        if (selected === e.target) {
          e.target.classList.remove("gallery-photo--active");
          selected = null;
        } else {
          e.target.classList.add("gallery-photo--active");
          selected = e.target;
        }
      });
    });
  }
}
