let counter = 0;
let succession;
const colorSuccession = [];

let controlButton = document.getElementById("control-button");

document.getElementById("color-1").addEventListener("click", function () {
  checkColor(1);
});
document.getElementById("color-2").addEventListener("click", function () {
  checkColor(2);
});
document.getElementById("color-3").addEventListener("click", function () {
  checkColor(3);
});
document.getElementById("color-4").addEventListener("click", function () {
  checkColor(4);
});

controlButton.addEventListener("click", function () {
  gameStart();
});

function gameStart() {
  succession = 0;
  controlButton.style.visibility = "hidden";
  changeColorButtonsState(false);
  colorSuccession.forEach(function (value) {
    showColor(value);
  });
  var newColor = Math.floor(Math.random() * 4 + 1);
  colorSuccession.push(newColor);
  showColor(newColor);
  console.log(succession);
  changeColorButtonsState(true);
}

function checkColor(idColor) {
  if (idColor === colorSuccession[succession]) {
    showColor(idColor);
    succession++;
  } else {
    gameOver();
  }
  if (succession === colorSuccession.length) {
    incrementCounter();
    gameStart();
  }
}

function showColor(idColor) {
  var color = document.getElementById(`color-${idColor}`);
  color.classList.add("active");
  setTimeout(function () {
    color.classList.remove("active");
  }, 3000);
}

function incrementCounter() {
  counter++;
  document.getElementById("counter").innerHTML = counter;
}

function changeColorButtonsState(state) {
  for (var i = 1; i <= 4; i++) {
    document.getElementById(`color-${i}`).onclick = state;
  }
}

function gameOver() {
  console.log("You lose");
  // Show modal: "You lose! Record: ${counter}"
  // Disabled DOM under modal
  // When close modal {
  //    Restart counter
  //    Empty array
  controlButton.style.visibility = "visible";
}
