let mobilenet;
let img;
let input;

function modelReady() {
  console.log('Model is ready!!!');
}

function imageReady() {
  image(img, 0, 0, width, height);
  mobilenet.predict(img, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
  } else {
    console.log(results);
    createDiv(`Label: ${results[0].label}`);
    createDiv(`Confidence: ${nf(results[0].confidence, 0, 2)}`);
  }
}

function setup() {
  createCanvas(400, 400);
  input = createInput();
  input.position(20, 20);
  let button = createButton('submit');
  button.position(input.x + input.width, 20);
  button.mousePressed(loadImageFromInput);
  mobilenet = ml5.imageClassifier('MobileNet', modelReady);
}

function loadImageFromInput() {
  let url = input.value();
  img = createImg("images/"+url+".png", imageReady);
  img.hide();
}
