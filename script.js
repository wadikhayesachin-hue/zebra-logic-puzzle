console.log("Script.js loaded");
console.log("Puzzles available:", PUZZLES);
import { PUZZLES } from "./puzzle.js";
import { validatePuzzle } from "./puzzleValidator.js";

import { createGrid } from "./grid.js";
import {
  applyRelativePosition,
  applyEqual,
  applyNotEqual,
  applyUniqueness
} from "./solver.js";
let selectedHints = [];
let hintIndex = 0;

const selectedLevel =
  Number(localStorage.getItem("selectedDifficulty")) || 1;

PUZZLES.forEach(puzzle => {
  validatePuzzle(puzzle);
});

/* -------------------------
   GAME CONFIGURATION
-------------------------- */

const TIME_LIMITS = {
  1: 3 * 60,   // Very Easy
  2: 6 * 60,   // Easy
  3: 10 * 60,  // Medium
  4: 15 * 60,  // Hard
  5: 25 * 60   // Expert
};

/* -------------------------
   GLOBAL STATE
-------------------------- */

const FILTERED_PUZZLES = PUZZLES.filter(
  p => p.level === selectedLevel
);

let currentPuzzleIndex = 0;
let currentPuzzle = FILTERED_PUZZLES[currentPuzzleIndex];
currentPuzzle = PUZZLES.find(p => p.id === "L2-P2");

console.log("Current puzzle:", currentPuzzle.id);
// TEMP: verify solver output for solver-ready puzzles only
PUZZLES.forEach(puzzle => {

  if (!isSolverReady(puzzle)) {
    console.log(`Solver skipped for ${puzzle.id} (not solver-ready)`);
    return;
  }

  const grid = createGrid(puzzle);
  let changed;

  do {
    grid.resetChangeCount();

    puzzle.clues.forEach(clue => {

      if (clue.type === "EQUAL") {
        applyEqual(clue, puzzle, grid);
      }

      if (clue.type === "NOT_EQUAL") {
        applyNotEqual(clue, puzzle, grid);
      }

      if (clue.type === "RELATIVE_POSITION") {
        applyRelativePosition(clue, puzzle, grid);
      }

    });

    applyUniqueness(puzzle, grid);

    changed = grid.getChangeCount() > 0;

  } while (changed);

  console.log(
    `Solver result for ${puzzle.id}:`,
    grid.getEliminations()
  );
});


// Initialize grid for this puzzle
// Initialize grid
const grid = createGrid(currentPuzzle);

// Run solver until stable
let changed;

if (isSolverReady(currentPuzzle)) {

  do {
    grid.resetChangeCount();

    currentPuzzle.clues.forEach(clue => {

      if (clue.type === "EQUAL") {
        applyEqual(clue, currentPuzzle, grid);
      }

      if (clue.type === "NOT_EQUAL") {
        applyNotEqual(clue, currentPuzzle, grid);
      }

      if (clue.type === "RELATIVE_POSITION") {
        applyRelativePosition(clue, currentPuzzle, grid);
      }

    });

    applyUniqueness(currentPuzzle, grid);

    changed = grid.getChangeCount() > 0;

  } while (changed);

  console.log("Final solver eliminations:", grid.getEliminations());

} else {
  console.log(
    `Solver skipped for ${currentPuzzle.id} (not solver-ready)`
  );
}




// Inspect final solver output
console.log("Final solver eliminations:", grid.getEliminations());


// TEMP: log solver-derived eliminations
console.log(
  "Solver eliminations:",
  grid.getEliminations()
);
// Compare solver vs manual eliminations
const manual = currentPuzzle.eliminations || [];
const solver = grid.getEliminations();

// Solver eliminations that already exist manually
const matched = solver.filter(s =>
  manual.some(m =>
    m.category === s.category &&
    m.value === s.value &&
    m.house === s.house
  )
);

// Solver eliminations that are NEW
const missing = solver.filter(s =>
  !manual.some(m =>
    m.category === s.category &&
    m.value === s.value &&
    m.house === s.house
  )
);
// Build exactly 3 hints from solver output
const hintGroups = grid.getHintsByStrength();

selectedHints = [];
hintIndex = 0;

if (hintGroups.SOFT.length) {
  selectedHints.push(hintGroups.SOFT[0]);
}
if (hintGroups.MEDIUM.length) {
  selectedHints.push(hintGroups.MEDIUM[0]);
}
if (hintGroups.STRONG.length) {
  selectedHints.push(hintGroups.STRONG[0]);
}

console.log("Selected hints:", selectedHints);
console.log("Matched eliminations:", matched);
console.log("New solver eliminations:", missing);

let puzzleSolved = false;

let timerInterval = null;
let remainingTime = 0;
let hintsUsed = 0;
const MAX_HINTS = 3;
let usedEliminations = [];
let shownHints = [];
/* -------------------------
   BUILD GRID DYNAMICALLY
-------------------------- */

function buildGrid() {
  const table = document.querySelector("#puzzle-grid tbody");
  const headerRow = document.querySelector("#puzzle-grid thead tr");

  table.innerHTML = "";
  headerRow.innerHTML = "<th></th>";

  for (let i = 1; i <= currentPuzzle.houses; i++) {
    const th = document.createElement("th");
    th.textContent = `House #${i}`;
    headerRow.appendChild(th);
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
      td.appendChild(select);
      tr.appendChild(td);
    }

    table.appendChild(tr);
  });
}

/* -------------------------
   DROPDOWNS
-------------------------- */

function populateDropdowns() {
  Object.entries(currentPuzzle.categories).forEach(([category, values]) => {
    document
      .querySelectorAll(`select.${category.toLowerCase()}`)
      .forEach(select => {
        select.innerHTML = `<option value="">-- select --</option>`;
        values.forEach(value => {
          const option = document.createElement("option");
          option.value = value;
          option.textContent = value;
          select.appendChild(option);
        });
        select.addEventListener("change", handleLiveCheck);
      });
  });
}

/* -------------------------
   CLUES
-------------------------- */
function renderClue(clue) {
  // Old puzzles (string clues)
  if (typeof clue === "string") {
    return clue;
  }

  // Structured clues (new automation-ready format)
  if (clue.type === "NOT_EQUAL") {
    return `${clue.left.value} does not have ${clue.right.value}.`;
  }

  if (clue.type === "EQUAL") {
    return `${clue.left.value} is associated with ${clue.right.value}.`;
  }

  // Fallback (safety)
  return "Unknown clue format.";
}

function loadClues() {
  const cluesList = document.querySelector("#clues-list");
  cluesList.innerHTML = "";

  currentPuzzle.clues.forEach(clue => {
    const li = document.createElement("li");
   li.textContent = renderClue(clue);
    cluesList.appendChild(li);
  });
}

/* -------------------------
   HELPERS
-------------------------- */
function isSolverReady(puzzle) {
  return puzzle.clues.every(clue => typeof clue === "object");
}
function resetGrid() {
  // Show confirmation only if reset is late
  if (isLateReset()) {
    const confirmReset = confirm(
      "You’ve spent some time on this puzzle.\n" +
      "Resetting will clear your progress.\n\n" +
      "Do you want to continue?"
    );

    if (!confirmReset) return;
  }

  // Perform the actual reset
  document.querySelectorAll("select").forEach(select => {
    select.selectedIndex = 0;
    select.style.backgroundColor = "";
    select.disabled = false;
  });

  clearLiveWarning();
  showPuzzleStatus("Solve the puzzle using the clues.");
}

function isLateReset() {
  const totalTime = TIME_LIMITS[currentPuzzle.level];
  if (!totalTime) return false;

  // Guard: timer not started or just initialized
  if (remainingTime === 0 || remainingTime === totalTime) return false;

  const timeUsed = totalTime - remainingTime;
  return timeUsed / totalTime >= 0.4; // 40% threshold
}


function enableGrid(enable) {
  document.querySelectorAll("select").forEach(select => {
    select.disabled = !enable;
  });
}

function showPuzzleStatus(message) {
  document.getElementById("puzzle-status").textContent = message;
}

function showLiveWarning(message) {
  document.getElementById("live-warning").innerHTML = message;
}


function clearLiveWarning() {
  document.getElementById("live-warning").textContent = "";
}
function clearHints() {
  const container = document.getElementById("hints-list");
  if (container) {
    container.innerHTML = "";
  }
}
function showAttemptSummary(status) {
  const totalTime = TIME_LIMITS[currentPuzzle.level];
  const timeUsed = totalTime - remainingTime;

  let header = "";
  if (status === "solved") {
    header = "🎉 Puzzle solved!";
  } else if (status === "timeout") {
    header = "⏱ Time’s up.";
  }

  const summary =
    `${header}<br>` +
    `⏱ Time used: ${formatTime(timeUsed)}<br>` +
    `💡 Hints used: ${hintsUsed} / ${MAX_HINTS}`;

  showPuzzleStatus(summary);
}

/* -------------------------
   TIMER
-------------------------- */

function startTimer() {
  clearInterval(timerInterval);

  const limit = TIME_LIMITS[currentPuzzle.level];
  if (!limit) return;

  remainingTime = limit;
  updateTimerDisplay();

  timerInterval = setInterval(() => {
    remainingTime--;
    updateTimerDisplay();

    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      handleTimeUp();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function updateTimerDisplay() {
  const timerEl = document.getElementById("timer");
  if (!timerEl) return;

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  timerEl.textContent =
    `Time: ${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function handleTimeUp() {
  puzzleSolved = true;
  enableGrid(false);
  showPuzzleStatus("⏱ Time’s up. You can move to the next puzzle.");
  clearLiveWarning();
  showAttemptSummary("timeout");

}

/* -------------------------
   ANSWER CHECK
-------------------------- */

function checkAnswers() {
  const solution = currentPuzzle.solution;
  const rows = document.querySelectorAll("#puzzle-grid tbody tr");

  let correctCount = 0;
  let totalChecked = 0;
  let hasConstraintViolation = false;

  rows.forEach(row => {
    const category = row.firstChild.textContent.trim();
    const seenValues = {};

    for (let h = 1; h <= currentPuzzle.houses; h++) {
      const dropdown = row.children[h].querySelector("select");
      const userValue = dropdown.value;
      dropdown.style.backgroundColor = "";

      if (!userValue) continue;
      totalChecked++;

      if (seenValues[userValue]) {
        dropdown.style.backgroundColor = "#f8d7da";
        seenValues[userValue].style.backgroundColor = "#f8d7da";
        hasConstraintViolation = true;
      } else {
        seenValues[userValue] = dropdown;
      }

      const houseKey = `House${h}`;
      if (userValue === solution[houseKey][category]) {
        dropdown.style.backgroundColor = "#d4edda";
        correctCount++;
      } else if (!hasConstraintViolation) {
        dropdown.style.backgroundColor = "#f8d7da";
      }
    }
  });

  if (totalChecked === 0) return;

  if (hasConstraintViolation) {
    showPuzzleStatus("❌ Fix the contradictions before checking again.");
    return;
  }

  if (correctCount === totalChecked) {
    puzzleSolved = true;
    enableGrid(false);
    stopTimer();
    showPuzzleStatus("🎉 Puzzle solved! You may proceed to the next puzzle.");
    clearLiveWarning();
    showAttemptSummary("solved");
  }
}

/* -------------------------
   LIVE CONTRADICTION CHECK
-------------------------- */
function handleLiveCheck() {
  if (puzzleSolved) return;
  validateAllConstraints();
}
function validateAllConstraints() {
  const rows = document.querySelectorAll("#puzzle-grid tbody tr");
  let warnings = [];

  rows.forEach(row => {
    const category = row.firstChild.textContent.trim();
    const selects = row.querySelectorAll("select");

    // Clear previous styles for this row
    selects.forEach(s => {
      s.style.backgroundColor = "";
    });

    const valueMap = {};

    // Build value → selects map
    selects.forEach(select => {
      const val = select.value;
      if (!val) return;

      if (!valueMap[val]) {
        valueMap[val] = [];
      }
      valueMap[val].push(select);
    });

    // Detect duplicates
    Object.entries(valueMap).forEach(([value, group]) => {
      if (group.length > 1) {
        warnings.push(
          `Contradiction: "${value}" appears more than once in ${category}.`
        );
        group.forEach(select => {
          select.style.backgroundColor = "#f8d7da";
        });
      }
    });
  });

  // Update warning UI
  if (warnings.length > 0) {
    showLiveWarning(warnings.join("<br>"));
  } else {
    clearLiveWarning();
  }
}





/* -------------------------
   NAVIGATION
-------------------------- */

function nextPuzzle() {
  currentPuzzleIndex++;
  hintIndex = 0;
  selectedHints = [];
  document.getElementById("hints-list").innerHTML = "";

  if (currentPuzzleIndex >= PUZZLES.length) {
    currentPuzzleIndex = PUZZLES.length - 1;
    return;
  }

  currentPuzzle = PUZZLES[currentPuzzleIndex];
  initGame();
}
function updateHintButton() {
  const btn = document.getElementById("hint-btn");
  if (!btn) return;

  btn.textContent = `Hint (${MAX_HINTS - hintsUsed})`;
  btn.disabled = hintsUsed >= MAX_HINTS;
}


function applyEliminationHint(hint) {
  const row = findRowByCategory(hint.category);
  if (!row) return;

  const select = row.children[hint.house].querySelector("select");
  if (!select) return;

  // Visual cue only — no auto-selection
  select.style.backgroundColor = "#fff3cd"; // soft yellow
}
function findRowByCategory(categoryName) {
  const rows = document.querySelectorAll("#puzzle-grid tbody tr");
  for (const row of rows) {
    if (row.firstChild.textContent.trim() === categoryName) {
      return row;
    }
  }
  return null;
}
function giveHint() {
  if (hintIndex >= selectedHints.length) {
    document.getElementById("hints-list").innerHTML +=
      "<div>No more hints available.</div>";
    return;
  }

  const hint = selectedHints[hintIndex];
  hintIndex++;

  document.getElementById("hints-list").innerHTML +=
    `<div>• ${hint.reason.explanation}</div>`;
}

// Make it available to HTML
window.giveHint = giveHint;

/* -------------------------
   INIT
-------------------------- */
function initGame() {
  puzzleSolved = false;
  hintsUsed = 0;
  usedEliminations = [];
  shownHints = [];

  buildGrid();
  populateDropdowns();
  loadClues();
  resetGrid();
  clearLiveWarning();
  clearHints(); // ✅ CLEAR OLD HINTS HERE

  showPuzzleStatus("Solve the puzzle using the clues.");
  enableGrid(true);
  startTimer();
  updateHintButton();
}


initGame();
