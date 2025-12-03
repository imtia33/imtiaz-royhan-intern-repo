export const add = (a, b) => {
  return a + b;
};

export const subtract = (a, b) => {
  return a - b;
};

export const multiply = (a, b) => {
  return a * b;
};

export const divide = (a, b) => {
  if (b === 0) {
    throw new Error('Division by zero');
  }
  return a / b;
};

export const formatDate = (date) => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};