let controlButton = document.getElementById("control-button");

let counter = 0;
const colorSuccession = [];

controlButton.addEventListener("click", function () {
  gameStart();
});

function gameStart() {
  controlButton.style.display = "none";
  // Disabled color buttons
  colorSuccession.forEach(showColor(value));
  var newColor = Math.floor(Math.random() * 4 + 1);
  colorSuccession.push(newColor);
  showColor(newColor);
  // Abled color buttons
}

function checkColor(idColor) {
  if (idColor === colorSuccession[counter]) {
    showColor(idColor);
    incrementCounter();
  } else {
    gameOver();
  }
  if (counter === colorSuccession.length + 1) {
    gameStart();
  }
}

function showColor(idColor) {
  var color = document.getElementById(`color-${idColor}`);
  // Add hover
  // Wait 3 segs
  // Remove hover
}

function incrementCounter() {
  counter++;
  document.getElementById("counter").innerHTML = counter;
}

function gameOver() {
  // Show modal: "You lose! Record: ${counter}"
  // Disabled DOM under modal
  // When close modal {
  //    Restart counter
  //    Empty array
  controlButton.style.display = "block";
}
