const TIME = 500;
let counter = 0;
let succession;
let colorSuccession = [];
let highScore = localStorage.getItem("highScore");
let buttonSound;
let controlButton = document.getElementById("control-button");

for (let i = 1; i <= 4; i++) {
  document.getElementById(`color-${i}`).addEventListener("click", function () {
    checkColor(i);
  });
}

document.getElementById("high-score").innerHTML = `high score: ${highScore}`;

controlButton.addEventListener("click", function () {
  gameStart();
});

async function gameStart() {
  await delay();
  succession = 0;
  document.getElementById("game-button-container").style.display = "none";
  changeColorButtonsState("none");
  for (let color of colorSuccession) {
    buttonSound = new Audio(`./sounds/button-${color}-sound.flac`);
    buttonSound.play();
    lightColor(color);
  }
  var newColor = Math.floor(Math.random() * 4 + 1);
  colorSuccession.push(newColor);
  buttonSound = new Audio(`./sounds/button-${newColor}-sound.flac`);
  buttonSound.play();
  lightColor(newColor);
  changeColorButtonsState("auto");
}

function checkColor(idColor) {
  var wrongColor = false;
  changeColorButtonsState("none");
  if (idColor === colorSuccession[succession]) {
    buttonSound = new Audio(`./sounds/button-${idColor}-sound.flac`);
    buttonSound.play();
    lightColor(idColor);
    succession++;
  } else {
    wrongColor = true;
    gameOver();
  }
  changeColorButtonsState("auto");
  if (succession === colorSuccession.length && !wrongColor) {
    updateCounter();
    gameStart();
  }
}

function updateCounter(pts) {
  counter = pts === 0 ? pts : counter + 1;
  document.getElementById("counter").innerHTML = counter;
  if (counter > highScore) {
    localStorage.setItem("highScore", counter);
    document.getElementById(
      "high-score"
    ).innerHTML = `High Score: ${highScore}`;
  }
}

function changeColorButtonsState(state) {
  for (var i = 1; i <= 4; i++) {
    document.getElementById(`color-${i}`).style.pointerEvents = state;
  }
}

function gameOver() {
  var title = "You Lose!";
  document.getElementById("modal").style.display = "block";
  if (counter > highScore) {
    title = "new high score!";
  }
  document.getElementById("modal-title").innerHTML = title;
  document.getElementById(
    "modal-message"
  ).innerHTML = `You're score: ${counter}`;
  updateCounter(0);
  colorSuccession = [];
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
  document.getElementById("game-button-container").style.display = "flex";
}

async function lightColor(idColor) {
  document.getElementById(`color-${idColor}`).classList.add("active");
  await delay();
  document.getElementById(`color-${idColor}`).classList.remove("active");
  await delay();
}

function delay(sec = TIME) {
  return new Promise((r) => setTimeout(r, sec));
}
