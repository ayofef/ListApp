export const getDescription = (description, maxDescription = 101) => {
  if (typeof description !== 'string') return '';

  const slicedDescription = description?.substring(0, maxDescription);
  const indexOfLastCompleteWord = slicedDescription.endsWith('!')
    ? slicedDescription.lastIndexOf('!')
    : slicedDescription.lastIndexOf(' ');

  const trimmedString = slicedDescription.substring(0, Math.min(slicedDescription.length, indexOfLastCompleteWord));

  const appendDots = description.length > maxDescription;
  const addFullStop = !trimmedString.endsWith('.') && !trimmedString.endsWith('!');

  const _description = appendDots ? `${trimmedString}...` : `${trimmedString}${addFullStop ? '.' : ''}`;

  return _description;
};
