import PropTypes from 'prop-types';
import React from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import ConfirmationModal from '../../../../components/modals/ConfirmationModal';
import { P14, H2, ButtonRounded } from '../../../../components/atoms';
import THEME from '../../../../constants/theme';
import Party from '../../../../assets/icons/Party';
import Confetti from '../../../../assets/icons/Confetti';
import { StyledConfetti, StyledPartyIcon } from './styled';

const DESC =
  'Your flow is now published, and you can start capturing payments using your the Flow ID. Don’t forget to create automations to level up your payment operations to do things like increase acceptance, reduce fraud and reduce processing costs.';

const PublishedFlowModal = ({ open, onConfirm }) => {
  const { t } = useTranslation();

  return (
    <ConfirmationModal
      open={open}
      onConfirm={onConfirm}
      onClose={onConfirm}
      onCancel={onConfirm}
      text={{}}
      height="500px"
    >
      <Box>
        <StyledConfetti>
          <Confetti />
        </StyledConfetti>
        <StyledPartyIcon>
          <Party />
        </StyledPartyIcon>
        <Box mb="32px">
          <H2 fontWeight="700" margin="0 0 8px 0">
            {t('Congratulations')}!
          </H2>
          <P14 lineHeight="24px" color={THEME.greyColors.grey1} width="440px">
            {t(DESC)}
          </P14>
        </Box>
        <ButtonRounded type="button" color="primary" variant="contained" onClick={onConfirm}>
          {t('Continue')}
        </ButtonRounded>
      </Box>
    </ConfirmationModal>
  );
};

PublishedFlowModal.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default PublishedFlowModal;
