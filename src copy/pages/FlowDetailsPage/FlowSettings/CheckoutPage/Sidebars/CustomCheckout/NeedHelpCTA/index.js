import React, { useCallback, useState } from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import { P16B, P14, ButtonRounded } from '../../../../../../../components/atoms';
import THEME from '../../../../../../../constants/theme';
import { BORDER_COLOR } from '../../../../../constant';
import { useGlobalContext } from '../../../../../../../containers/App/context';
import InviteModal from '../../../../../../../components/InviteModal';
import UnderlinedButton from '../../../../../../../components/atoms/Buttons/UnderlinedButton';

const TITLE = 'Need help ?';

const DESCRIPTION =
  'Don’t worry, your developer should be able to help you here. If not, an Automator from WhenThen will help you out.';

const NeedHelpCTA = () => {
  const { t } = useTranslation();

  const [inviteModal, setInviteModal] = useState(false);
  const toggleInviteModal = useCallback(() => setInviteModal((prevState) => !prevState), []);

  const { toggleIntercom } = useGlobalContext();

  const handleAskAutomator = useCallback(() => {
    toggleIntercom();
  }, [toggleIntercom]);

  return (
    <Box
      p="24px"
      mt="38px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="336px"
      height="244px"
      borderRadius="8px"
      boxSizing="border-box"
      border={`0.5px solid ${BORDER_COLOR}`}
      boxShadow="0px 2px 4px rgb(0,0,0,0.02)"
    >
      <Box display="flex" flexDirection="column" alignItems="center" mb="24px">
        <P16B margin="0 0 8px 0">{t(TITLE)}</P16B>
        <P14 color={THEME.greyColors.grey1} textAlign="center">
          {t(DESCRIPTION)}
        </P14>
      </Box>

      <ButtonRounded type="button" color="primary" variant="contained" onClick={toggleInviteModal}>
        {t('Invite Developer')}
      </ButtonRounded>
      <UnderlinedButton type="button" onClick={handleAskAutomator}>
        {t('Ask an Automator')}
      </UnderlinedButton>
      {inviteModal && <InviteModal isOpen={inviteModal} toggleIsOpen={toggleInviteModal} />}
    </Box>
  );
};

export default NeedHelpCTA;
