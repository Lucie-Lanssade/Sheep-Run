/*Imports*/

import Player from './Classes/Player.js';
import Ennemy from './Classes/Ennemy.js';
import Platform from './Classes/Platform.js';
import MovingPlatform from './Classes/MovingPlatform.js';
import DecorativeObject from './Classes/DecorativeObjects.js';

import { canvas, context } from './context.js';

import {
  platform1,
  platform2,
  platformSmall,
  background,
  moutains,
  winning,
  loosing,
} from './images.js';

// Object initializations
//*******************************************************************************

let player;
let ennemies = [];
let movingPlatforms = [];
let platforms = [];
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

//Creates the game with all the elements (player,platform & decorative objects)
function createGame() {
  //creates the player with its class characteristics
  player = new Player();

  //Generates new ennemies
  ennemies = [
    new Ennemy({
      position: { x: 900, y: 420 },
      velocity: { x: -1, y: 0 },
      distance: { limit: 800, traveled: 0 },
    }),
    new Ennemy({
      position: { x: 3106, y: 220 },
      velocity: { x: -1, y: 0 },
      distance: { limit: 145, traveled: 0 },
    }),

    new Ennemy({
      position: { x: 4270, y: 420 },
      velocity: { x: -1, y: 0 },
      distance: { limit: 145, traveled: 0 },
    }),

    new Ennemy({
      position: { x: 5140, y: 420 },
      velocity: { x: -1, y: 0 },
      distance: { limit: 145, traveled: 0 },
    }),

    new Ennemy({
      position: { x: 7100, y: 100 },
      velocity: { x: -1, y: 0 },
      distance: { limit: 90, traveled: 0 },
    }),

    new Ennemy({
      position: { x: 7265, y: 100 },
      velocity: { x: -1, y: 0 },
      distance: { limit: 90, traveled: 0 },
    }),
  ];

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
      x: 7120,
      y: 340,
      image: platform2,
    }),

    new Platform({
      x: 9000,
      y: 340,
      image: platform2,
    }),

    new Platform({
      x: 9290,
      y: 340,
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

    new Platform({
      x: 8200,
      y: 350,
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
    new Platform({ x: 6795, y: 470, image: platform1 }),
    new Platform({ x: 7375, y: 470, image: platform1 }),
    new Platform({ x: 8700, y: 470, image: platform1 }),
    new Platform({ x: 9280, y: 470, image: platform1 }),
  ];

  movingPlatforms = [
    new MovingPlatform({
      position: { x: 5950, y: 350 },
      velocity: { x: -0.5, y: 0 },
    }),

    new MovingPlatform({
      position: { x: 6290, y: 300 },
      velocity: { x: -0.5, y: 0 },
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
    if (player.justGotHit) return;
    if (ennemiesTopCollisionDetect({ object1: player, object2: ennemy })) {
      player.velocity.y -= 30;
      player.points += 5;
      setTimeout(() => {
        ennemies.splice(index, 1);
      }, 0);
      //   console.log(player.points);
    } else if (
      player.position.x + player.width >= ennemy.position.x &&
      player.position.y + player.height >= ennemy.position.y &&
      player.position.x <= ennemy.position.x + ennemy.width
    ) {
      player.health -= 5;
      player.justGotHit = true;
      setTimeout(() => {
        player.justGotHit = false;
      }, 1000);
    }
  });
  //Player position update
  player.update();
  console.log(player.health);

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

  //Initialization of win scenario
  if (scrollEnd > 9230) {
    context.clearRect(0, 0, 1024, 566);
    context.drawImage(winning, 0, 0);
  }

  //Initialization of loose scenario
  if (player.position.y > canvas.height || player.health === 0) {
    context.clearRect(0, 0, 1024, 566);
    context.drawImage(loosing, 0, 0);
  }
}
createGame();
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
