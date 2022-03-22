import PropTypes from 'prop-types';
import React from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import capitalize from '@material-ui/core/utils/capitalize';
import { StyledTableCell } from './styled';
import { PROPTYPES } from './constant';

const DefaultCardTag = ({ text, textColor, bgcolor }) => {
  const { t } = useTranslation();
  return (
    <Box
      bgcolor={bgcolor}
      borderRadius="4px"
      fontSize="12px"
      component="span"
      p="6px 8px"
      fontWeight="600"
      color={textColor}
    >
      {capitalize(t(text))}
    </Box>
  );
};

DefaultCardTag.propTypes = {
  text: PropTypes.string,
  textColor: PropTypes.string,
  bgcolor: PropTypes.string,
};

DefaultCardTag.defaultProps = {
  text: 'Default',
  textColor: '#4E40EF',
  bgcolor: '#F5F2FF',
};

const DefaultCardCell = ({ row: { original }, cell: { column } }) => {
  const header = column?.Header;
  const isDefault = original[header] ?? false;

  return (
    <StyledTableCell column={column} id={original?.id}>
      {isDefault ? <DefaultCardTag /> : <>&nbsp;</>}
    </StyledTableCell>
  );
};

DefaultCardCell.propTypes = PROPTYPES;
export default DefaultCardCell;
export { DefaultCardTag };
