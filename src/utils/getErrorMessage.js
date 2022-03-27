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
  const hasError = errors.some((error) => isDefined(error?.error_description));
  const errorMessage = errors.find((error) => isDefined(error?.error_description))?.error_description || '';

  return { hasError, errorMessage };
};
