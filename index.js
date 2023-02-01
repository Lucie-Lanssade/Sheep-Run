//canvas creation
//***************************************************
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 566;
console.log(canvas.width);

//adds a gravity effect by updating the velocity by changing the speed of the falling element
const gravity = 1.5;
//************************************************************************

const sheep = new Image();
sheep.src = './assets/sheep.png';

//Classes
//*************************************************************************

class Player {
  constructor() {
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

const wolf = new Image();
wolf.src = './assets/wolf.png';

class Ennemy {
  constructor({ position, velocity, distance = { limit: 50, traveled: 0 } }) {
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
    console.log(this.distance.traveled);
  }
}

//Platforms with player interaction (collision detection)
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

class MovingPlatform {
  constructor({ position, velocity }) {
    this.position = { x: position.x, y: position.y };
    this.velocity = { x: velocity.x, y: velocity.y };
    this.image = movingPlat;
    this.width = 150;
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

//Background and moutains whithout user interaction (collision detection)
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

//*******************************************************************************

// Objects creation
//*******************************************************************************

//creates the player with its class characteristics
let player = new Player();

//contains ennemies with their class characteristics
let ennemies = [];

//contains moving platforms with their class characteristics
let movingPlatforms = [];

//Retrieves images in the assets folder
let platform1 = new Image();
platform1.src = './assets/Platform-1.png';

let platform2 = new Image();
platform2.src = './assets/Platform-2.png';

let platformSmall = new Image();
platformSmall.src = './assets/platform-small.png';

let background = new Image();
background.src = './assets/background.png';

let moutains = new Image();
moutains.src = './assets/moutains.png';

let movingPlat = new Image();
movingPlat.src = './assets/moving-platform.png';

//Creates new platforms with specific values
let platforms = [];

//Initialization of the decorative objects array
let decorativeObjects = [];

//Object keys pressed property returns true or false wether a key is pressed or not
let keys = { right: { pressed: false }, left: { pressed: false } };

let scrollEnd = 0;

//******************************************************************************

//Game logic
//******************************************************************************

//Detects collision for player and ennemies on platforms
function platformCollisionDetect({ object, platform }) {
  return (
    object.position.y + object.height <= platform.position.y &&
    object.position.y + object.height + object.velocity.y >=
      platform.position.y &&
    object.position.x + object.width >= platform.position.x &&
    object.position.x <= platform.position.x + platform.width
  );
}

//Detects collision between player and ennemies
function ennemiesTopCollisionDetect({ object1, object2 }) {
  return (
    object1.position.y + object1.height <= object2.position.y &&
    object1.position.y + object1.height + object1.velocity.y >=
      object2.position.y &&
    object1.position.x + object1.width >= object2.position.x &&
    object1.position.x <= object2.position.x + object2.width
  );
}

//Resets the game with all the elements (player,platform & decorative objects)
function resetGame() {
  //creates the player with its class characteristics
  player = new Player();

  //Generates new ennemies
  ennemies = [
    new Ennemy({
      position: { x: 600, y: 420 },
      velocity: { x: -1, y: 0 },
      distance: { limit: 600, traveled: 0 },
    }),
    new Ennemy({ position: { x: 1400, y: 420 }, velocity: { x: -1, y: 0 } }),
  ];

  // creates the images
  platform1 = new Image();
  platform1.src = './assets/Platform-1.png';

  platform2 = new Image();
  platform2.src = './assets/Platform-2.png';

  platformSmall = new Image();
  platformSmall.src = './assets/platform-small.png';

  movingPlat = new Image();
  movingPlat.src = './assets/moving-platform.png';

  background = new Image();
  background.src = './assets/background.png';

  moutains = new Image();
  moutains.src = './assets/moutains.png';

  platforms = [
    new Platform({
      x: 1430,
      y: 360,
      image: platform2,
    }),

    new Platform({
      x: platform1.width * 3 + 300 - 6,
      y: 340,
      image: platform2,
    }),

    new Platform({
      x: 5004,
      y: 340,
      image: platform2,
    }),

    new Platform({
      x: 5160,
      y: 400,
      image: platform2,
    }),

    new Platform({
      x: 2960,
      y: 330,
      image: platformSmall,
    }),

    new Platform({
      x: 2960 + platformSmall.width,
      y: 270,
      image: platformSmall,
    }),

    new Platform({ x: 0, y: 470, image: platform1 }),
    new Platform({ x: platform1.width - 2, y: 470, image: platform1 }),
    new Platform({ x: platform1.width * 2 - 4, y: 470, image: platform1 }),
    new Platform({
      x: platform1.width * 3 - 6 + 520,
      y: 470,
      image: platform1,
    }),
    new Platform({ x: 3980, y: 470, image: platform1 }),
    new Platform({ x: 4560, y: 470, image: platform1 }),
    new Platform({ x: 5140, y: 470, image: platform1 }),
  ];

  movingPlatforms = [
    new MovingPlatform({
      position: { x: 5950, y: 350 },
      velocity: { x: -1, y: 0 },
    }),
  ];

  decorativeObjects = [
    new DecorativeObject({ x: -1, y: -1, image: background }),
    new DecorativeObject({ x: 0, y: 0, image: moutains }),
  ];

  scrollEnd = 0;
}

//renders all the animation
function animation() {
  //screen refresh
  window.requestAnimationFrame(animation);
  //clears the canvas to keep the element's shape.
  context.fillStyle = 'white';
  context.fillRect(0, 0, canvas.width, canvas.height);

  //Draws the background and moutains
  decorativeObjects.forEach((object) => {
    object.draw();
  });

  // Draws the platforms
  platforms.forEach((platform) => {
    platform.draw();
  });

  // Draws the platforms
  movingPlatforms.forEach((movingPlatform) => {
    movingPlatform.update();
    if (
      ennemiesTopCollisionDetect({ object1: player, object2: movingPlatform })
    ) {
      player.velocity.y = 0;
    }
  });

  // Ennemies position update
  ennemies.forEach((ennemy, index) => {
    ennemy.update();
    if (ennemiesTopCollisionDetect({ object1: player, object2: ennemy })) {
      console.log('ennemy dead');
      player.velocity.y -= 30;
      setTimeout(() => {
        ennemies.splice(index, 1);
      }, 0);
    } else if (
      player.position.x + player.width >= ennemy.position.x &&
      player.position.y + player.height >= ennemy.position.y &&
      player.position.x <= ennemy.position.x + ennemy.width
    ) {
      resetGame();
    }
  });
  //Player position update
  player.update();

  //moves the player left and right and blocks the player before 100 and after 500
  if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = player.speed;
  } else if (
    (keys.left.pressed && player.position.x > 100) ||
    (keys.left.pressed && scrollEnd === 0 && player.position.x > 0)
  ) {
    player.velocity.x = -player.speed;
  } else {
    player.velocity.x = 0;

    //moves the platforms and background left and right depending on the player's movements
    if (keys.right.pressed) {
      scrollEnd += player.speed;
      platforms.forEach((platform) => {
        platform.position.x -= player.speed;
      });
      decorativeObjects.forEach((object) => {
        object.position.x -= player.speed * 0.66;
      });

      ennemies.forEach((ennemy) => {
        ennemy.position.x -= player.speed;
      });

      movingPlatforms.forEach((movingPlatform) => {
        movingPlatform.position.x -= player.speed;
      });
    } else if (keys.left.pressed && scrollEnd > 0) {
      scrollEnd -= player.speed;

      platforms.forEach((platform) => {
        platform.position.x += player.speed;
      });

      decorativeObjects.forEach((object) => {
        object.position.x += player.speed * 0.66;
      });

      ennemies.forEach((ennemy) => {
        ennemy.position.x += player.speed;
      });

      movingPlatforms.forEach((movingPlatform) => {
        movingPlatform.position.x += player.speed;
        if (movingPlatformCollisionDetect({ object: player, movingPlatform })) {
          player.velocity.y = 0;
        }
      });
    }
  }

  //platform collision detection
  platforms.forEach((platform) => {
    if (platformCollisionDetect({ object: player, platform })) {
      player.velocity.y = 0;
    }
    ennemies.forEach((ennemy) => {
      if (platformCollisionDetect({ object: ennemy, platform })) {
        ennemy.velocity.y = 0;
      }
    });
  });

  //   player.position.y + player.height <= platform.position.y &&
  //   player.position.y + player.height + player.velocity.y >=
  //     platform.position.y &&
  //   player.position.x + player.width >= platform.position.x &&
  //   player.position.x <= platform.position.x + platform.width

  //Initialization of win scenario
  if (scrollEnd > platform1.width * 5 + 600) {
    console.log('you win');
  }

  //Initialization of loose scenario
  if (player.position.y > canvas.height) {
    resetGame();
  }
}
resetGame();
animation();
//************************************************************************

// Controls
//************************************************************************
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
      player.velocity.y -= 25;
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
      player.velocity.y -= 10;
      break;
    case 'ArrowDown':
      break;
  }
});

//************************************************************************/
