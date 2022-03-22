import React from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import Input from '../../../../components/forms/_common/Input';
import THEME from '../../../../constants/theme';

const LABEL_PROPS = {
  fontWeight: '600 !important',
  fontSize: '12px',
  lineHeight: '12px',
};

const ReasonInput = () => {
  const { t } = useTranslation();

  return (
    <Box display="flex" flexDirection="column" alignItems="flex-start" mt="12px">
      <Input
        inputColor={THEME.greyColors.grey1}
        name="reason"
        type="text"
        label={t('Reason')}
        customLabel
        customLabelProps={LABEL_PROPS}
        width="100%"
        multiline
        rows={5}
      />
    </Box>
  );
};

export default ReasonInput;
