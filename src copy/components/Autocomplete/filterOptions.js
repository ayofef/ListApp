import { createFilterOptions } from '@material-ui/lab/Autocomplete';

const filter = createFilterOptions();
const filterOptions = (options, params) => {
  const filtered = filter(options, params);

  // Suggest the creation of a new value
  if (params.inputValue !== '') {
    filtered.push({
      inputValue: params.inputValue,
      title: `Add "${params.inputValue}"`,
    });
  }

  return filtered;
};

export { filterOptions };
