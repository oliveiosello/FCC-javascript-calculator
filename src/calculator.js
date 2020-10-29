// Calculator State

export const PLUS = "+";
export const MINUS = "-";
export const MULTIPLY = "*";
export const DIVIDE = "/";

export const operations = [PLUS, MINUS, MULTIPLY, DIVIDE];

// CalcState
export const empty = {
  current: 0,
  decimal: null,
  total: 0,
  operator: null,
  showTotal: false,
};

// (digit, CalcState) -> CalcState
export const pressDigit = (digit) => (state) => {
  if (state.decimal !== null) {
    let decimal = state.decimal + digit;
    return { ...state, decimal, showTotal: false };
  } else {
    let current = state.current * 10 + digit;
    return { ...state, current, showTotal: false };
  }
};

export const pressEquals = (state) => pressOperator(null)(state);

const getCurrentValue = ({ current, decimal }) => {
  if (decimal !== null) {
    return parseFloat(`${current}.${decimal}`);
  } else {
    return current;
  }
};

export const pressClear = (state) => empty;

export const pressDecimal = (state) => {
  const decimal = state.decimal === null ? "" : state.decimal;
  return { ...state, decimal };
};

export const pressOperator = (newOperator) => (state) => {
  const { total, operator } = state;
  const newTotal = performOperation(operator, getCurrentValue(state), total);

  // showTotal
  return {
    ...state,
    current: 0,
    decimal: null,
    total: newTotal,
    operator: newOperator,
    showTotal: true,
  };
};

const performOperation = (operator, current, total) => {
  switch (operator) {
    case MULTIPLY:
      return total * current;
    case PLUS:
      return total + current;
    case MINUS:
      return total - current;
    case DIVIDE:
      return total / current;
    default:
      return total + current;
  }
};

// State -> State
const actions = [
  pressDigit(3),
  pressDecimal,
  pressDigit(4),
  pressDigit(5),
  pressOperator(MULTIPLY),
  pressDigit(2),
  pressOperator(PLUS),
];

export const renderDisplay = (state) => {
  if (state.showTotal) {
    return state.total;
  } else if (state.decimal === "") {
    return getCurrentValue(state) + ".";
  } else {
    return getCurrentValue(state);
  }
};

actions.reduce((state, action) => {
  const next = action(state);
  console.log(renderDisplay(next), next.operator);
  return next;
}, empty);
