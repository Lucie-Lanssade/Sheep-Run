import { canvas, context, gravity } from '../context.js';

const wolf = new Image();
wolf.src = './assets/wolf.png';

export default class Ennemy {
  constructor({ position, velocity, distance = { limit: 50, traveled: 0 } }) {
    this.damage = 5;
    this.position = { x: position.x, y: position.y };
    this.velocity = { x: velocity.x, y: velocity.y };
    this.image = wolf;
    this.width = 50;
    this.height = 50;
    this.distance = distance;
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

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    //gravity
    if (this.position.y + this.height + this.velocity.y <= canvas.height)
      this.velocity.y += gravity;

    //allows the ennemy to walk back and forth
    this.distance.traveled += Math.abs(this.velocity.x);
    if (this.distance.traveled > this.distance.limit) {
      this.distance.traveled = 0;
      this.velocity.x = -this.velocity.x;
    }
  }
}
