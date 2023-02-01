import { canvas, context, gravity } from '../context.js';
const sheep = new Image();
sheep.src = './assets/sheep.png';

export default class Player {
  constructor() {
    this.health = 15;
    this.points = 0;
    this.speed = 10;
    this.position = {
      x: 100,
      y: 100,
    };
    this.width = 68;
    this.height = 58;
    this.image = sheep;
    this.frames = 0;
    this.velocity = {
      x: 0,
      y: 1,
    };
    this.justGotHit = false;
  }
  draw() {
    context.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
  //udpates the player's position
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    // adds gravity and stops the element from going outside of the canvas
    if (this.position.y + this.height + this.velocity.y <= canvas.height)
      this.velocity.y += gravity;
  }
}
