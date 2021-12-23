const canvas = document.getElementById("paint");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("control_color");
const range = document.getElementById("range");
const mode = document.getElementById("modeBtn");

canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = "#2c2c2c"
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

function startPainting(event) {
    painting = true;
}

function stopPainting(event) {
    painting = false;
}

function changeColor(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
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

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
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