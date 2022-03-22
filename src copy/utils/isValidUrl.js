export const isValidUrl = (url) => {
  if (typeof url !== 'string') return false;

  try {
    // eslint-disable-next-line no-new
    new URL(url);
  } catch (e) {
    // if there's an error, the URL is invalid
    return false;
  }

  return true;
};
