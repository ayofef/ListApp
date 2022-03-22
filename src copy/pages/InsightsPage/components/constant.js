export const absoluteblockWidth = (config) => {
  if (!config.left && !config.right) {
    return 'calc(100% - 73px)';
  }
  if (!config.left && config.right) {
    return 'calc(100% - 73px)';
  }
  return 'calc(100% - 39px)';
};

const generateArray = (n) => Array.from(Array(n).keys());

/**
 * scenario -1 - if indexes is not an array, return
 *
 * scenario -2 - if indexes length is less than maxLength, return
 *
 * oddIndexes - remove every second element based on array index
 *
 * scenario -3 - if indexes length is greater than maxLength, recurse
 *
 */

/**
 *
 * @param {number[]} indexes
 * @param {number} maxLength
 * @returns {number[]}
 */

const getIndexesToHide = (indexes, maxLength) => {
  if (!Array.isArray(indexes)) return indexes;

  if (indexes.length < maxLength) return indexes;

  const oddIndexes = indexes.filter((_, index) => index % 2 === 0);

  if (oddIndexes.length > maxLength) {
    return getIndexesToHide(oddIndexes, maxLength);
  }

  return oddIndexes;
};

/**
 *
 * @param {String} label
 * @param {Number} index
 * @param {Number} renderDataLength
 * @param {Boolean} rightDrawerOpen
 * @returns {Boolean}
 */

/**
 * Helper function to format the tick's label on Line chart
 *
 * Scenario 1 - Remove the last tick's label because it's off the screen and user only see's the half of it when renderDataLength > 10.
 *
 *  * Scenario 2 - reduce the number of ticks displayed when renderDataLength > 20 || if rightDrawerOpen is open (filter drawer) - cause label to be out of sync with dots otherwise
 *
 * Scenario 3 - Display tick's label for every second tick
 *
 * Default - return false
 */

const checkIsTickVisible = ({ index, renderDataLength, rightDrawerOpen }) => {
  if (renderDataLength > 10 && index + 1 === renderDataLength) {
    return false;
  }

  if (renderDataLength > 20 || rightDrawerOpen) {
    if (index % 3 === 0) {
      return true;
    }
    return false;
  }

  if (index % 2 === 0) {
    return true;
  }

  return false;
};

export { checkIsTickVisible, getIndexesToHide, generateArray };
