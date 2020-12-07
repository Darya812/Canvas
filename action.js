const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const clear = document.querySelector('#clear');
const size = document.querySelector('#size');
const color = document.querySelector('#color');
const magicColor = document.querySelector('#magic-color');
const buttons = document.querySelector('.buttons');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - buttons.offsetHeight;

ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.strokeStyle = color.value;
ctx.lineWidth = size.value;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;
let isMagicColor = false;

function draw(e) {
  if (!isDrawing) return;
  if (isMagicColor) {
    MagicDraw(e);
  } else {
    ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  lastX = e.offsetX;
  lastY = e.offsetY;
  }
}

function changeColor () {
  ctx.strokeStyle = this.value;
}

function changeSize () {
  ctx.lineWidth = this.value;
}

function clearWindow() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  lastX = e.offsetX;
  lastY = e.offsetY;
 });

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => isDrawing = false);
canvas.addEventListener("mouseout", () => isDrawing = false);
clear.addEventListener('click', clearWindow);
color.addEventListener('blur', changeColor);    
size.addEventListener('mousemove', changeSize); 


magicColor.addEventListener('click', (e) => {
   
  isMagicColor = !isMagicColor;
})
 
  function MagicDraw (e) {
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  lastX = e.offsetX;
  lastY = e.offsetY;

  hue++;

  if (hue >= 360) {
    hue = 0;
  }
  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
    direction = !direction;
  }
  if (direction) {
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--;
  }
}


