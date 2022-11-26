// register event on photos in gallery: toggle photos and display the correspondig main photo
export default class Gallery {
  constructor() {
    this.imgSrc = new ImgSrc();
    this.arrOfObjSrc = this.imgSrc.createArrOfObjSrc();

    const galleryNode = document.querySelector(".gallery-photos");
    const listImg = galleryNode.childNodes; // .childNodes forms an iterable list; not required when using querySelectorAll(".gallery-photo")
    this.selected = document.querySelector(".gallery-photo--active"); // selected photo in gallery
    this.imgMain = document.querySelector(".main-img--active"); // selected main photo

    listImg.forEach((img) => {
      img.addEventListener("click", (e) => {
        this.toggleImg(e);
        this.displayMainImg(e);
      });
    });
  }

  toggleImg(e) {
    this.selected?.classList.remove("gallery-photo--active");
    if (this.selected === e.target) {
      e.target.classList.remove("gallery-photo--active");
      this.selected = null;
    } else {
      e.target.classList.add("gallery-photo--active");
      this.selected = e.target;
    }
  }

  displayMainImg(e) {
    this.objTarget = this.arrOfObjSrc.find(
      (item) => item.small === e.target.src
    ); // find the object with the src of the clicked small photo
    this.imgMainTarget = this.imgSrc.getSrc(this.objTarget, "big"); // src of the correspondig big photo
    this.imgMain.src = this.imgMainTarget; // change src to the element with class --active
  }
}

// creates obj with pairs of small and big img, allows to access the targeted src
class ImgSrc {
  constructor() {
    this.galleryPhoto = document.querySelectorAll(".gallery-photo");
  }

  // creates array of objects with key/value pairs where values are image's src
  createArrOfObjSrc() {
    this.productPhotos = [];

    this.galleryPhoto.forEach((ph) => {
      this.productPhotos.push({ small: ph.src }); // create objects with pairs key: "small" / value: image src
    });

    this.productPhotos.forEach((obj) => {
      obj["big"] = obj["small"].substring(0, obj["small"].length - 14) + ".jpg"; // add to objects pairs key: "big" / value: image src
    });

    return this.productPhotos;
  }

  // access value of the given key in the given object
  getSrc(photoObj, keyToRead) {
    return photoObj[keyToRead];
  }
}
