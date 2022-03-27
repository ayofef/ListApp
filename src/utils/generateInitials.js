export const generateInitials = (name) => {
  if (typeof name !== 'string') {
    return '';
  }

  return (
    name
      ?.split(' ')
      .slice(0, 2)
      .reduce((acc, [first]) => (first ? acc + first : acc), '') ?? ''
  );
};
