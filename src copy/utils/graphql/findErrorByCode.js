import isEmpty from 'lodash/isEmpty';
import { isDefined } from '../helpers';

export const findErrorByCode = (errors, code) => {
  if (isEmpty(errors) || !isDefined(code)) {
    return undefined;
  }

  const result = errors.find((error) => error?.extensions?.code === code);

  return result;
};
