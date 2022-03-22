import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { StyledDropZone } from './styled';
import { P12 } from '../../../../../components/atoms';
import UploadIcon from '../../../../../assets/icons/Upload';
import THEME from '../../../../../constants/theme';
import { FlexContainer } from '../../../../../components/atoms/flex/FlexContainer';

const DragAndDropZone = ({ dragging, getRootProps, defaultOnClick }) => {
  const { t } = useTranslation();

  return (
    <StyledDropZone dragging={dragging} {...getRootProps({ onClick: defaultOnClick })}>
      <FlexContainer alignItems="center" justifyContent="center">
        <Box mr="12px" mt="4px">
          <UploadIcon width="22" height="21" />
        </Box>
        <P12 color={THEME.greyColors.grey18}>{t(`Drop your files here.`)}</P12>
      </FlexContainer>
    </StyledDropZone>
  );
};

DragAndDropZone.propTypes = {
  getRootProps: PropTypes.func.isRequired,
  dragging: PropTypes.bool.isRequired,
  defaultOnClick: PropTypes.func,
};
DragAndDropZone.defaultProps = {
  defaultOnClick: () => {},
};

export default DragAndDropZone;
