// solver.js
// This file contains ONLY logical inference rules.
// No UI, no validation, no rendering.


// --------------------------------------------------
// RELATIVE POSITION
// --------------------------------------------------
// Example: A IMMEDIATELY_BEFORE B
// A cannot be in last house
// B cannot be in first house
// --------------------------------------------------

export function applyRelativePosition(constraint, puzzle, grid) {
  const { left, right, relation } = constraint;
  const N = puzzle.houses;

  switch (relation) {

    case "IMMEDIATELY_BEFORE":
      // B cannot be in the first house
      grid.eliminate(
        right,
        1,
        {
          type: "RELATIVE_POSITION",
          strength: "SOFT",
          explanation: `${left.value} must be immediately before ${right.value}, so ${right.value} cannot be in the first house`
        }
      );

      // A cannot be in the last house
      grid.eliminate(
        left,
        N,
        {
          type: "RELATIVE_POSITION",
          strength: "SOFT",
          explanation: `${left.value} must be immediately before ${right.value}, so ${left.value} cannot be in the last house`
        }
      );
      break;


    case "LEFT_OF":
      // A is somewhere left of B (not necessarily adjacent)
      grid.eliminate(
        left,
        N,
        {
          type: "RELATIVE_POSITION",
          strength: "SOFT",
          explanation: `${left.value} must be left of ${right.value}, so it cannot be in the last house`
        }
      );

      grid.eliminate(
        right,
        1,
        {
          type: "RELATIVE_POSITION",
          strength: "SOFT",
          explanation: `${left.value} must be left of ${right.value}, so ${right.value} cannot be in the first house`
        }
      );
      break;


    case "RIGHT_OF":
      // A is somewhere right of B
      grid.eliminate(
        left,
        1,
        {
          type: "RELATIVE_POSITION",
          strength: "SOFT",
          explanation: `${left.value} must be right of ${right.value}, so it cannot be in the first house`
        }
      );

      grid.eliminate(
        right,
        N,
        {
          type: "RELATIVE_POSITION",
          strength: "SOFT",
          explanation: `${left.value} must be right of ${right.value}, so ${right.value} cannot be in the last house`
        }
      );
      break;


    case "ADJACENT":
      // Adjacency deductions require one side to be fixed
      // We intentionally skip this for now
      break;
  }
}


// --------------------------------------------------
// EQUAL
// --------------------------------------------------
// If A is eliminated from a house,
// B must also be eliminated from that house
// --------------------------------------------------

export function applyEqual(constraint, puzzle, grid) {
  const { left, right } = constraint;
  const N = puzzle.houses;

  for (let house = 1; house <= N; house++) {

    if (grid.isEliminated(left, house)) {
      grid.eliminate(
        right,
        house,
        {
          type: "EQUAL",
          strength: "SOFT",
          explanation: `${left.value} and ${right.value} belong together, so ${right.value} cannot be here`
        }
      );
    }

    if (grid.isEliminated(right, house)) {
      grid.eliminate(
        left,
        house,
        {
          type: "EQUAL",
          strength: "SOFT",
          explanation: `${left.value} and ${right.value} belong together, so ${left.value} cannot be here`
        }
      );
    }
  }
}


// --------------------------------------------------
// NOT EQUAL
// --------------------------------------------------
// If A is fixed in a house,
// B cannot be in that same house
// --------------------------------------------------

export function applyNotEqual(constraint, puzzle, grid) {
  const { left, right } = constraint;

  const leftHouse = grid.getFixedHouse(left);
  const rightHouse = grid.getFixedHouse(right);

  if (leftHouse !== null) {
    grid.eliminate(
      right,
      leftHouse,
      {
        type: "NOT_EQUAL",
        strength: "SOFT",
        explanation: `${left.value} and ${right.value} cannot be in the same house`
      }
    );
  }

  if (rightHouse !== null) {
    grid.eliminate(
      left,
      rightHouse,
      {
        type: "NOT_EQUAL",
        strength: "SOFT",
        explanation: `${left.value} and ${right.value} cannot be in the same house`
      }
    );
  }
}


// --------------------------------------------------
// UNIQUENESS (one value per house per category)
// --------------------------------------------------
// If a value can go in only one house,
// then all other values of that category
// are eliminated from that house
// --------------------------------------------------

export function applyUniqueness(puzzle, grid) {
  const N = puzzle.houses;

  Object.entries(puzzle.categories).forEach(([category, values]) => {

    values.forEach(value => {
      const ref = { category, value };
      const possibleHouses = [];

      for (let house = 1; house <= N; house++) {
        if (!grid.isEliminated(ref, house)) {
          possibleHouses.push(house);
        }
      }

      // Only one possible house → forced placement
      if (possibleHouses.length === 1) {
        const fixedHouse = possibleHouses[0];

        values.forEach(otherValue => {
          if (otherValue !== value) {
            grid.eliminate(
              { category, value: otherValue },
              fixedHouse,
              {
                type: "UNIQUENESS",
                strength: "MEDIUM",
                explanation: `${value} must be in this house, so ${otherValue} cannot`
              }
            );
          }
        });
      }
    });

  });
}
