import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import { useMutation } from '@apollo/client';
import { NotificationManager } from 'react-notifications';
import { useTranslation } from 'react-i18next';
import isEmpty from 'lodash/isEmpty';
import { H3 } from '../../components/atoms';
import { ProfileInnerWrapper } from './styled';
import { useGlobalContext } from '../../containers/App/context';
import PhotoForm from './EditProfileForm/PhotoForm';
import { useModal } from '../../hooks/modalHooks';
import { UPDATE_MY_PROFILE } from '../../utils/queries/customer/customerMutations';
import ConfirmationModal from '../../components/modals/ConfirmationModal';
import Photo from './components/Photo';
import Role from './components/Role';
import Profile from './components/Profile';
import Security from './components/Security';
import TwoStepAuth from './components/TwoStepAuth';
import { MUTATE_OPTIONS } from './constant';
import { TOAST_TIMEOUT } from '../../constants/toastTimeout';

const REMOVE_PHOTO_CONFIRMATION_TEXT = {
  submit: 'Remove',
  title: 'Confirmation',
  description: 'Remove profile photo?',
  cancel: 'Cancel',
};

const ProfilePage = () => {
  const { t } = useTranslation();
  const [userPhotoSrc, setUserPhoto] = useState(null);
  const [isEditPhotoOpen, setIsEditPhotoOpen] = useState(false);
  const [removePhotoModal, setRemovePhotoModal] = useModal(false);
  const { getMeData, getMeLoading } = useGlobalContext();
  const [updateProfile] = useMutation(UPDATE_MY_PROFILE);

  const user = getMeData?.me || {};

  const onConfirmRemovePhoto = async () => {
    setRemovePhotoModal(false);

    const data = await updateProfile({ variables: { removeAvatar: true }, ...MUTATE_OPTIONS });

    if (!isEmpty(data.error)) return;

    const title = t('uiMessages.success');
    const message = t('editProfile.photoForm.successRemoving');

    NotificationManager.success(message, title, TOAST_TIMEOUT);
  };

  const onEditPhotoOpen = () => {
    setIsEditPhotoOpen(true);
  };

  return (
    <Box>
      <H3 fontWeight="600" textAlign="left">
        {t('Profile')}
      </H3>

      <ProfileInnerWrapper>
        {!isEditPhotoOpen && (
          <>
            <Photo
              user={user}
              setUserPhoto={setUserPhoto}
              onEditPhotoOpen={onEditPhotoOpen}
              setRemovePhotoModal={setRemovePhotoModal}
              getMeLoading={getMeLoading}
            />
            <Role role={user.role} getMeLoading={getMeLoading} />
            <Profile user={user} getMeLoading={getMeLoading} />
            <Security email={user.email?.address} getMeLoading={getMeLoading} />
            <TwoStepAuth mfaType={user.mfaType} getMeLoading={getMeLoading} />

            <ConfirmationModal
              open={removePhotoModal}
              onConfirm={onConfirmRemovePhoto}
              text={REMOVE_PHOTO_CONFIRMATION_TEXT}
              onClose={() => setRemovePhotoModal(false)}
              onCancel={() => setRemovePhotoModal(false)}
            />
          </>
        )}

        {isEditPhotoOpen && (
          <Box width="100%">
            <PhotoForm username={user.name} photoSrc={userPhotoSrc} setIsEditPhotoOpen={setIsEditPhotoOpen} />
          </Box>
        )}
      </ProfileInnerWrapper>
    </Box>
  );
};

export default ProfilePage;
