export default function (Photo) {
  Photo.selection = document.getElementById('selection-tool');
  Photo.startSelection = false;

  const events = {
    mouseover() {
      this.style.cursor = 'crosshair';
    },
    mousedown() {
      const { clientX, clientY, offsetX, offsetY } = event;

      Photo.startX = clientX;
      Photo.startY = clientY;
      Photo.relativeStartX = offsetX;
      Photo.relativeStartY = offsetY;

      Photo.startSelection = true;
    },
    mousemove() {
      const { clientX, clientY } = event;

      Photo.endX = clientX;
      Photo.endY = clientY;

      if (Photo.startSelection) {
        Photo.selection.style.display = 'initial';
        Photo.selection.style.top = `${Photo.startY}px`;
        Photo.selection.style.left = `${Photo.startX}px`;

        Photo.selection.style.width = `${Photo.endX - Photo.startX}px`;
        Photo.selection.style.height = `${Photo.endY - Photo.startY}px`;
      }
    },
    mouseup() {
      Photo.startSelection = false;

      const { layerX, layerY } = event;

      Photo.relativeEndX = layerX;
      Photo.relativeEndY = layerY;

      // mostrar o botão de corte
      Photo.cropButton.style.display = 'initial';
    },
  };

  Object.keys(events).forEach(eventName => {
    Photo.photoPreview.addEventListener(eventName, events[eventName]);
  });
};
