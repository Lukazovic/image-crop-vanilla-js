import Canvas from './Canvas';
import Preview from './Preview';
import Load from './Load';

const Photo = {};

Canvas(Photo);
Photo.preview = Preview(Photo);
Load(Photo);

export default Photo
