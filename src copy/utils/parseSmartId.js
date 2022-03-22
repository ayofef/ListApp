export const parseSmartId = (str) => {
  if (typeof str === 'string') {
    return str.split(':');
  }

  return str;
};
