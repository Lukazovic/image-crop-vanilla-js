const photoFile = document.getElementById('photo-file');
let image = document.getElementById('photo-preview');

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
    
    relativeEndX = layerX
    relativeEndY = layerY
  },
};

Object.keys(events).forEach(eventName => {
  image.addEventListener(eventName, events[eventName]);
});
