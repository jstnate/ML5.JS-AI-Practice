// let inputImg;
// let statusMsg;
// let transferBtn;
// let style1;
// let style2;

// function setup() {
//   noCanvas();
//   // Status Msg
//   statusMsg = select('#statusMsg');

//   // Get the input image
//   inputImg = select('#inputImg');

//   // Transfer Button
//   transferBtn = select('#transferBtn')
//   transferBtn.mousePressed(transferImages);

//   // Create two Style methods with different pre-trained models
//   style1 = ml5.styleTransfer('models/wave', modelLoaded);
//   style2 = ml5.styleTransfer('models/udnie', modelLoaded);
// }

// // A function to be called when the models have loaded
// function modelLoaded() {
//   // Check if both models are loaded
//   if(style1.ready && style2.ready){
//     statusMsg.html('Ready!')
//   }
// }

// // Apply the transfer to both images!
// function transferImages() {
//   statusMsg.html('Applying Style Transfer...!');
  
//   style1.transfer(inputImg, function(err, result) {
//     createImg(result.src).parent('styleA');
//   });

//   style2.transfer(inputImg, function(err, result) {
//     createImg(result.src).parent('styleB');
//   });

//   statusMsg.html('Done!');
// }

// // const form = document.getElementsByTagName('form');

// // form.onsubmit = function(e) {
// //     e.preventDefault();
// // }

let styleInput, contentInput;
let styleImage, contentImage;
let styleTransfer;

function setup() {
  createCanvas(400, 400);
  
  // Crée des objets de téléchargement de fichiers à partir des champs HTML
  styleInput = createFileInput(handleStyleImage);
  contentInput = createFileInput(handleContentImage);
  
  // Crée un modèle de transfert de style
  styleTransfer = ml5.styleTransfer('models/starrynight', modelLoaded);
  
  // Ajoute un écouteur d'événement au bouton de conversion
  const convertButton = document.getElementById('convert-button');
  convertButton.addEventListener('click', convertImage);
}

function handleStyleImage(file) {
  // Charge l'image d'exemple sélectionnée par l'utilisateur
  styleImage = loadImage(file.data, convertImage);
}

function handleContentImage(file) {
  // Charge l'image à convertir sélectionnée par l'utilisateur
  contentImage = loadImage(file.data, convertImage);
}

function modelLoaded() {
  console.log('Le modèle de transfert de style est prêt.');
}

function convertImage() {
  if (!styleImage || !contentImage) {
    console.log('Sélectionnez une image d\'exemple et une image à convertir.');
    return;
  }

  if (!styleTransfer.ready) {
    console.log('Le modèle de transfert de style n\'est pas prêt.');
    return;
  }
  
  // Applique le style à l'image à convertir
  styleTransfer.transfer(contentImage, function(err, result) {
     // Vérifie s'il y a une erreur lors du transfert
     if (err) {
      console.log('Erreur lors du transfert de style :', err);
      return;
    }

    // Vérifie que l'objet 'result' est correctement formé
    if (!result || !result.src) {
      console.log('Objet \'result\' non valide :', result);
      return;
    }

    // Affiche l'image convertie dans le navigateur
    const resultImage = document.getElementById('result');
    resultImage.src = result.src;

    // Affiche l'URL de l'image convertie dans la console
    console.log('Image convertie :', result.src);
  });
};

