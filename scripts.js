const photoFile = document.getElementById('photo-file');
let photoPreview = document.getElementById('photo-preview');
let image = new Image();

// Select & Preview Image

document.getElementById('select-image').onclick = function () {
  photoFile.click();
};

window.addEventListener('DOMContentLoaded', () => {
  photoFile.addEventListener('change', () => {
    let file = photoFile.files.item(0);

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (event) {
      image.src = event.target.result;
    };
  });
});

// Selection tool

const selection = document.getElementById('selection-tool');
let startX,
  startY,
  relativeStartX,
  relativeStartY,
  endX,
  endY,
  relativeEndX,
  relativeEndY;
let startSelection = false;

const events = {
  mouseover() {
    this.style.cursor = 'crosshair';
  },
  mousedown() {
    const { clientX, clientY, offsetX, offsetY } = event;

    startX = clientX;
    startY = clientY;
    relativeStartX = offsetX;
    relativeStartY = offsetY;

    startSelection = true;
  },
  mousemove() {
    const { clientX, clientY } = event;

    endX = event.clientX;
    endY = event.clientY;

    if (startSelection) {
      selection.style.display = 'initial';
      selection.style.top = `${startY}px`;
      selection.style.left = `${startX}px`;

      selection.style.width = `${endX - startX}px`;
      selection.style.height = `${endY - startY}px`;
    }
  },
  mouseup() {
    startSelection = false;

    const { layerX, layerY } = event;

    relativeEndX = layerX;
    relativeEndY = layerY;

    // mostrar o botão de corte
    cropButton.style.display = 'initial';
  },
};

Object.keys(events).forEach(eventName => {
  photoPreview.addEventListener(eventName, events[eventName]);
});

// Canvas
let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');

image.onload = function () {
  const { width, height } = image;

  canvas.width = width;
  canvas.height = height;

  // limpar o contexto
  ctx.clearRect(0, 0, width, height);

  // desenhar a imagem no canvas
  ctx.drawImage(image, 0, 0);

  photoPreview.src = canvas.toDataURL();
};

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
};
