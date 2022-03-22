import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import EditIcon from '@material-ui/icons/Edit';
import { StyledLabel } from './styled';

const style = { cursor: 'pointer' };

const Palette = ({ openModal, color, editable, setInitialColor }) => {
  return (
    <Box
      width="144px"
      border="1px solid #E6E9EC"
      borderRadius="6px"
      overflow="hidden"
      onClick={openModal}
      height="min-content"
      mr="16px"
      style={style}
    >
      <Box bgcolor={color} height="112px" />
      <Box p="16px" color="#C1C5CB" boxSizing="border-box" width="100%" bgcolor="#fff">
        <StyledLabel>
          <input
            type="text"
            name="brand-color-hex"
            id="edit-brandcolor"
            value={color}
            onChange={(e) => setInitialColor(e.target.value)}
            disabled={!editable}
          />
          {editable ? <EditIcon fontSize="small" color="inherit" /> : null}
        </StyledLabel>
      </Box>
    </Box>
  );
};

Palette.propTypes = {
  openModal: PropTypes.func,
  color: PropTypes.string.isRequired,
  setInitialColor: PropTypes.func,
  editable: PropTypes.bool,
};
Palette.defaultProps = {
  editable: false,
  setInitialColor: () => null,
  openModal: () => null,
};
export default Palette;
