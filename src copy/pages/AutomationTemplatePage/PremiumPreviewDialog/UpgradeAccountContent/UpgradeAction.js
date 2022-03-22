import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import { func } from 'prop-types';
import THEME from '../../../../constants/theme';
import { P14, ButtonRounded } from '../../../../components/atoms';
import { DefaultCardTag } from '../../../../components/table/Cells/DefaultCardCell';
import PreviewAutomationDialog from './PreviewAutomationDialog';
import { useGlobalContext } from '../../../../containers/App/context';
import UnderlinedButton from '../../../../components/atoms/Buttons/UnderlinedButton';

const DESC =
  'Control every stage and status of a payment, build advanced automations and get real-time payment insight on Rise Plan.';

const UpgradeAction = ({ toggleIsOpen }) => {
  const { t } = useTranslation();
  const { toggleIntercom } = useGlobalContext();
  const [previewAutomation, setPreviewAutomation] = useState(false);
  const togglePreviewAutomation = () => setPreviewAutomation((prevState) => !prevState);

  return (
    <>
      <Box
        width="512px"
        boxSizing="border-box"
        border={`1.5px solid ${THEME.primaryColors.primary}`}
        boxShadow="0px 2px 4px rgba(0, 0, 0, 0.04)"
        borderRadius="8px"
        p="24px 30px 16px 30px"
        bgcolor="#fff"
      >
        <DefaultCardTag text={t('Rise Plan Only')} />
        <Box margin="16px 0">
          <P14 color={THEME.greyColors.grey1}>{t(DESC)}</P14>
        </Box>
        <Box display="flex" alignItems="center">
          <Box mr="18px">
            <ButtonRounded type="button" variant="contained" color="primary" onClick={toggleIntercom}>
              {t('Upgrade')}
            </ButtonRounded>
          </Box>

          <UnderlinedButton onClick={toggleIsOpen} type="button">
            {t('Preview Automation')}
          </UnderlinedButton>
        </Box>
      </Box>
      <PreviewAutomationDialog isOpen={previewAutomation} toggleIsOpen={togglePreviewAutomation} />
    </>
  );
};

UpgradeAction.propTypes = {
  toggleIsOpen: func.isRequired,
};

export default UpgradeAction;
