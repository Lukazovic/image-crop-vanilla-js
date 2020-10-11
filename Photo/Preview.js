export default function (Photo) {
  Photo.preview = function () {
    Photo.photoPreview.src = Photo.canvas.toDataURL();
  }
}
