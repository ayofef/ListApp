import React from 'react';
import PropTypes from 'prop-types';

import { P14B } from '../../atoms';
import { StyledBox } from './styled';

const ActionForm = ({ buttonLink, buttonText, showForm, setText, setLink, setBlur, Zindex }) => {
  return (
    <StyledBox zIndex={Zindex} position="absolute" top="-36px" left="200px" show={showForm} onMouseLeave={setBlur}>
      <div>
        <P14B>Insert a button</P14B>
        <input
          type="text"
          name="add action"
          value={buttonText || ''}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter button text"
        />
        <input
          type="text"
          name="add action"
          value={buttonLink || ''}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Enter button link"
        />
      </div>
    </StyledBox>
  );
};

ActionForm.propTypes = {
  Zindex: PropTypes.number.isRequired,
  buttonLink: PropTypes.string,
  buttonText: PropTypes.string,
  showForm: PropTypes.number.isRequired,
  setText: PropTypes.func.isRequired,
  setLink: PropTypes.func.isRequired,
  setBlur: PropTypes.func.isRequired,
};
ActionForm.defaultProps = {
  buttonLink: '',
  buttonText: '',
};

export default ActionForm;
