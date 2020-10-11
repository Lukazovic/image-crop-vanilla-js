import Photo from './Photo/index.js';

window.addEventListener('DOMContentLoaded', () => {
  Photo.load();
});

// Select Image
document.getElementById('select-image').onclick = () => {
  document.getElementById('photo-file').click();
};

// Crop imagem
Photo.cropButton.onclick = () => Photo.crop();

// Download Image
Photo.downloadButton.onclick = () => Photo.download();
