import React from 'react';
import { string, bool } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { TitleContainer, StyledSection, MainContainer } from '../../styled';
import { L16B } from '../../../../components/atoms/Typography/L16B';
import SecurityForm from '../../EditProfileForm/SecurityForm';

const Security = ({ email, getMeLoading }) => {
  const { t } = useTranslation();

  return (
    <StyledSection>
      <TitleContainer>
        <L16B>{t('Security')}</L16B>
      </TitleContainer>
      <MainContainer>
        <SecurityForm email={email} getMeLoading={getMeLoading} />
      </MainContainer>
    </StyledSection>
  );
};

Security.propTypes = {
  getMeLoading: bool.isRequired,
  email: string.isRequired,
};
export default Security;
