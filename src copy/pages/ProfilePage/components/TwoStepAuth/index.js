import React from 'react';
import { bool, oneOf } from 'prop-types';
import values from 'lodash/values';
import { useTranslation } from 'react-i18next';
import { TitleContainer, StyledSection, MainContainerWithBorder } from '../../styled';
import { L16B } from '../../../../components/atoms/Typography/L16B';
import AuthenticationBox from './AuthenticationBox';
import { MFA_TYPE, TWO_STEP_AUTH } from './constant';

const TwoStepAuth = ({ mfaType, getMeLoading }) => {
  const { t } = useTranslation();

  return (
    <StyledSection>
      <TitleContainer>
        <L16B>{t('2-Step Auth')}</L16B>
      </TitleContainer>
      <MainContainerWithBorder>
        {TWO_STEP_AUTH.map(({ type, icon, text }) => {
          return (
            <AuthenticationBox
              key={type}
              icon={icon}
              text={text}
              enabled={type === mfaType}
              getMeLoading={getMeLoading}
            />
          );
        })}
      </MainContainerWithBorder>
    </StyledSection>
  );
};

TwoStepAuth.propTypes = {
  getMeLoading: bool.isRequired,
  mfaType: oneOf(values(MFA_TYPE)).isRequired,
};

export default TwoStepAuth;
