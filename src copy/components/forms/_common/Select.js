import React, { useState } from 'react';
import { arrayOf, bool, func, oneOfType, string } from 'prop-types';
import Box from '@material-ui/core/Box';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useTranslation } from 'react-i18next';
import isNil from 'lodash/isNil';
import { StyledSelect } from '../../FlowEditor/components/AutomationDetails/AutomationStep/fields/styled';
import { OptionsType } from '../../FlowEditor/components/AutomationDetails/AutomationStep/inputs/types';
import { StyledPaper, StyledMenuItem } from '../../atoms/Select/StyledSelect';
import CheckIcon from '../../../assets/icons/Select/CheckIcon';
import { SearchBar } from '../../atoms';

const ITEM_HEIGHT = 33;
const Y_MARGIN = 8;
const NONE = 'none';

const useStyles = makeStyles({
  menuPaper: {
    maxHeight: 7 * ITEM_HEIGHT + 2 * Y_MARGIN,
  },
});

const Select = ({ name, value, options, onChange, disabled, hideNone }) => {
  const [filter, setFilter] = useState('');
  const classes = useStyles();
  const { t } = useTranslation();
  const isValid = value === NONE || options?.some((option) => option.value === value);

  const filteredItems = options?.filter(
    ({ value: itemValue, title: itemTitle }) =>
      (typeof itemValue === 'string' && itemValue?.toLowerCase()?.includes(filter?.toLowerCase())) ||
      (typeof itemTitle === 'string' && itemTitle?.toLowerCase()?.includes(filter?.toLowerCase())) ||
      value === itemValue
  );

  const handleChange = (e) => {
    if (!isNil(e.target.value)) {
      onChange(e);
    }
  };

  const handleClose = () => {
    setFilter('');
  };

  const stopImmediatePropagation = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <StyledSelect
      name={name}
      value={value}
      IconComponent={ExpandMoreIcon}
      MenuProps={{
        classes: { paper: classes.menuPaper },
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
        getContentAnchorEl: null,
        PaperProps: {
          component: StyledPaper,
        },
      }}
      onChange={handleChange}
      onClose={handleClose}
      displayEmpty
      disabled={disabled}
    >
      <StyledMenuItem onKeyDown={(e) => e.stopPropagation()} onClickCapture={stopImmediatePropagation} pt="0px" divider>
        <SearchBar
          search={filter}
          setSearch={setFilter}
          bgcolor="transparent"
          width="100%"
          height="30px"
          paddingX="0"
          paddingY="0"
          noClear
        />
      </StyledMenuItem>

      {!hideNone && (
        <StyledMenuItem value={NONE}>
          {t('None')} <CheckIcon />
        </StyledMenuItem>
      )}

      {!isValid && (
        <StyledMenuItem value={value} disabled>
          <Box component="span" color="red">
            {value}
          </Box>
        </StyledMenuItem>
      )}

      {filteredItems?.map(({ value: key, title }) => (
        <StyledMenuItem key={key} value={key}>
          {title}
          <CheckIcon />
        </StyledMenuItem>
      ))}
    </StyledSelect>
  );
};

Select.propTypes = {
  name: string,
  value: oneOfType([string, arrayOf(string)]),
  options: OptionsType.isRequired,
  onChange: func,
  disabled: bool,
  hideNone: bool,
};

Select.defaultProps = {
  name: undefined,
  value: undefined,
  onChange: undefined,
  disabled: false,
  hideNone: false,
};

export default Select;
export { NONE };
