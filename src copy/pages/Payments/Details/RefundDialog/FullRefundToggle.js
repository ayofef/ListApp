import React from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import { useField } from 'formik';
import CustomSwitch from '../../../../components/atoms/Switcher/CustomSwitch';
import { P14 } from '../../../../components/atoms';

const FullRefundToggle = () => {
  const { t } = useTranslation();
  const [{ value }, , { setValue }] = useField('fullRefund');

  const handleToggle = () => {
    setValue(!value);
  };

  return (
    <Box
      display="flex"
      alignItems="flex-start"
      pt="16px"
      pb="24px"
      width="100%"
      borderBottom="1px solid rgba(193, 195, 198, 0.2)"
    >
      <CustomSwitch label="" checked={value} onClick={handleToggle} />
      <Box ml="10px">
        <P14 fontWeight="500">{t('Refund full amount')}</P14>
        <P14 color="#787F88">{t('Toggle off to choose refund amount.')}</P14>
      </Box>
    </Box>
  );
};

FullRefundToggle.propTypes = {};

export default FullRefundToggle;
