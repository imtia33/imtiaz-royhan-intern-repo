/**
 * Utility functions for common operations
 */

/**
 * Adds two numbers together
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} Sum of a and b
 */
function sum(a, b) {
  return a + b;
}

/**
 * Checks if a number is even
 * @param {number} num - Number to check
 * @returns {boolean} True if number is even, false otherwise
 */
function isEven(num) {
  return num % 2 === 0;
}

/**
 * Gets the maximum value from an array of numbers
 * @param {number[]} arr - Array of numbers
 * @returns {number|null} Maximum value or null if array is empty
 */
function getMax(arr) {
  if (!arr || arr.length === 0) return null;
  return Math.max(...arr);
}

/**
 * Formats a name by capitalizing first letter of each word
 * @param {string} name - Name to format
 * @returns {string} Formatted name
 */
function formatName(name) {
  if (!name) return '';
  return name
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

module.exports = {
  sum,
  isEven,
  getMax,
  formatName
};