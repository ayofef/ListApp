import React from 'react';
import { bool, string } from 'prop-types';
import { capitalize } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Skeleton from '@material-ui/lab/Skeleton';
import { L16B } from '../../../../components/atoms/Typography/L16B';
import { L14 } from '../../../../components/atoms/Typography/L14';
import { TitleContainer, StyledSection, MainContainer } from '../../styled';

const Role = ({ role, getMeLoading }) => {
  const { t } = useTranslation();

  return (
    <StyledSection>
      <TitleContainer>
        <L16B>{t('Role')}</L16B>
      </TitleContainer>

      <MainContainer>
        {getMeLoading ? (
          <Skeleton height="24px" width="70px" animation="wave" />
        ) : (
          <L14 noHover>{t(capitalize(role.toLowerCase()))}</L14>
        )}
      </MainContainer>
    </StyledSection>
  );
};

Role.propTypes = {
  role: string.isRequired,
  getMeLoading: bool.isRequired,
};

export default Role;
