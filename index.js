//canvas creation
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;
console.log(canvas.width);

//adds a gravity effect by updating the velocity by changing the speed of the falling element
const gravity = 1.5;

class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 100,
    };
    this.width = 50;
    this.height = 50;
    this.velocity = {
      x: 0,
      y: 1,
    };
  }
  draw() {
    context.fillStyle = 'red';
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  //udpates the player's position
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    // adds gravity and stops the element from going outside of the canvas
    if (this.position.y + this.height + this.velocity.y <= canvas.height)
      this.velocity.y += gravity;
    else this.velocity.y = 0;
  }
}

class Platform {
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


class DecorativeObject {
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




//creates the player with its class characteristics
const player = new Player();
//creates platforms with specific positions and measurements

//creates an image dynamically
function createImage(imageSrc){


}

const platform1 = new Image();
platform1.src = './assets/Platform-1.png';

const basePlatform = new Image();
basePlatform.src = './assets/base.platform.png';

const platforms = [
  new Platform({ x: 200, y: 100, image: platform1 }),
  new Platform({ x: 350, y: 160, image: platform1 }),
  new Platform({ x: 0, y: 500, image: basePlatform }),
  new Platform({ x: basePlatform.width - 2, y: 500, image: basePlatform }),
];

const decorativeObjects= [
new DecorativeObject({x:0, y:0 ;image:})]

//Object keys pressed property returns true or false wether a key is pressed or not
const keys = { right: { pressed: false }, left: { pressed: false } };

let scrollEnd = 0;

//renders all the animation
//******************************
function animation() {
  //screen refresh
  window.requestAnimationFrame(animation);
  //clears the canvas to keep the element's shape.
  context.fillStyle = 'white';
  context.fillRect(0, 0, canvas.width, canvas.height);
  // Draws the platforms
  platforms.forEach((platform) => {
    platform.draw();
  });
  //Player position update
  player.update();

  //moves the player left and right and blocks the player before 100 and after 500
  if (keys.right.pressed && player.position.x < 500) {
    player.velocity.x = 5;
  } else if (keys.left.pressed && player.position.x > 100) {
    player.velocity.x = -5;
  } else {
    player.velocity.x = 0;
    //moves the platform left and right depending on the player's movements
    if (keys.right.pressed) {
      scrollEnd += 5;
      platforms.forEach((platform) => {
        platform.position.x -= 5;
      });
    } else if (keys.left.pressed) {
      scrollEnd -= 5;
      platforms.forEach((platform) => {
        platform.position.x += 5;
      });
    }
  }

  //platform collision detection

  platforms.forEach((platform) => {
    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >=
        platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      player.velocity.y = 0;
    }
  });

  //Initialization of win scenario
  if (scrollEnd > 2000) {
    console.log('you win');
  }
}

animation();

//event listener when keys are pressed
window.addEventListener('keydown', (event) => {
  switch (event.code) {
    case 'ArrowLeft':
      keys.left.pressed = true;
      break;
    case 'ArrowRight':
      keys.right.pressed = true;
      break;
    case 'ArrowUp':
      player.velocity.y -= 10;
      break;
    case 'ArrowDown':
      break;
  }
});

//event listener when keys are not pressed
window.addEventListener('keyup', (event) => {
  switch (event.code) {
    case 'ArrowLeft':
      keys.left.pressed = false;
      break;
    case 'ArrowRight':
      keys.right.pressed = false;
      break;
    case 'ArrowUp':
      player.velocity.y -= 20;
      break;
    case 'ArrowDown':
      break;
  }
});
