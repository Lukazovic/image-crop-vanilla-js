const photoFile = document.getElementById('photo-file');
let photoPreview = document.getElementById('photo-preview');
let image = new Image();
let photoName;
// Select & Preview Image

document.getElementById('select-image').onclick = function () {
  photoFile.click();
};

window.addEventListener('DOMContentLoaded', () => {
  photoFile.addEventListener('change', () => {
    let file = photoFile.files.item(0);

    photoName = file.name;

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (event) {
      image = new Image();
      image.src = event.target.result;
      image.onload = onLoadImage;
    };
  });
});

function onLoadImage() {
  const { width, height } = image;

  canvas.width = width;
  canvas.height = height;

  // limpar o contexto
  ctx.clearRect(0, 0, width, height);

  // desenhar a imagem no canvas
  ctx.drawImage(image, 0, 0);

  photoPreview.src = canvas.toDataURL();
}

// Cortar imagem
const cropButton = document.getElementById('crop-image');
cropButton.onclick = () => {
  const { width: imgWidth, height: imgHeight } = image;
  const { width: previewWidth, height: previewHeight } = photoPreview;

  const [widthFactor, heightFactor] = [
    +(imgWidth / previewWidth),
    +(imgHeight / previewHeight),
  ];

  const [selectionWidth, selectionHeight] = [
    +selection.style.width.replace('px', ''),
    +selection.style.height.replace('px', ''),
  ];

  const [croppedWidth, croppedHeight] = [
    +(selectionWidth * widthFactor),
    +(selectionHeight * heightFactor),
  ];

  const [actualX, actualY] = [
    +(relativeStartX * widthFactor),
    +(relativeStartY * heightFactor),
  ];

  // pegar do ctx as regiões de corte da imagem
  const croppedImage = ctx.getImageData(
    actualX,
    actualY,
    croppedWidth,
    croppedHeight
  );

  // limpar o ctx
  ctx.clearRect(0, 0, ctx.width, ctx.height);

  // ajuste de proporções
  image.width = canvas.width = croppedWidth;
  image.height = canvas.height = croppedHeight;

  // adicionar a imagem cortada ao contexto do canvas
  ctx.putImageData(croppedImage, 0, 0);

  // esconder a ferramenta de seleção
  selection.style.display = 'none';

  // atualizar o preview da imagem
  photoPreview.src = canvas.toDataURL();

  // mostrar botão de download
  downloadButton.style.display = 'initial';
};

// Download
const downloadButton = document.getElementById('download');
downloadButton.onclick = function () {
  const a = document.createElement('a');
  a.download = photoName + '-cropped.png';
  a.href = canvas.toDataURL();
  a.click();
};
