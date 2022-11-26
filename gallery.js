// add event "click" to photos gallery: toggle small photos and display a correspondig big photo
export default class Gallery {
  constructor() {
    const imgSrc = new ImgSrc();
    const arrOfObjSrc = imgSrc.createArrOfObjSrc();

    const galleryNode = document.querySelector(".gallery-photos");
    const listImg = galleryNode.childNodes; // .childNodes forms an iterable list; not required when using querySelectorAll(".gallery-photo")
    let selected = document.querySelector(".gallery-photo--active");
    let imgMain = document.querySelector(".main-img--active");

    listImg.forEach((img) => {
      img.addEventListener("click", (e) => {
        selected?.classList.remove("gallery-photo--active");
        if (selected === e.target) {
          e.target.classList.remove("gallery-photo--active");
          selected = null;
        } else {
          e.target.classList.add("gallery-photo--active");
          const objTarget = arrOfObjSrc.find(
            (item) => item.small === e.target.src
          ); // find the object with the src of the clicked small photo
          const imgMainTarget = imgSrc.getSrc(objTarget, "big"); // src of the correspondig big photo
          imgMain.src = imgMainTarget; // change src to the element with class --active
          selected = e.target;
        }
      });
    });
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
