import { isDefined } from './isDefined';

/**
 *
 * @typedef error
 * @type {object}
 * @property {string} error_description
 * @param {error[]} errors
 * @returns
 */

export const getErrorMessage = (errors) => {
  if (!Array.isArray(errors)) {
    return {
      hasError: false,
      errorMessage: '',
    };
  }

  const errorFn = (error) => isDefined(error?.error_description) || isDefined(error?.message);

  const hasError = errors.some(errorFn);
  const errorMessageObject = errors.find(errorFn);

  const errorMessage = errorMessageObject?.error_description || errorMessageObject?.message || '';

  return { hasError, errorMessage };
};
