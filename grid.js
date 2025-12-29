// grid.js
// Grid = solver state + elimination tracking

export function createGrid(puzzle) {
  const eliminations = [];
  let changeCount = 0;

  return {
    // -----------------------------------
    // Eliminate a value from a house
    // -----------------------------------
    eliminate(ref, house, reason = null) {
      const exists = eliminations.some(
        e =>
          e.category === ref.category &&
          e.value === ref.value &&
          e.house === house
      );

      if (!exists) {
        eliminations.push({
          category: ref.category,
          value: ref.value,
          house,
          reason
        });
        changeCount++;
      }
    },

    // -----------------------------------
    // Check if eliminated
    // -----------------------------------
    isEliminated(ref, house) {
      return eliminations.some(
        e =>
          e.category === ref.category &&
          e.value === ref.value &&
          e.house === house
      );
    },

    // -----------------------------------
    // If only one house remains → fixed
    // -----------------------------------
    getFixedHouse(ref) {
      const possible = [];

      for (let house = 1; house <= puzzle.houses; house++) {
        if (!this.isEliminated(ref, house)) {
          possible.push(house);
        }
      }

      return possible.length === 1 ? possible[0] : null;
    },

    // -----------------------------------
    // All eliminations
    // -----------------------------------
    getEliminations() {
      return eliminations;
    },

    // -----------------------------------
    // Solver loop helpers
    // -----------------------------------
    getChangeCount() {
      return changeCount;
    },

    resetChangeCount() {
      changeCount = 0;
    },

    // -----------------------------------
    // Hint helpers
    // -----------------------------------
    getHintsByStrength() {
      const groups = {
        SOFT: [],
        MEDIUM: [],
        STRONG: []
      };

      eliminations.forEach(e => {
        if (e.reason && groups[e.reason.strength]) {
          groups[e.reason.strength].push(e);
        }
      });

      return groups;
    }
  };
}
