import React from 'react';
import { SearchBar as SearchBarComponent } from '../index';

export const SearchBar = (props) => <SearchBarComponent {...props} />;
SearchBar.args = {
  onChange: () => null,
};

export default {
  title: 'Atoms/SearchBar',
  component: SearchBarComponent,
  argTypes: {},
};
