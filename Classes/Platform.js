import { context } from '../context.js';

//Platforms with player interaction (collision detection)
export default class Platform {
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
