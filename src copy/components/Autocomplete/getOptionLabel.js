const getOptionLabel = (option) => {
  // Value selected with enter, right from the input
  if (typeof option === 'string') {
    return option;
  }
  // Add "xxx" option created dynamically
  if (option.inputValue) {
    return option.inputValue;
  }
  // Regular option
  return option.title;
};

export { getOptionLabel };
