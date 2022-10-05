const defaultSize = 16;
const defaultColor = 'black';
const defaultMode = 'draw';

const colorPicker = document.getElementById('.color-picker');
const rainbowButton = document.getElementsByClassName('.rainbow-mode');
const drawButton = document.getElementsByClassName('.draw');
const clearButton = document.getElementsByClassName('.clear');
const eraserButton = document.getElementsByClassName('.eraser');

let currentSize = defaultSize;
let currentColor = defaultColor;
let currentMode = defaultMode;

colorPicker.oninput = (e) => setCurrentColor(e.target.value);
drawButton.onclick = () => setCurrentMode('.draw');
rainbowButton.onclick = () => setCurrentMode('.rainbow-mode');
clearButton.onclick = () => loadGrid();


let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

function setCurrentColor (newColor){
  currentColor = newColor;
}

function setCurrentSize (newSize){
  currentSize = newSize;
}

function setCurrentMode (newMode){
  activateButton(newMode);
  currentMode = newMode;
}

const grid = document.getElementById('grid');


function loadGrid (){
  clearGrid();
  createGrid(currentSize);
}

function clearGrid() {
  grid.innerHTML = ''
}

function createGrid (size){
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  
  for (let i = 0; i < size * size; i++){
    const square = document.createElement('div');
    square.classList.add('square');
    square.addEventListener('mouseover', changeColor);
    square.addEventListener('mousedown', changeColor);
    grid.appendChild(square);
  }
}

function changeColor (e){
  if (e.type === 'mouseover' && !mouseDown) return
  if (currentMode === 'rainbow-mode') {
    const randomR = Math.floor(Math.random() * 256)
    const randomG = Math.floor(Math.random() * 256)
    const randomB = Math.floor(Math.random() * 256)
    e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
  } else if (currentMode === 'draw') {
    e.target.style.backgroundColor = currentColor
  } else if (currentMode === 'eraser') {
    e.target.style.backgroundColor = '#fefefe'
  }
}

function activateButton (newMode) {
  if (currentMode === '.rainbow-mode') {
    rainbowButton.classList.remove('active');
  }
  else if (currentMode === '.draw'){
    drawButton.classlist.remove('active');
  }
  else if (currentMode === '.eraser'){
    eraserButton.classList.remove('active');
  }

  if (newMode === '.rainbow-mode'){
    rainbowButton.classList.add('active');
  }
  else if (newMode === '.draw'){
    drawButton.classList.add('active');
  }
  else if (newMode === '.eraser'){
    eraserButton.classList.add('active');
  }
}


window.onload = () => {
  createGrid(defaultSize);
  activateButton(defaultMode);
}

// // Add 16 divs
// for (let i = 1; i < 257; i++) {
//   const div = document.createElement('div');
//   cdiv.appendChild(div);
// }


