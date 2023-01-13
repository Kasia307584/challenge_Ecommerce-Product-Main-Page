// register event on photos in gallery: toggle photos and display the correspondig main photo
export default class Gallery {
  constructor(galleryImgs, selected, imgMain, className) {
    this.imgSrc = new ImgSrc(galleryImgs);
    this.arrOfObjSrc = this.imgSrc.createArrOfObjSrc();

    this.galleryImgs = galleryImgs; // gallery small photos
    this.selected = selected; // selected small photo
    this.imgMain = imgMain; // displayed main photo
    this.className = className; // class name --active for selected small photo

    this.registerGalleryEvent();
  }

  registerGalleryEvent() {
    this.galleryImgs.forEach((img) => {
      img.addEventListener("click", (e) => {
        this.toggleImg(e);
        this.displayMainImg(e);
      });
    });
  }

  toggleImg(e) {
    this.selected.classList.remove(this.className);
    e.target.classList.add(this.className);
    this.selected = e.target;
  }

  displayMainImg(e) {
    this.objTarget = this.arrOfObjSrc.find(
      (item) => item.small === e.target.src
    ); // find the object with the src of the clicked small photo
    this.imgMainTarget = this.imgSrc.getSrc(this.objTarget, "big"); // src of the correspondig big photo
    this.imgMain.src = this.imgMainTarget; // change src to the element with class --active
  }
}

// creates obj with pairs of small and big img; allows to access the targeted src
class ImgSrc {
  constructor(galleryPhoto) {
    this.galleryPhoto = galleryPhoto;
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
