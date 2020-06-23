var database;
var drawing = [];
var currentPath = [];
var isDrawing = false;

function setup(){
  canvas = createCanvas(400,400);


  var firebaseConfig = {
    apiKey: "AIzaSyD6WvgZ6na4L0B-_k1SRaMg2BM37WPphIA",
    authDomain: "my-canvas-project.firebaseapp.com",
    databaseURL: "https://my-canvas-project.firebaseio.com",
    projectId: "my-canvas-project",
    storageBucket: "my-canvas-project.appspot.com",
    messagingSenderId: "298487906788",
    appId: "1:298487906788:web:969be981f0693fa4fb47f1"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
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