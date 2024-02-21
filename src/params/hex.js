/**
 * Check if the input value is a valid hexadecimal color code.
 * @param {string} value  The value to be checked.
 * @returns {boolean}  True if the value is a valid hexadecimal color code, false otherwise.
 */
export const match = (value) => /^[0-9a-f]{6}$/.test(value);
