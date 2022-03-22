import React, { useCallback, useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import FormControl from '@material-ui/core/FormControl';
import PropTypes from 'prop-types';
import DefaultFields from './DefaultFields';
import FieldSet from './FieldSet';
import { StyledSelect, P14B } from '../../atoms';
import { GENERATE_VALUE, GENERATE_OPTIONS } from './constants';

const VALUES = {
  default: 'default',
  custom: 'custom',
};

const OPTIONS = [
  { value: VALUES.default, text: { text: 'Default 8' } },
  { value: VALUES.custom, text: { text: 'Custom' } },
];

const FIELDS_DICTIONARY = {
  [VALUES.default]: DefaultFields,
  [VALUES.custom]: FieldSet,
};

const MAX_WIDTH = {
  [VALUES.default]: 'sm',
  [VALUES.custom]: 'md',
};

const DialogContent = ({ columnSet, setMaxWidth, viewTitle }) => {
  const { t } = useTranslation();
  const initialSelectedValue = GENERATE_VALUE(viewTitle) ?? VALUES.default;
  const [selectValue, setSelectedValue] = useState(initialSelectedValue);
  const handleSelectChange = useCallback(({ target }) => setSelectedValue(target.value), []);

  useEffect(() => setMaxWidth(MAX_WIDTH[selectValue] ?? 'md'), [selectValue, setMaxWidth]);

  const Field = FIELDS_DICTIONARY[selectValue] ?? FIELDS_DICTIONARY[VALUES.custom];

  return (
    <Box pb="8px" mt="20px">
      <P14B> {t('Columns to export')}</P14B>
      <Box maxWidth="200px">
        <FormControl variant="outlined" size="small" fullWidth>
          <StyledSelect
            value={selectValue}
            name="fields"
            onChange={handleSelectChange}
            options={GENERATE_OPTIONS(viewTitle, OPTIONS)}
          />
        </FormControl>
      </Box>

      <Field columnSet={columnSet} />
    </Box>
  );
};

DialogContent.propTypes = {
  columnSet: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string.isRequired, isDefault: PropTypes.bool.isRequired })
  ).isRequired,
  setMaxWidth: PropTypes.func.isRequired,
  viewTitle: PropTypes.string,
};
DialogContent.defaultProps = {
  viewTitle: '',
};

export default DialogContent;
