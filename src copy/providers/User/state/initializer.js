import { getStorageValue } from '../../../client/links/demoLink/storage';

const initializer = (initializerArg) => ({
  ...initializerArg,
  isDemo: getStorageValue(),
});

export { initializer };
