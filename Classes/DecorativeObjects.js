import { context } from '../context.js';
//Background and moutains whithout user interaction (collision detection)
export default class DecorativeObject {
  constructor({ x, y, image }) {
    this.position = { x: x, y: y };
    this.image = image;
    this.width = image.width;
    this.height = image.height;
  }
  draw() {
    context.drawImage(this.image, this.position.x, this.position.y);
  }
}
