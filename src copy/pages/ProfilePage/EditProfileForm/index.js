import { useMutation } from '@apollo/client';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { func, bool, string, shape } from 'prop-types';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { NotificationManager } from 'react-notifications';
import { CircleImage, ButtonLink, ImageFileInput, MaterialIconStyler } from '../../../components/atoms';
import ProfileForm from './ProfileForm';
import SecurityForm from './SecurityForm';
import THEME from '../../../constants/theme';
import { useModal } from '../../../hooks/modalHooks';
import ConfirmationModal from '../../../components/modals/ConfirmationModal';
import { UPDATE_MY_PROFILE } from '../../../utils/queries/customer/customerMutations';
import Tabs from '../../../components/common/Tabs';
import { HeaderWrapper } from '../styled';
import { StretchBlock } from '../../../components/atoms/flex/StretchBlock';
import { FlexContainer } from '../../../components/atoms/flex/FlexContainer';

const EditProfileForm = ({ user, refetchUser, openEditPhoto }) => {
  const { t } = useTranslation();
  const [updateProfile] = useMutation(UPDATE_MY_PROFILE);
  const [removePhotoModal, setRemovePhotoModal] = useModal(false);

  const tabs = useMemo(() => {
    const profileValues = {
      name: user.name,
      email: user.email.confirmed ? user.email.address : '',
      role: user.role || '',
      avatarFileData: user?.avatar,
    };

    return [
      {
        label: 'Profile',
        node: <ProfileForm initialValues={profileValues} refetchUser={refetchUser} />,
      },
      {
        label: 'Security',
        node: <SecurityForm email={user.email.address} />,
      },
    ];
  }, [user, refetchUser]);

  const removePhotoConfirmationText = {
    submit: t('buttonsText.Remove'),
    title: t('deleteConfirmation.title'),
    description: t('editProfile.photoForm.confirmRemovingDescription'),
  };

  const onUserAvatarSelected = (src) => {
    if (!src) {
      NotificationManager.error('Invalid image', 'Fail', 5000);
      return;
    }
    openEditPhoto(src);
  };

  const removePhotoNotify = (data) => {
    if (data.errors) return false;

    const title = t('uiMessages.success');
    const message = t('editProfile.photoForm.successRemoving');

    NotificationManager.success(message, title, 5000);

    return true;
  };

  const onConfirmRemovePhoto = async () => {
    setRemovePhotoModal(false);

    const data = await updateProfile({ variables: { removeAvatar: true } });

    const success = removePhotoNotify(data);
    if (success) {
      refetchUser();
    }
  };

  const onRemovePhotoClick = () => {
    setRemovePhotoModal(true);
  };

  return (
    <>
      <ConfirmationModal
        open={removePhotoModal}
        onConfirm={onConfirmRemovePhoto}
        onClose={() => setRemovePhotoModal(false)}
        onCancel={() => setRemovePhotoModal(false)}
        text={removePhotoConfirmationText}
      />
      <StretchBlock
        alignItems="stretch"
        justifyContent="flex-start"
        flexDirection="column"
        width="100%"
        minHeight="calc(100vh - 83px)"
      >
        <FlexContainer flexDirection="column" alignItems="flex-start">
          <HeaderWrapper margin="30px 0 60px 0">
            <FlexContainer width="100%" flexDirection="column" alignItems="flex-start" justifyContent="flex-start">
              <FlexContainer flexDirection="column">
                {user?.avatar ? (
                  <CircleImage src={user?.avatar} size={80} />
                ) : (
                  <MaterialIconStyler icon={AccountCircle} height="80px" width="80px" />
                )}
                <FlexContainer flexDirection="column" alignItems="flex-start" margin="8px 0 0">
                  {user?.avatar ? (
                    <ButtonLink onClick={user?.avatar && onRemovePhotoClick} color={THEME.primaryColors.main}>
                      {t('buttonsText.RemovePhoto')}
                    </ButtonLink>
                  ) : (
                    <ImageFileInput
                      fileSelected={onUserAvatarSelected}
                      margin="0 0 10px 0"
                      color={THEME.primaryColors.main}
                    >
                      {t('buttonsText.UploadPhoto')}
                    </ImageFileInput>
                  )}
                </FlexContainer>
              </FlexContainer>
            </FlexContainer>
          </HeaderWrapper>
          <Tabs tabs={tabs} />
        </FlexContainer>
      </StretchBlock>
    </>
  );
};

EditProfileForm.propTypes = {
  openEditPhoto: func.isRequired,
  user: shape({
    name: string,
    avatar: string,
    email: shape({
      confirmed: bool,
      address: string,
    }),
  }).isRequired,
  refetchUser: func.isRequired,
};

export default EditProfileForm;
