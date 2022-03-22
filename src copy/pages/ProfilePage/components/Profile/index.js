import React from 'react';
import { bool } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { TitleContainer, StyledSection, MainContainer } from '../../styled';
import { L16B } from '../../../../components/atoms/Typography/L16B';
import ProfileForm from '../../EditProfileForm/ProfileForm';
import { userPropType } from '../../constant';

const Profile = ({ user, getMeLoading }) => {
  const { t } = useTranslation();

  const profileValues = {
    name: user.name || '',
    email: user.email?.confirmed ? user.email?.address : '',
    role: user.role || '',
    avatarFileData: user.avatar || '',
  };

  return (
    <StyledSection>
      <TitleContainer>
        <L16B>{t('Profile')}</L16B>
      </TitleContainer>
      <MainContainer>
        <ProfileForm initialValues={profileValues} getMeLoading={getMeLoading} />
      </MainContainer>
    </StyledSection>
  );
};

Profile.propTypes = {
  getMeLoading: bool.isRequired,
  user: userPropType.isRequired,
};

export default Profile;
