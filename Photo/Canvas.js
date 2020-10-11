export default function (Photo) {
  Photo.canvas = document.createElement('canvas');
  Photo.ctx = Photo.canvas.getContext('2d');
};
