import React from 'react';
import PropTypes from 'prop-types';
import { StyledActionButton } from './styled';

const ActionButton = ({ type, brandColor, text, to, target, preview, previewModal }) => {
  const handlePreview = (e) => {
    if (preview && !previewModal) {
      e.preventDefault();
    }
  };
  return (
    <StyledActionButton
      as={to ? 'a' : 'div'}
      type={type || 'SOLID'}
      brandcolor={brandColor || '#777777'}
      href={to}
      target={target}
      rel="noreferrer noopener"
      preview={preview}
      onClick={handlePreview}
    >
      {text}
    </StyledActionButton>
  );
};

ActionButton.propTypes = {
  type: PropTypes.string.isRequired,
  brandColor: PropTypes.string.isRequired,
  text: PropTypes.string,
  to: PropTypes.string,
  target: PropTypes.string,
  preview: PropTypes.bool.isRequired,
  previewModal: PropTypes.bool.isRequired,
};
ActionButton.defaultProps = {
  text: 'Action',
  to: '',
  target: '_blank',
};

export default ActionButton;
