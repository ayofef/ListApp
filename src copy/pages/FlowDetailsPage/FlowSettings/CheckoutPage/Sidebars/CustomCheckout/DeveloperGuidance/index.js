import React from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import CallMadeIcon from '@material-ui/icons/CallMadeRounded';

import { StyledWrapper, StyledHeader, StyledCard } from './styled';
import {
  P14B,
  P12,
  //  StyledCheck
} from '../../../../../../../components/atoms';
import { Info } from '../../../../../../../assets/icons';
import THEME from '../../../../../../../constants/theme';
// import CheckIcon from '../../../../../../../assets/icons/FlowStages/Check';
import { DEVELOPER_GUIDANCE } from './constant';
import { useCheckoutContext } from '../../../checkoutContext';

const isChecked = false;

const DeveloperGuidance = () => {
  const { t } = useTranslation();
  const { active } = useCheckoutContext();

  return (
    <StyledWrapper>
      <StyledHeader>
        <P14B color="#fff">{t('Developer Guidance')}</P14B>

        <Info fill={THEME.greyColors.grey8} />
      </StyledHeader>

      {DEVELOPER_GUIDANCE[active]?.map((guidance, index) => {
        const number = index + 1;

        return (
          <StyledCard
            key={guidance?.title}
            href={guidance?.link}
            target="_blank"
            rel="noreferrer noopener"
            isChecked={isChecked}
            index={index}
          >
            <div className="guidance__step_indicator">
              {/* <div className="guidance__step_indicator__icon">
                &nbsp;
                {isChecked && (
                  <StyledCheck>
                    <CheckIcon />
                  </StyledCheck>
                )}
              </div> */}
              <P12 fontWeight="600" color={THEME.greyColors.grey1}>
                {t('STEP')}&nbsp;{number}
              </P12>
            </div>

            <Box display="flex" justifyContent="space-between" alignItems="flex-end">
              <Box maxWidth="225px">
                <P12 fontWeight="600" color="rgba(120, 127, 136, 0.75)" margin="0 0 4px 0">
                  {t(guidance?.sdk)}
                </P12>
                <P14B>{t(guidance?.title)}</P14B>
              </Box>

              <Box className="guidance__call-made-icon">
                <CallMadeIcon color="inherit" fontSize="inherit" />
              </Box>
            </Box>
          </StyledCard>
        );
      })}
    </StyledWrapper>
  );
};

export default DeveloperGuidance;
