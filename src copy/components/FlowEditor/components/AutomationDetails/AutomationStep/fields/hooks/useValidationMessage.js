import { useMemo } from 'react';
import { useFlowEditorContext } from '../../../../../context';
import { useSelectedElement } from './useSelectedElement';
/**
 * @param  {string} field
 * @return {string|undefined} error
 */
export const useValidationMessage = (field) => {
  const [{ validationErrors }] = useSelectedElement();
  const { isValidateOn } = useFlowEditorContext();

  return useMemo(() => {
    if (!isValidateOn) {
      return '';
    }

    return validationErrors?.find(({ key }) => key === field)?.label;
  }, [field, isValidateOn, validationErrors]);
};

const RE_KEY = /\[(\d+)]/;

/**
 * @param  {string} field
 * @return {string|undefined} error
 */
export const useValidationMessages = (field) => {
  const [{ validationErrors }] = useSelectedElement();
  const { isValidateOn } = useFlowEditorContext();

  if (!isValidateOn) return '';

  return validationErrors.reduce((acc, m) => {
    if (!m.key.startsWith(`${field}[`)) {
      acc[m.key] = m.label;
      return acc;
    }
    const indexMatch = m?.key?.match(RE_KEY);
    const index = indexMatch?.[1] ?? '';
    acc[index] = m.label;
    return acc;
  }, {});
};
