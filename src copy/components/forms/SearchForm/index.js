import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { string, func } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { SearchFormWrapper } from '../formStyles';
import { MaterialIconStyler } from '../../atoms';
import THEME from '../../../constants/theme';
import InputWithIcon from '../../atoms/InputWithIcon/InputWithIcon';
import { FlexContainer } from '../../atoms/flex/FlexContainer';

const SearchForm = ({ placeholder, padding, width, iconWidth, onChange, color, ...restProps }) => {
  const { t } = useTranslation();

  return (
    <SearchFormWrapper padding={padding} width={width}>
      <FlexContainer justifyContent="flex-start" width="100%">
        <InputWithIcon
          placeholder={placeholder || t('inputPlaceholders.search')}
          onChange={onChange}
          shouldFullWidth={true}
          {...restProps}
        >
          <MaterialIconStyler color={color} icon={SearchIcon} width={iconWidth} />
        </InputWithIcon>
      </FlexContainer>
    </SearchFormWrapper>
  );
};

SearchForm.propTypes = {
  placeholder: string,
  padding: string,
  width: string,
  onChange: func.isRequired,
  color: string,
  iconWidth: string,
};
SearchForm.defaultProps = {
  placeholder: '',
  padding: '',
  width: '',
  color: THEME.greyColors.grey2,
  iconWidth: '',
};

export default SearchForm;
