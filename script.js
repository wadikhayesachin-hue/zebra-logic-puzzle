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

initGrid();
