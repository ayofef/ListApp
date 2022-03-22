import flattenDeep from 'lodash/flattenDeep';

export const getSearchFilterData = (searchFilter) => {
  return searchFilter
    ? flattenDeep(
        Object.entries(searchFilter).map(([type, values]) => {
          return values.map((value) => {
            return { input: [{ type, value }] };
          });
        })
      )
    : [];
};
