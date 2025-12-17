console.log("Script.js loaded");
console.log("Puzzles available:", PUZZLES);
// Step B: Pick a puzzle to load
let currentPuzzleIndex = 0;
let currentPuzzle = PUZZLES[currentPuzzleIndex];

console.log("Current puzzle:", currentPuzzle);

function loadClues() { const cluesList = document.querySelector("#clues-list"); if (!cluesList) { console.error("Clues list element not found"); return; } cluesList.innerHTML = ""; currentPuzzle.clues.forEach(clue => { const li = document.createElement("li"); li.textContent = clue; cluesList.appendChild(li); }); }
const options = {
  color: ["", "Red", "Blue", "Green", "Yellow"],
  family: ["", "Sharma", "Gupta", "Mehta", "Iyer"],
  bbq: ["", "Yes", "No"],
  tradition: ["", "Diwali", "Pongal", "Holi", "Navratri"]
};

function populate(className, values) {
  document.querySelectorAll(`select.${className}`).forEach(select => {
    select.innerHTML = "";
    values.forEach(value => {
      const opt = document.createElement("option");
      opt.value = value;
      opt.textContent = value === "" ? "-- select --" : value;
      select.appendChild(opt);
    });
  });
}

function initGrid() {
  populate("color", options.color);
  populate("family", options.family);
  populate("bbq", options.bbq);
  populate("tradition", options.tradition);
}

function resetGrid() {
  document.querySelectorAll("select").forEach(s => s.selectedIndex = 0);
}

function checkAnswers() {
  alert("Answer checking logic comes next 🙂");
}
loadClues();
initGrid();
