import React from 'react';
import AutocompleteComponent from './Autocomplete';

export const Autocomplete = (args) => <AutocompleteComponent {...args} />;

Autocomplete.args = {
  label: 'some search select',
};

export default {
  title: 'Common Components/Autocomplete',
  component: AutocompleteComponent,
};
