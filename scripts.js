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

const slection = document.getElementById('selection-tool');
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
      slection.style.display = 'initial';
      slection.style.top = `${startY}px`;
      slection.style.left = `${startX}px`;

      slection.style.width = `${endX - startX}px`;
      slection.style.height = `${endY - startY}px`;
    }
  },
  mouseup() {
    startSelection = false;

    const { layerX, layerY } = event;

    relativeEndX = layerX;
    relativeEndY = layerY;
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
