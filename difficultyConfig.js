export const DIFFICULTY_CONFIG = {
  1: {
    label: "Very Easy",
    houses: 3,
    maxCategories: 3,
    minClues: 4,
    maxClues: 6,

    coverage: {
      minRatio: 0.80
    },

    intent: {
      allowDirectPlacements: true,
      expectedInferenceDepth: 1
    }
  },

  2: {
    label: "Easy",
    houses: 4,
    maxCategories: 4,
    minClues: 6,
    maxClues: 8,

    coverage: {
      minRatio: 0.75
    },

    intent: {
      allowDirectPlacements: true,
      expectedInferenceDepth: 2
    }
  },

  3: {
    label: "Medium",
    houses: 4,
    maxCategories: 4,
    minClues: 7,
    maxClues: 9,

    coverage: {
      minRatio: 0.65
    },

    intent: {
      allowDirectPlacements: false,
      expectedInferenceDepth: 2
    }
  },

  4: {
    label: "Hard",
    houses: 5,
    maxCategories: 4,
    minClues: 9,
    maxClues: 11,

    coverage: {
      minRatio: 0.55
    },

    intent: {
      allowDirectPlacements: false,
      expectedInferenceDepth: 3
    }
  },

  5: {
    label: "Expert",
    houses: 5,
    maxCategories: 5,
    minClues: 10,
    maxClues: 12,

    coverage: {
      minRatio: 0.45
    },

    intent: {
      allowDirectPlacements: false,
      expectedInferenceDepth: 3
    }
  }
};
