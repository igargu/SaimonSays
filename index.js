const TIME = 1500;
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

async function gameStart() {
  succession = 0;
  controlButton.style.visibility = "hidden";
  changeColorButtonsState("none");
  colorSuccession.forEach(async (value) => {
    lightUpColor(value);
    await new Promise((r) => setTimeout(r, TIME));
    lightOffColor(value);
  });
  var newColor = Math.floor(Math.random() * 4 + 1);
  colorSuccession.push(newColor);
  lightUpColor(newColor);
  await new Promise((r) => setTimeout(r, TIME));
  lightOffColor(newColor);
  changeColorButtonsState("auto");
}

async function checkColor(idColor) {
  changeColorButtonsState("none");
  if (idColor === colorSuccession[succession]) {
    lightUpColor(idColor);
    await new Promise((r) => setTimeout(r, TIME - 500));
    lightOffColor(idColor);
    succession++;
  } else {
    gameOver();
  }
  if (succession === colorSuccession.length) {
    await new Promise((r) => setTimeout(r, TIME));
    incrementCounter();
    gameStart();
  }
  changeColorButtonsState("auto");
}

function lightUpColor(idColor) {
  document.getElementById(`color-${idColor}`).classList.add("active");
}

function lightOffColor(idColor) {
  document.getElementById(`color-${idColor}`).classList.remove("active");
}

function incrementCounter() {
  counter++;
  document.getElementById("counter").innerHTML = counter;
}

function changeColorButtonsState(state) {
  for (var i = 1; i <= 4; i++) {
    document.getElementById(`color-${i}`).style.pointerEvents = state;
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
