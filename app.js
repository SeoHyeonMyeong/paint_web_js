const canvas = document.getElementById("paint");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("control_color");
const range = document.getElementById("range");
const mode = document.getElementById("modeBtn");
const save = document.getElementById("saveBtn");

const INITIAL_COLOR = "#2c2c2c"
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

fillWhite();
ctx.strokeStyle = INITIAL_COLOR
ctx.fillStyle = INITIAL_COLOR
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else {
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function fillWhite(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function startPainting(event) {
    painting = true;
}

function stopPainting(event) {
    painting = false;
}

function changeColor(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function changeSize(event){
    const size = event.target.value;
    ctx.lineWidth = size
}

function changeMode(event){
    if(filling){
        filling = false;
        mode.innerText = "FILL"
    }
    else {
        filling = true;
        mode.innerText = "PAINT"
    }
}

function fillCanvas(event){
    if(filling){
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleCM(event){
    event.preventDefault();
}

function saveClick(event){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "image.png"
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", fillCanvas);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color =>
    color.addEventListener("click", changeColor)
);


if(range){
    range.addEventListener("input", changeSize)
}

if(mode) {
    mode.addEventListener("click",changeMode)
}

if(save){
    save.addEventListener('click',saveClick)
}