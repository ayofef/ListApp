import { COLUMN_NAMES } from './exportDictionary';

const EXPORT_MODE = {
  all: 'ALL',
  selected: 'SELECTED',
  filters: 'FILTERS',
};

const GENERATE_VALUE = (title) => {
  if (title?.length > 1) {
    return (
      title
        ?.split(' ')
        ?.join('_')
        ?.toLowerCase() ?? ''
    );
  }
  return null;
};

const GENERATE_OPTIONS = (title, options) => {
  if (title?.length > 1) {
    //default and currentView
    return [options[0], { value: GENERATE_VALUE(title), text: { text: title } }];
  }
  return options;
};

const GENERATE_VIEW_COLUMN_SET = (currentViewColumns) => {
  return (
    currentViewColumns?.reduce((acc, item, index) => {
      acc[index] = COLUMN_NAMES[item?.Header] ?? '';
      return acc;
    }, []) ?? []
  );
};
export { EXPORT_MODE, GENERATE_VALUE, GENERATE_OPTIONS, GENERATE_VIEW_COLUMN_SET };
