// puzzleValidator.js
import { DIFFICULTY_CONFIG } from "./difficultyConfig.js";

/* =========================
   Constraint Schema
========================= */

const ALLOWED_CONSTRAINT_TYPES = [
  "EQUAL",
  "NOT_EQUAL",
  "POSITION",
  "RELATIVE_POSITION",
  "CONDITIONAL",
  "BETWEEN" // future-safe
];

/* =========================
   Main Puzzle Validator
========================= */

export function validatePuzzle(puzzle) {
  const rules = DIFFICULTY_CONFIG[puzzle.level];

  // 1. Check number of houses
  if (puzzle.houses !== rules.houses) {
    console.error(`${puzzle.id}: wrong house count`);
  }

  // 2. Check category count
  const categoryCount = Object.keys(puzzle.categories).length;
  if (categoryCount > rules.maxCategories) {
    console.error(`${puzzle.id}: too many categories`);
  }

  // 3. Check clue count
  if (puzzle.clues.length > rules.maxClues) {
    console.error(`${puzzle.id}: too many clues`);
  }

  // 4. Validate structured constraints
  puzzle.clues.forEach(clue => {
    if (typeof clue === "object") {
      validateConstraint(clue, puzzle);
    } else {
      throw new Error(`${puzzle.id}: string clues are not allowed`);
    }
  });

  //console.log(`✅ ${puzzle.id} validated`);
}

/* =========================
   Constraint Dispatcher
========================= */

function validateConstraint(constraint, puzzle) {
  if (!constraint.type) {
    throw new Error("Constraint missing type");
  }

  if (!ALLOWED_CONSTRAINT_TYPES.includes(constraint.type)) {
    throw new Error(`Invalid constraint type: ${constraint.type}`);
  }

  switch (constraint.type) {
    case "EQUAL":
    case "NOT_EQUAL":
      validateBinaryConstraint(constraint, puzzle);
      break;

    case "POSITION":
      validatePositionConstraint(constraint, puzzle);
      break;

    case "RELATIVE_POSITION":
      validateRelativeConstraint(constraint, puzzle);
      break;

    case "CONDITIONAL":
      validateConditionalConstraint(constraint, puzzle);
      break;

    case "BETWEEN":
      validateBetweenConstraint(constraint, puzzle);
      break;

    default:
      throw new Error(`Unhandled constraint type: ${constraint.type}`);
  }
}

/* =========================
   Constraint Type Handlers
========================= */

function validateBinaryConstraint(constraint, puzzle) {
  const { left, right } = constraint;

  if (!left || !right) {
    throw new Error("Binary constraint must have left and right");
  }

  validateCategoryValue(left, puzzle);
  validateCategoryValue(right, puzzle);
}

function validatePositionConstraint(constraint, puzzle) {
  const { target, house } = constraint;

  if (!target || house === undefined) {
    throw new Error("POSITION constraint requires target and house");
  }

  validateCategoryValue(target, puzzle);

  if (house < 1 || house > puzzle.houses) {
    throw new Error(`Invalid house number: ${house}`);
  }
}

function validateRelativeConstraint(constraint, puzzle) {
  const { left, right, relation } = constraint;

  if (!left || !right || !relation) {
    throw new Error("RELATIVE_POSITION requires left, right, and relation");
  }

  validateCategoryValue(left, puzzle);
  validateCategoryValue(right, puzzle);

  const allowedRelations = [
    "LEFT_OF",
    "RIGHT_OF",
    "ADJACENT",
    "IMMEDIATELY_BEFORE"
  ];

  if (!allowedRelations.includes(relation)) {
    throw new Error(`Invalid relation: ${relation}`);
  }
}

function validateConditionalConstraint(constraint, puzzle) {
  const { if: ifPart, then: thenPart } = constraint;

  if (!ifPart || !thenPart) {
    throw new Error("CONDITIONAL constraint requires if and then");
  }

  validateCategoryValue(ifPart, puzzle);
  validateCategoryValue(thenPart, puzzle);
}

function validateBetweenConstraint(constraint, puzzle) {
  const { middle, left, right } = constraint;

  if (!middle || !left || !right) {
    throw new Error("BETWEEN constraint requires middle, left, and right");
  }

  validateCategoryValue(middle, puzzle);
  validateCategoryValue(left, puzzle);
  validateCategoryValue(right, puzzle);
}

/* =========================
   Shared Utility
========================= */

function validateCategoryValue(ref, puzzle) {
  const { category, value } = ref;

  if (!category || !value) {
    throw new Error("Category/value missing in constraint");
  }

  if (!puzzle.categories[category]) {
    throw new Error(`Unknown category: ${category}`);
  }

  if (!puzzle.categories[category].includes(value)) {
    throw new Error(
      `Invalid value '${value}' for category '${category}'`
    );
  }
}
