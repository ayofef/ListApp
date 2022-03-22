const parseInitials = (name) =>
  name
    ?.split(' ')
    .slice(0, 2)
    .reduce((acc, [first]) => (first ? acc + first : acc), '') ?? '';

export { parseInitials };
