export const getFileExtension = (fileName) => {
  if (!fileName) {
    return '';
  }

  const extensionIndex = fileName.lastIndexOf('.');

  const fileExtension = extensionIndex > 0 ? fileName.slice(extensionIndex + 1, fileName.length) : '';
  return fileExtension.toLowerCase();
};
