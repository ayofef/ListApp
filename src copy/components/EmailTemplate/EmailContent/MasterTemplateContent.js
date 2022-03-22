import React from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import { H3, P16 } from '../../atoms';

const MasterTemplateContent = () => {
  const { t } = useTranslation();

  return (
    <Box margin="40px 16px">
      <H3>Heading</H3>
      <Box margin="20px 0">
        <P16>{t(`Hey`)} Elon,</P16>
        <br />
        <P16>
          {t(`
              We notice that our records show your payment for Mars Monster Slaying for $20,000.00 is pending. Use the secure link below to pay and continue enjoying our services.`)}
        </P16>
      </Box>
    </Box>
  );
};

export default MasterTemplateContent;
