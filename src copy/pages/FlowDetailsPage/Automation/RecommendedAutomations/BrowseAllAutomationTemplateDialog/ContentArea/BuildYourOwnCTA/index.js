import React from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { string } from 'prop-types';
import { ButtonRounded, P14, P14B } from '../../../../../../../components/atoms';
import THEME from '../../../../../../../constants/theme';
import { StyledBox } from './styled';
import { usePaymentFlowContext } from '../../../../../paymentFlowContext';
import { BORDER_COLOR } from '../../../../../constant';

const TITLE = 'Build your own';
const DESC = 'If you can’t find what are looking you can always create a custom automation.';
const templateId = 'template.freeform-automation';

const BuildYourOwnCTA = ({ padding, border, borderRadius, mb, descWidth }) => {
  const { t } = useTranslation();
  const { push } = useHistory();
  const { flowId } = usePaymentFlowContext();

  const openTemplate = () => {
    push(`/automations/templates/${templateId}/${flowId}`);
  };

  return (
    <StyledBox $padding={padding} $border={border} $borderRadius={borderRadius} $mb={mb}>
      <Box mr="auto">
        <P14B fontWeight="600" margin="0 0 4px 0">
          {t(TITLE)}
        </P14B>
        <P14 width={descWidth} lineHeight="22px" color={THEME.greyColors.grey1}>
          {t(DESC)}
        </P14>
      </Box>
      <ButtonRounded color="primary" variant="contained" type="button" onClick={openTemplate}>
        {t(TITLE)}
      </ButtonRounded>
    </StyledBox>
  );
};

BuildYourOwnCTA.propTypes = {
  padding: string,
  border: string,
  borderRadius: string,
  mb: string,
  descWidth: string,
};

BuildYourOwnCTA.defaultProps = {
  padding: '28px',
  border: `1px solid ${BORDER_COLOR}`,
  borderRadius: '8px',
  mb: '16px',
  descWidth: '500px',
};

export default BuildYourOwnCTA;
