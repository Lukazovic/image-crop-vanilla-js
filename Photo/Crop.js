export default function (Photo) {
  Photo.crop = function () {
    const { width: imgWidth, height: imgHeight } = Photo.image;
    const { width: previewWidth, height: previewHeight } = Photo.photoPreview;

    const [widthFactor, heightFactor] = [
      +(imgWidth / previewWidth),
      +(imgHeight / previewHeight),
    ];

    const [selectionWidth, selectionHeight] = [
      +Photo.selection.style.width.replace('px', ''),
      +Photo.selection.style.height.replace('px', ''),
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
    Photo.ctx.clearRect(0, 0, Photo.ctx.width, Photo.ctx.height);

    // ajuste de proporções
    Photo.image.width = Photo.canvas.width = croppedWidth;
    Photo.image.height = Photo.canvas.height = croppedHeight;

    // adicionar a imagem cortada ao contexto do canvas
    Photo.ctx.putImageData(croppedImage, 0, 0);

    // esconder a ferramenta de seleção
    Photo.selection.style.display = 'none';

    // atualizar o preview da imagem
    Photo.photoPreview.src = canvas.toDataURL();

    // mostrar botão de download
    Photo.downloadButton.style.display = 'initial';
  };
}
