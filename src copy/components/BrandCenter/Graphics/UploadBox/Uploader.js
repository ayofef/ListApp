import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import { StyledDropZone, StyledWrapper } from './styled';
import UploadButton from './Button';
import { Img } from '../../../../assets/icons';
import { FlexContainer } from '../../../atoms/flex/FlexContainer';

const Uploader = ({ title, graphics, modal, handleClick, dragging, getRootProps, modalIsOpen }) => {
  const { t } = useTranslation();

  return (
    <StyledWrapper titles={title} image={graphics}>
      {graphics ? (
        <img src={graphics} alt={t(`Your ${title}`)} />
      ) : (
        <StyledDropZone titles={title} dragging={dragging} image={graphics} {...getRootProps()} modal={modalIsOpen}>
          <FlexContainer height="100%" flexDirection="column" textAlign="center">
            <Box>
              <Img />
            </Box>
            {modal && !graphics && (
              <UploadButton graphics={graphics} handleClick={handleClick} modal={modal} title={title} />
            )}
          </FlexContainer>
        </StyledDropZone>
      )}
    </StyledWrapper>
  );
};

Uploader.propTypes = {
  title: PropTypes.string.isRequired,
  graphics: PropTypes.string,
  modal: PropTypes.bool,
  dragging: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  getRootProps: PropTypes.func.isRequired,
  modalIsOpen: PropTypes.bool,
};
Uploader.defaultProps = {
  modal: false,
  modalIsOpen: false,
  graphics: '',
};

export default Uploader;
