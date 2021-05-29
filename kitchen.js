status = "";
object = [];
function preload(){
    img = loadImage("kitchen.JPG");
}
function setup(){
    canvas = createCanvas(640, 420);
    canvas.center();
    objectIdentifier = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}
function modelLoaded(){
    console.log("Model Loaded");
    status = true;
    objectIdentifier.detect(img,gotResult);
}
function gotResult(error,result){
    if(error){
        console.log(error);
    }
    else{
        console.log(result);    
        object = result;
    }
}
function draw() {
    image(img, 0, 0, 640, 420);

    if (status != "") {
        document.getElementById("status").innerHTML = "Status: Object Detected";
        for (i = 0; i < object.length; i++) {
            percentage = Math.floor(object[i].confidence * 100);
            text(object[i].label+ " " + percentage + "%", object[i].x, object[i].y);
            fill("#F50000");
            stroke("#F50000");
            noFill();
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }
}