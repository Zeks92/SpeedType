//Globals var
const levels = {
  easy: 4,
  medium: 3,
  hard: 2
};

//default is easy
let currentLevel = levels[localStorage.getItem('defaultLevel')] || levels.easy;
let time;
let score = 0;
let isPlaying;
let stopped;
let cd;
let gamesCounter = 0;

const wordInput = document.querySelector("#word-input");
const currentWord = document.querySelector("#current-word");
const scoreDisplay = document.querySelector("#score");
const timeDisplay = document.querySelector("#time");
const message = document.querySelector("#message");
const seconds = document.querySelector("#seconds");
const startGameBtn = document.querySelector("#startGameBtn");
const stopGameBtn = document.querySelector("#stopGameBtn");
const chooseLevel = document.querySelector("#chooseLevel");
const bestScoreModal = document.querySelector("#bestScoreModal");
const bestscore = document.querySelector("#bestScore");
const bestscoreEm = document.querySelector("#bestscoreEm");
const bestScoreModalBody = document.querySelector("#bestScoreModalBody");
const yourScoresModal = document.querySelector("#yourScoresModal");
const yourScoresTbody = document.querySelector("#yourScoresTbody");
const words = [
 /*
 Database of 100words 
 */
  "hat",
  "river",
  "lucky",
  "statue",
  "generate",
  "stubborn",
  "cocktail",
  "runaway",
  "joke",
  "developer",
  "establishment",
  "hero",
  "javascript",
  "nutrition",
  "revolver",
  "echo",
  "siblings",
  "investigate",
  "horrendous",
  "symptom",
  "laughter",
  "magic",
  "master",
  "space",
  "definition",
  "development",
  "internet",
  "practice",
  "joke",
  "masterpiece",
  "ordinary",
  "huge",
  "paste",
  "knowledge",
  "general",
  "baseline",
  "thunderstorm",
  "party",
  "sleeping",
  "basement",
  "chemistry",
  "way",
  "mathematics",
  "solo",
  "understand",
  "miserable",
  "browser",
  "mythology",
  "enormous",
  "pathetic",
  "super",
  "dinosaur",
  "beach",
  "shark",
  "outrageous",
  "synthetic",
  "spider",
  "amusement",
  "unforgiven",
  "copy",
  "kitchen",
  "stewardess",
  "casino",
  "smoking",
  "great",
  "production",
  "screenplay",
  "flight",
  "island",
  "bowling",
  "piece",
  "intresting",
  "bottom",
  "commander",
  "operation",
  "hospital",
  "battleship",
  "arrested",
  "travelling",
  "mountain",
  "administrator",
  "beautiful",
  "job",
  "director",
  "actresses",
  "expedition",
  "discovery",
  "heat",
  "earth",
  "thinker",
  "journalizing",
  "immobilizing",
  "predictable",
  "core",
  "accessibility",
  "clarification",
  "teeth",
  "inconvinience",
  "nitroglycerine",
  "overwhelmingly",
  "unconditionally"
];

//bestScore
bestscore.innerHTML = localStorage.getItem("bestScore") || 0;
//Change level listener
chooseLevel.addEventListener("change", changeLevel);
//Start game
startGameBtn.addEventListener("click", init);
//Stop game
stopGameBtn.addEventListener("click", stopGame);
//Input starts
wordInput.addEventListener('input', clearMessage);
//Initialize seconds
seconds.innerHTML = currentLevel;
//initialize level
chooseLevel.value = localStorage.getItem('defaultLevel') || 'easy';

function changeLevel() {
  //update values
  currentLevel = levels[chooseLevel.value];
  seconds.innerHTML = currentLevel;
  time = currentLevel;
  //set in local storage
  localStorage.setItem('defaultLevel', chooseLevel.value);
}
//Initialize Game
function init() {
  message.innerHTML = "";
  //assign time
  time = currentLevel;
  //game started
  stopped = false;
  //hide start button
  startGameBtn.classList.add("d-none");
  //show stop btn
  stopGameBtn.classList.remove("d-none");
  //choose level-disbled
  chooseLevel.disabled = true;
  //random word
  showWord(words);
  //Match word on input
  wordInput.addEventListener("input", startMatch);
  //Countdown
  cd = setInterval(countDown, 1000);
  //Check game status
  setInterval(checkStatus, 50);
}

function startMatch() {
  if (!stopped) {
    if (matchWords()) {
      isPlaying = true;
      time = currentLevel + 1;
      showWord(words);
      wordInput.value = "";
      score++;
    }
    if (score === -1) scoreDisplay.innerHTML = 0;
    else scoreDisplay.innerHTML = score;
  }
}

function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    message.innerHTML = "Correct";
    message.style.color = "green";
    return true;
  } else {
    return false;
  }
}

function showWord(words) {
  const randIndex = Math.floor(Math.random() * words.length);
  currentWord.innerHTML = words[randIndex];
}

function countDown() {
  if (!stopped) {
    if (time > 0) {
      time--;
    } else if (time === 0) {
      gamesCounter++;
      addNewScore(score);

      if (score > localStorage.getItem("bestScore")) {
        newBestScore();
      }
      $(stopGameBtn).trigger("click");
      message.innerHTML = "";
      isPlaying = false;
    }
    timeDisplay.innerHTML = time;
  }
}

function checkStatus() {
  if (!stopped) {
    if (!isPlaying && time === 0) {
      message.innerHTML = "Game Over";
      message.style.color = "red";
      score = -1;
    }
  }
}

function stopGame() {
  stopGameBtn.classList.add("d-none");
  startGameBtn.classList.remove("d-none");
  clearMessage();
  //enable choose level
  chooseLevel.disabled = false;
  stopped = true;
  gamesCounter++;
  addNewScore(score);
  if (score > localStorage.getItem("bestScore")) {
    newBestScore();
  }
  //reset score
  score = 0;
  scoreDisplay.innerHTML = 0;
  //reset time
  clearInterval(cd);
}

function newBestScore() {
  //set new best score
  localStorage.setItem("bestScore", score);
  $(bestScoreModal).modal("toggle");
  bestscoreEm.innerHTML = score;
  bestscore.innerHTML = score;
}

function addNewScore(score) {
  //first col
  let tr = document.createElement("tr");
  let td = document.createElement("td");
  let content = document.createTextNode(gamesCounter);
  td.appendChild(content);
  tr.appendChild(td);
  //second col
  td = document.createElement("td");
  content = document.createTextNode(score);
  td.appendChild(content);
  tr.appendChild(td);
  yourScoresTbody.prepend(tr);
}

function clearMessage() {
  message.innerHTML = '';
}