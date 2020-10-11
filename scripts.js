import Photo from './Photo/index'
let photoPreview = document.getElementById('photo-preview');
let image = new Image();
let photoName;

window.addEventListener('DOMContentLoaded', () => {
  Photo.load();
});

// Select & Preview Image
document.getElementById('select-image').onclick = () => {
  document.getElementById('photo-file').photoFile.click();
};

// Cortar imagem
const cropButton = document.getElementById('crop-image');
cropButton.onclick = () => Photo.crop();

// Download
const downloadButton = document.getElementById('download');
downloadButton.onclick = function () {
  const a = document.createElement('a');
  a.download = photoName + '-cropped.png';
  a.href = canvas.toDataURL();
  a.click();
};
