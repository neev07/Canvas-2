var database;
var drawing = [];
var currentPath = [];
var isDrawing = false;

function setup(){
  canvas = createCanvas(400,400);
  database = firebase.database();


  canvas.mousePressed(startPath);
  canvas.mouseReleased(endPath);
  canvas.parent('canvascontainer');
  var saveButton = select('#saveButton');
  saveButton.mousePressed(saveDrawing);
}

function startPath(){
  isDrawing = true;
  currentPath = [];
  drawing.push(currentPath);
}

function endPath(){
  isDrawing = false;
}

function draw(){
  background(0);

  if(isDrawing){
    var point = {x:mouseX, y:mouseY}
    currentPath.push(point);
  }

  stroke(225);
  strokeWeight(4);
  noFill();
  for(var i=0; i<drawing.length; i++){
    var path = drawing[i];
    beginShape();
    for(var j=0; j<path.length; j++){
    vertex(path[j].x, path[j].y);
  }
    endShape();
}
}

function saveDrawing(){
 var ref = database.ref('drawing')
 var data = {
  drawing: drawing
 }
 var result = ref.push(data, dataSent)
 console.log(result.key);

 function dataSent(err, status){
   console.log(err, status);
 }
}
