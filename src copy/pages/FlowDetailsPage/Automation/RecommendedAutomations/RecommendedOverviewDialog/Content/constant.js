import { shape, string, arrayOf, bool } from 'prop-types';

const templatePropTypes = shape({
  categories: arrayOf(string),
  blogReady: bool,
  description: string,
  minimumPlanRequired: string,
  name: string,
  color: string,
  icon: string,
});

export { templatePropTypes };
