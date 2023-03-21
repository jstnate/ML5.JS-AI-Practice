let classifier;
let example;
let input;

function modelReady() {
  console.log('Model is ready!!!');
  classifier.predict(example, gotResults);
}

function gotResults(error, results) {
  console.log('Got results!!!');
  if (error) {
    console.error(error);
  } else {
    console.log(results);
    let label = results[0].label;
    let prob = results[0].confidence;
    fill(0);
    textSize(64);
    createP(label);
    createP(Math.floor(prob * 100) + '%');
  }
}

function imageReady() {
  console.log('Image is ready!!!');
  image(example, 0, 0, width, height);
}

function handleFile(file) {
  print(file);
  if (file.type === 'image') {
    example = createImg(file.data, '', imageReady);
    example.hide();
    background(0);
    classifier.predict(example, gotResults);
  } else {
    example = null;
    console.log('Please upload an image file.');
  }
}

function setup() {
  createCanvas(640, 480);
  input = createFileInput(handleFile);
  input.position(0, height + 200);
  example = createImg('', imageReady);
  example.hide();
  background(0);
  classifier = ml5.imageClassifier('MobileNet', modelReady);
}
