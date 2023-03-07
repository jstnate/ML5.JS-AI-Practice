// Style Transfer with ml5.js Example

// Create a new Style Transfer Instance
const style = ml5.styleTransfer('data/myModel/', modelLoaded);

// When the model is loaded
function modelLoaded() {
  console.log('Model Loaded!');
}
// Grab a img element and generate a new image.
style.transfer(document.getElementById("img"), function(error, result) {
  img.src = result.src;
});

imagestock = document.getElementById("image-stock");

const formulaire = document.getElementById('mon-formulaire');
formulaire.addEventListener('submit', (event) => {
  event.preventDefault();
  const fichier = document.getElementById('fichier').files[0];
  const reader = new FileReader();

  reader.addEventListener('load', (event) => {
    const image = new Image();
    image.src = event.target.result;
    console.log(fichier)
    imagestock.src = event.target.result;
  });

  reader.readAsDataURL(fichier);
});