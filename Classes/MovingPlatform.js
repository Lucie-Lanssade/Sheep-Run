import { context } from '../context.js';

let movingPlat = new Image();
movingPlat.src = './assets/moving-platform.png';

export default class MovingPlatform {
  constructor({ position, velocity }) {
    this.position = { x: position.x, y: position.y };
    this.velocity = { x: velocity.x, y: velocity.y };
    this.image = movingPlat;
    this.width = 260;
    this.height = 60;
    this.distance = { limit: 100, traveled: 0 };
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

    //allows the platform to move back and forth
    this.distance.traveled += Math.abs(this.velocity.x);
    if (this.distance.traveled > this.distance.limit) {
      this.distance.traveled = 0;
      this.velocity.x = -this.velocity.x;
    }
  }
}
