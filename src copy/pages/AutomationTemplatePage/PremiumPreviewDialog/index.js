import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import Box from '@material-ui/core/Box';
import { useHistory } from 'react-router-dom';
import { StyledDialog, StyledDialogContent, StyledPaper } from '../../../components/Dialog/styled';
import Lock from '../../../assets/icons/PremiumDialog/Lock';
import UpgradeAccountContent from './UpgradeAccountContent';
import CompleteStepsContent from './CompleteStepsContent';
import { isDefined } from '../../../utils/helpers';
import { EXCEPTION_DICTIONARY } from '../constant';
import { UI_ROUTES } from '../../../constants/routes';
import PremiumDialog from '../../FlowDetailsPage/PremiumDialog';
import CloseButton from '../../../components/Dialog/CloseButton';

const ID = 'preview-premium-dialog';

const CONTENT_MAP = {
  [EXCEPTION_DICTIONARY.upgradePlan]: UpgradeAccountContent,
  COMPLETE_STEPS: CompleteStepsContent,
  default: () => <div />,
};

const noop = () => {};

const PremiumPreviewDialog = ({ contentType, toggleIsOpen }) => {
  const [upgradeModal, setUpgradeModal] = useState(false);
  const toggleUpgradeModal = useCallback(() => setUpgradeModal((prevState) => !prevState), []);

  const Content = CONTENT_MAP[contentType] ?? CONTENT_MAP.default;
  const history = useHistory();

  const handleClose = useCallback(() => {
    if (history.action !== 'POP') {
      history.goBack();
      return;
    }

    history.push(UI_ROUTES.flows);
  }, [history]);

  return (
    <>
      <StyledDialog
        open={isDefined(CONTENT_MAP[contentType])}
        scroll="paper"
        maxWidth="xs"
        width="612px"
        PaperComponent={StyledPaper}
        onClose={noop}
        aria-labelledby={ID}
      >
        <CloseButton onClick={handleClose} top="8px" right="8px" />

        <StyledDialogContent px="48px">
          <Box display="flex" flexDirection="column" mb="4px" mt="48px">
            <Box
              bgcolor="#DF735B"
              width="40px"
              height="40px"
              borderRadius="8px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Lock fill="#fff" />
            </Box>
          </Box>

          <Box mt="20px" mb="42px">
            <Content toggleUpgradeModal={toggleUpgradeModal} toggleIsOpen={toggleIsOpen} />
          </Box>
        </StyledDialogContent>
      </StyledDialog>
      {upgradeModal && contentType === EXCEPTION_DICTIONARY.upgradePlan && (
        <PremiumDialog toggleIsOpen={toggleUpgradeModal} />
      )}
    </>
  );
};

PremiumPreviewDialog.propTypes = {
  contentType: PropTypes.string.isRequired,
  toggleIsOpen: PropTypes.bool.isRequired,
};

export default PremiumPreviewDialog;
