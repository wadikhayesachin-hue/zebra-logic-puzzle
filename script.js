import { PUZZLES } from "./puzzle.js";
import { validatePuzzle } from "./puzzleValidator.js";
import { createGrid } from "./grid.js";

/* =========================
   DIFFICULTY META
========================= */
const PUZZLES_BY_LEVEL = {};
PUZZLES.forEach(p => {
  if (!PUZZLES_BY_LEVEL[p.level]) {
    PUZZLES_BY_LEVEL[p.level] = [];
  }
  PUZZLES_BY_LEVEL[p.level].push(p);
});

const DIFFICULTY_LABELS = {
  1: "Very Easy",
  2: "Easy",
  3: "Medium",
  4: "Hard",
  5: "Expert"
};

const DIFFICULTY_ORIENTATION = {
  1: "Start with direct clues and simple eliminations.",
  2: "Some clues depend on earlier deductions.",
  3: "You’ll need to combine multiple clues together.",
  4: "Clues interact heavily — take it slow.",
  5: "Expert-level reasoning. No hints available."
};

/* =========================
   GAME CONFIG
========================= */

const TIME_LIMITS = {
  1: 3 * 60,
  2: 6 * 60,
  3: 10 * 60,
  4: 15 * 60,
  5: 25 * 60
};

/* =========================
   GLOBAL STATE
========================= */

let currentPuzzleIndex = 0;
let currentPuzzle = null;
let grid = null;
let currentLevel = 1;
let currentPuzzleIndexInLevel = 0;

let puzzleSolved = false;
let timerInterval = null;
let elapsedSeconds = 0;

/* =========================
   INITIAL VALIDATION
========================= */

PUZZLES.forEach(puzzle => validatePuzzle(puzzle));

/* =========================
   CORE FLOW
========================= */
function loadCurrentPuzzle() {
  const puzzles = PUZZLES_BY_LEVEL[currentLevel];
  currentPuzzle = puzzles[currentPuzzleIndexInLevel];

  if (!currentPuzzle) return;

  grid = createGrid(currentPuzzle);
  puzzleSolved = false;
  elapsedSeconds = 0;

  updatePuzzleOrientation();
  buildGrid();
  populateDropdowns();
  loadClues();
  clearLiveWarning();
  showPuzzleStatus("Solve the puzzle using the clues.");

  enableGrid(true);
  startTimer();
}


function initGame() {
  loadCurrentPuzzle();
}

/* =========================
   GRID RENDERING
========================= */

function buildGrid() {
  const tbody = document.querySelector("#puzzle-grid tbody");
  const header = document.querySelector("#puzzle-grid thead tr");

  tbody.innerHTML = "";
  header.innerHTML = "<th></th>";

  for (let i = 1; i <= currentPuzzle.houses; i++) {
    const th = document.createElement("th");
    th.textContent = `House ${i}`;
    header.appendChild(th);
  }

  Object.keys(currentPuzzle.categories).forEach(category => {
    const tr = document.createElement("tr");

    const th = document.createElement("th");
    th.textContent = category;
    tr.appendChild(th);

    for (let i = 0; i < currentPuzzle.houses; i++) {
      const td = document.createElement("td");
      const select = document.createElement("select");
      select.className = category.toLowerCase();
      select.addEventListener("change", handleLiveCheck);
      td.appendChild(select);
      tr.appendChild(td);
    }

    tbody.appendChild(tr);
  });
}

function populateDropdowns() {
  Object.entries(currentPuzzle.categories).forEach(([category, values]) => {
    document
      .querySelectorAll(`select.${category.toLowerCase()}`)
      .forEach(select => {
        select.innerHTML = `<option value="">-- select --</option>`;
        values.forEach(v => {
          const opt = document.createElement("option");
          opt.value = v;
          opt.textContent = v;
          select.appendChild(opt);
        });
      });
  });
}

/* =========================
   CLUES
========================= */

function loadClues() {
  const ul = document.getElementById("clues-list");
  ul.innerHTML = "";

  currentPuzzle.clues.forEach(clue => {
    const li = document.createElement("li");
    li.textContent = formatClue(clue);
    ul.appendChild(li);
  });
}

function formatClue(clue) {
  switch (clue.type) {
    case "EQUAL":
      return `${clue.left.value} is associated with ${clue.right.value}.`;
    case "NOT_EQUAL":
      return `${clue.left.value} is not associated with ${clue.right.value}.`;
    case "RELATIVE_POSITION":
      return formatRelative(clue);
    default:
      return "Clue unavailable.";
  }
}

function formatRelative(clue) {
  const l = clue.left.value;
  const r = clue.right.value;

  switch (clue.relation) {
    case "LEFT_OF": return `${l} is somewhere to the left of ${r}.`;
    case "RIGHT_OF": return `${l} is somewhere to the right of ${r}.`;
    case "IMMEDIATELY_BEFORE": return `${l} is immediately before ${r}.`;
    case "ADJACENT": return `${l} is next to ${r}.`;
    default: return "Relative position clue.";
  }
}

/* =========================
   TIMER (TRACKING ONLY)
========================= */

function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    elapsedSeconds++;
    updateTimer();
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function updateTimer() {
  const el = document.getElementById("timer");
  const min = Math.floor(elapsedSeconds / 60);
  const sec = elapsedSeconds % 60;
  el.textContent = `Time: ${min}:${sec.toString().padStart(2, "0")}`;
}

/* =========================
   ANSWER CHECK
========================= */

function checkAnswers() {
  const solution = currentPuzzle.solution;
  const rows = document.querySelectorAll("#puzzle-grid tbody tr");

  let correct = 0;
  let filled = 0;

  rows.forEach(row => {
    const category = row.firstChild.textContent.trim();

    for (let h = 1; h <= currentPuzzle.houses; h++) {
      const select = row.children[h].querySelector("select");
      const value = select.value;
      select.style.backgroundColor = "";

      if (!value) continue;
      filled++;

      if (value === solution[`House${h}`][category]) {
        select.style.backgroundColor = "#d4edda";
        correct++;
      } else {
        select.style.backgroundColor = "#f8d7da";
      }
    }
  });

  if (filled === 0) return;

  if (correct === filled) {
    puzzleSolved = true;
    stopTimer();
    enableGrid(false);
    showCompletionPanel("Puzzle Completed", "Solved using logical deduction.");
  }
}

/* =========================
   LIVE CONTRADICTION CHECK
========================= */

function handleLiveCheck() {
  if (puzzleSolved) return;

  const rows = document.querySelectorAll("#puzzle-grid tbody tr");
  let warnings = [];

  rows.forEach(row => {
    const category = row.firstChild.textContent.trim();
    const seen = {};

    row.querySelectorAll("select").forEach(sel => {
      sel.style.backgroundColor = "";
      if (!sel.value) return;

      if (seen[sel.value]) {
        warnings.push(`"${sel.value}" appears twice in ${category}.`);
        sel.style.backgroundColor = "#f8d7da";
        seen[sel.value].style.backgroundColor = "#f8d7da";
      } else {
        seen[sel.value] = sel;
      }
    });
  });

  if (warnings.length) {
    showLiveWarning(warnings.join("<br>"));
  } else {
    clearLiveWarning();
  }
}

/* =========================
   UI HELPERS
========================= */

function enableGrid(enable) {
  document.querySelectorAll("select").forEach(s => s.disabled = !enable);
}

function showPuzzleStatus(msg) {
  document.getElementById("puzzle-status").textContent = msg;
}

function showLiveWarning(msg) {
  document.getElementById("live-warning").innerHTML = msg;
}

function clearLiveWarning() {
  document.getElementById("live-warning").textContent = "";
}

function updatePuzzleOrientation() {
  document.getElementById("puzzle-title").textContent =
    `${currentPuzzle.title} — Level ${currentPuzzle.level} (${DIFFICULTY_LABELS[currentPuzzle.level]})`;

  document.getElementById("puzzle-orientation").textContent =
    DIFFICULTY_ORIENTATION[currentPuzzle.level];
}

/* =========================
   NAVIGATION
========================= */
function nextPuzzle() {
  const puzzles = PUZZLES_BY_LEVEL[currentLevel];

  // If another puzzle exists at this level
  if (currentPuzzleIndexInLevel < puzzles.length - 1) {
    showPuzzleStatus(
      "You’ve completed this puzzle. Another puzzle at this level is available."
    );
    currentPuzzleIndexInLevel++;
    initGame();
    return;
  }

  // No more puzzles at this level
  showCompletionPanel(
    "Level Completed",
    "You’ve completed the available puzzle for this level. Come back later for more."
  );
}

function goToLevelSelect() {
  window.location.href = "index.html";
}

function giveHint() {
  showPuzzleStatus("Hints are not available for this puzzle.");
}

/* =========================
   COMPLETION PANEL
========================= */

function showCompletionPanel(title, message) {
  document.getElementById("completion-title").textContent = title;
  document.getElementById("completion-message").textContent = message;
  document.getElementById("completion-panel").style.display = "block";
}

function hideCompletionPanel() {
  document.getElementById("completion-panel").style.display = "none";
}

/* =========================
   EXPORT TO HTML
========================= */

window.checkAnswers = checkAnswers;
window.goToLevelSelect = goToLevelSelect;
window.resetGrid = initGame;
window.nextPuzzle = nextPuzzle;
window.giveHint = giveHint;
window.retryPuzzle = () => {
  hideCompletionPanel();
  initGame();
};

/* =========================
   START
========================= */

initGame();
