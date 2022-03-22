import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uniqueID } from 'uuid';

import InputGroup from './InputGroup';
import { StyledWrapper } from './styled';

const editorMap = [
  {
    formGroup: 'Logo type',
    type: 'logoType',
    options: ['img', 'text', 'none'],
  },
  {
    formGroup: 'Logo size',
    type: 'logoSize',
    options: ['small', 'medium', 'large'],
  },
  {
    formGroup: 'Logo position',
    type: 'logoPosition',
    options: ['left', 'center', 'right'],
  },
];

const LogoEditor = ({ logoHandler: { logoType, logoSize, logoPosition, handleChange } }) => {
  const defaultValue = {
    logoType: logoType || 'img',
    logoSize: logoSize || 'medium',
    logoPosition: logoPosition || 'left',
  };
  return (
    <StyledWrapper>
      {editorMap.map(({ formGroup, type, options }) => (
        <InputGroup
          formGroup={formGroup}
          type={type}
          options={options}
          key={uniqueID()}
          defaultValue={defaultValue[type]}
          handleChange={handleChange}
        />
      ))}
    </StyledWrapper>
  );
};
LogoEditor.propTypes = {
  logoHandler: PropTypes.shape({
    logoType: PropTypes.string,
    logoSize: PropTypes.string,
    logoPosition: PropTypes.string,
    handleChange: PropTypes.func,
  }).isRequired,
};

export default LogoEditor;
