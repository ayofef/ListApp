import get from 'lodash/get';

export const getPath = ({ programmeValue, key, configKey }) => {
  return (
    programmeValue &&
    get(programmeValue, configKey, '') &&
    `${configKey}.initialState[${get(programmeValue, configKey, '').initialState.findIndex(
      (field) => field.key === key
    )}].value`
  );
};
