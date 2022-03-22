import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import Header from './Header';
import { H3B, P14 } from '../../../components/atoms';
import THEME from '../../../constants/theme';
import { PLANS, PLAN_DICTIONARY } from './constant';
import PlanCard from './PlanCard';
import { useGlobalContext } from '../../../containers/App/context';
import { StyledDialogWrapper } from './styled';
import { UI_ROUTES } from '../../../constants/routes';

const ID = 'wt-premium-upgrade';
const TITLE = 'Upgrade from Starter to Advanced to avail of powerful automations.';
const DESC = 'Elit in nisi fringilla amet nec, nunc tincidunt hac id. Placerat pulvinar fusce vulputate.';

const PremiumDialog = ({ toggleIsOpen }) => {
  const { t } = useTranslation();
  const { toggleIntercom, intercomIsOpen, getMeData } = useGlobalContext();

  const activePlan = useMemo(() => getMeData?.we?.activePlan?.plan?.uiCode ?? PLAN_DICTIONARY.starter, [
    getMeData?.we?.activePlan?.plan?.uiCode,
  ]);
  const { push } = useHistory();

  const handleClose = useCallback(() => {
    if (intercomIsOpen) {
      toggleIntercom();
    }
    toggleIsOpen();
  }, [toggleIntercom, toggleIsOpen, intercomIsOpen]);

  const handleDevZone = useCallback(() => {
    handleClose();
    push(UI_ROUTES.developers);
  }, [handleClose, push]);

  return (
    <StyledDialogWrapper open={true} scroll="paper" aria-labelledby={ID} fullScreen>
      <Header handleClose={handleClose} />
      <Box
        position="relative"
        width="100%"
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Box textAlign="center">
          <H3B>{t(TITLE)}</H3B>
          <P14 color={THEME.greyColors.grey1} margin="12px 0 0 0">
            {t(DESC)}
          </P14>
        </Box>

        <Box mt="54px" display="flex" justifyContent="center">
          {PLANS.map((el) => (
            <PlanCard
              key={el.title}
              data={el}
              handleIntercom={toggleIntercom}
              activePlan={activePlan}
              handleDevZone={handleDevZone}
            />
          ))}
        </Box>
      </Box>
    </StyledDialogWrapper>
  );
};

PremiumDialog.propTypes = {
  toggleIsOpen: PropTypes.func.isRequired,
};

export default PremiumDialog;
