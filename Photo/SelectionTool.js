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

      if (startSelection) {
        Photo.selection.style.display = 'initial';
        Photo.selection.style.top = `${startY}px`;
        Photo.selection.style.left = `${startX}px`;

        Photo.selection.style.width = `${endX - startX}px`;
        Photo.selection.style.height = `${endY - startY}px`;
      }
    },
    mouseup() {
      PhotostartSelection = false;

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
}
