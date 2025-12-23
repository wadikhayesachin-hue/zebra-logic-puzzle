console.log("Script.js loaded");
console.log("Puzzles available:", PUZZLES);

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

let currentPuzzleIndex = 0;
let currentPuzzle = PUZZLES[currentPuzzleIndex];
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

function loadClues() {
  const cluesList = document.querySelector("#clues-list");
  cluesList.innerHTML = "";

  currentPuzzle.clues.forEach(clue => {
    const li = document.createElement("li");
    li.textContent = clue;
    cluesList.appendChild(li);
  });
}

/* -------------------------
   HELPERS
-------------------------- */

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
function giveHint() {
  if (puzzleSolved) return;

  if (hintsUsed >= MAX_HINTS) {
    showPuzzleStatus("No more hints available for this puzzle.");
    return;
  }

  if (!currentPuzzle.eliminations || currentPuzzle.eliminations.length === 0) {
    showPuzzleStatus("No hints available for this puzzle.");
    return;
  }

  // Find the first unused, applicable elimination
  const hint = currentPuzzle.eliminations.find(e => {
    const key = `${e.category}-${e.value}-${e.house}`;
    if (usedEliminations.includes(key)) return false;

    const row = findRowByCategory(e.category);
    if (!row) return false;

    const select = row.children[e.house].querySelector("select");
    if (!select) return false;

    // Only give hint if user hasn't already filled something there
    return select.value === "";
  });

  if (!hint) {
    showPuzzleStatus("No safe hint available at this stage.");
    return;
  }

  applyEliminationHint(hint);

  hintsUsed++;
  usedEliminations.push(`${hint.category}-${hint.value}-${hint.house}`);
  updateHintButton();

 const hintText =
  `Hint ${hintsUsed}: "${hint.value}" cannot be in House #${hint.house} (${hint.category}).`;

shownHints.push(hintText);
renderHints();
function renderHints() {
  const container = document.getElementById("hints-list");
  if (!container) return;

  container.innerHTML = "";

  shownHints.forEach(text => {
    const div = document.createElement("div");
    div.textContent = text;
    container.appendChild(div);
  });
}
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
