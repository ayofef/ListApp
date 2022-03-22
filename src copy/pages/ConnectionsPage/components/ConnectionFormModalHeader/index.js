import React from 'react';
import { string, func } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { ButtonRounded } from '../../../../components/atoms';
import { ArrowBack } from '../../../../assets/icons';
import { StyledDialogTitle } from '../../../../components/Dialog/styled';
import CloseButton from '../../../../components/Dialog/CloseButton';
import { BackButtonContainer } from './styled';
import THEME from '../../../../constants/theme';

const ConnectionFormModalHeader = ({ id, handleClose, handleGoBack }) => {
  const { t } = useTranslation();

  return (
    <>
      <CloseButton onClick={handleClose} top="10px" />

      <StyledDialogTitle padding="10px 24px" id={`${id}-title`} disableTypography>
        <BackButtonContainer>
          <ButtonRounded color="secondary" onClick={handleGoBack}>
            <ArrowBack size={18} stroke={THEME.greyColors.grey9} className="arrowBack" />
            {t('Back to connection')}
          </ButtonRounded>
        </BackButtonContainer>
      </StyledDialogTitle>
    </>
  );
};

ConnectionFormModalHeader.propTypes = {
  id: string.isRequired,
  handleClose: func.isRequired,
  handleGoBack: func.isRequired,
};

export default ConnectionFormModalHeader;
