import PropTypes from 'prop-types';
import React from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import { StyledPlanCardWrapper, PlanIconTagWrapper, PlanIcon, PlanTag, CustomButtonRounded } from './styled';
import { PLAN_DICTIONARY, FEATURES, TAG_LABEL_MAP, FEATURE_MAP } from './constant';
import THEME from '../../../constants/theme';
import { P16B, P14, P12, P14B, ButtonRounded } from '../../../components/atoms';
import { BORDER_COLOR } from '../constant';
import CheckIcon from '../../../assets/icons/PremiumDialog/Check';
import Info from '../../../assets/icons/PremiumDialog/Info';

const ICON_COLOR_MAP = {
  [PLAN_DICTIONARY.starter]: THEME.greyColors.grey11,
  [PLAN_DICTIONARY.advanced]: '#fff',
};

const PlanCard = ({ data, handleIntercom, activePlan, handleDevZone }) => {
  const { t } = useTranslation();
  const { title, description, plan, sdkRequired, icon } = data;

  const Icon = icon;
  const disabled = activePlan === plan;

  return (
    <StyledPlanCardWrapper disabled={disabled}>
      <Box>
        <PlanIconTagWrapper>
          <PlanIcon plan={plan}>
            <Icon fill={ICON_COLOR_MAP[plan]} />
          </PlanIcon>
          <PlanTag plan={plan}>
            <span>{t(TAG_LABEL_MAP[plan])}</span>
          </PlanTag>
        </PlanIconTagWrapper>

        <Box mt="32px" pb="24px" borderBottom={`0.5px solid ${BORDER_COLOR}`} width="96%">
          <P16B margin="0 0 8px 0">{t(title)}</P16B>
          <P14 color={THEME.greyColors.grey1}>{t(description)}</P14>
        </Box>

        <Box mt="20px">
          {FEATURES.map(({ text, availableIn }) => (
            <Box display="flex" justifyContent="flex-start" alignItems="center" mb="2px">
              <Box width="12px" mr="28px" mt="2.5px">
                <CheckIcon
                  fill={FEATURE_MAP[plan].includes(availableIn) ? THEME.primaryColors.primary : THEME.greyColors.grey8}
                />
              </Box>
              <P12 fontWeight="500">{t(text)}</P12>
            </Box>
          ))}

          {sdkRequired && (
            <Box display="flex" justifyContent="flex-start" alignItems="center" mt="-6px">
              <Box width="12px" ml="4px" mr="24px" mt="2.5px">
                <Info fill={THEME.primaryColors.primary} />
              </Box>
              <Box width="100%" display="flex" justifyContent="space-between" alignItems="center">
                <P12 fontWeight="500">{t('Requires WhenThen SDK setup')}</P12>
                <ButtonRounded variant="text" color="primary" type="button" onClick={handleDevZone}>
                  <P12 fontWeight="500" color="inherit">
                    {t('Learn more')}
                  </P12>
                </ButtonRounded>
              </Box>
            </Box>
          )}
        </Box>
      </Box>

      <Box mt="auto" width="100%">
        <CustomButtonRounded
          variant="contained"
          color={disabled ? 'secondary' : 'primary'}
          type="button"
          disabled={disabled}
          onClick={handleIntercom}
        >
          <P14B color="inherit">{t(disabled ? 'Selected' : 'Upgrade')}</P14B>
        </CustomButtonRounded>
      </Box>
    </StyledPlanCardWrapper>
  );
};

PlanCard.propTypes = {
  handleIntercom: PropTypes.func.isRequired,
  handleDevZone: PropTypes.func.isRequired,
  data: PropTypes.shape({
    description: PropTypes.string,
    icon: PropTypes.func,
    plan: PropTypes.string,
    sdkRequired: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  activePlan: PropTypes.string.isRequired,
};

export default PlanCard;
