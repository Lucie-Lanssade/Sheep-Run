//canvas creation
//***************************************************
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 566;

//adds a gravity effect by updating the velocity by changing the speed of the falling element
const gravity = 1.5;
//************************************************************************

export { canvas, context, gravity };
