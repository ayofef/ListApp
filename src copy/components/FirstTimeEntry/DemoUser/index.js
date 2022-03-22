import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/client';
import { useSwitchDemo } from '../../../hooks/useSwitchDemo';
import { PopupContainer, ChevronWrapper, ButtonRounded } from './styled';
import { SETUP_ACCOUNT_FROM_DEMO } from '../../../utils/queries/flows/mutations';
import { generateUserPilotAttribute } from '../../../constants/generateUserPilotLabel';
import ChevronDown from '../../../assets/icons/ChevronDown';

const DemoUser = () => {
  const { t } = useTranslation();
  const switchDemo = useSwitchDemo();
  const [setupAccountFromDemo] = useMutation(SETUP_ACCOUNT_FROM_DEMO);
  const [isOpen, setIsOpen] = useState(true);

  const handleClick = async () => {
    switchDemo();
    await setupAccountFromDemo();
  };

  const handleTogglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <PopupContainer isOpen={isOpen} {...generateUserPilotAttribute('first_time_entry', 'demo_user_cta')}>
      <ChevronWrapper isOpen={isOpen} onClick={handleTogglePopup}>
        <ChevronDown with={22} height={22} color="white" id="111" color2="green" />
      </ChevronWrapper>

      {isOpen && (
        <Box p="0 32px 32px 32px">
          <Box component="p" fontSize="20px" fontWeight="600" color="white" mt="12px">
            {t("You're currently exploring a demo account")}
          </Box>

          <Box display="flex" mt="24px">
            <ButtonRounded type="button" variant="contained" color="primary" onClick={handleClick}>
              {t('Set up your account')}
            </ButtonRounded>
          </Box>
        </Box>
      )}
    </PopupContainer>
  );
};

export default DemoUser;
