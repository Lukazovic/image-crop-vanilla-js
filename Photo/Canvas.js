export default function (Photo) {
  Photo.canvas = document.createElement('canvas');
  Photo.ctx = canvas.getContext('2d');
}
