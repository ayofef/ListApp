import { shape, string, bool } from 'prop-types';

const automationPropType = shape({
  instruct: bool.isRequired,
  id: string.isRequired,
  name: string.isRequired,
});

export { automationPropType };
