import React from 'react';
import { func, bool } from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import Skeleton from '@material-ui/lab/Skeleton';
import { NotificationManager } from 'react-notifications';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import THEME from '../../../../constants/theme';
import Pencil from '../../../../assets/icons/Profile/Pencil';
import CircleImage from '../../../../components/table/CircleImage';
import { ImageFileInput, ButtonLink } from '../../../../components/atoms';
import { L16B } from '../../../../components/atoms/Typography/L16B';
import { TitleContainer, StyledSection, MainContainer } from '../../styled';
import { AvatarContainer, PencilIconContainer, CircularSkeleton } from './styled';
import { userPropType } from '../../constant';
import { TOAST_TIMEOUT } from '../../../../constants/toastTimeout';

const ON_USER_AVATAR_SELECTED_TITLE = 'Invalid image';
const ON_USER_AVATAR_SELECTED_MESSAGE = 'Fail';

const Photo = ({ user, setUserPhoto, onEditPhotoOpen, setRemovePhotoModal, getMeLoading }) => {
  const { t } = useTranslation();

  const openEditPhoto = (fileData) => {
    setUserPhoto(fileData);
    onEditPhotoOpen();
  };

  const onUserAvatarSelected = (fileData) => {
    if (!fileData) {
      NotificationManager.error(t(ON_USER_AVATAR_SELECTED_TITLE), t(ON_USER_AVATAR_SELECTED_MESSAGE), TOAST_TIMEOUT);
      return;
    }
    openEditPhoto(fileData);
  };

  const onRemovePhotoClick = () => {
    setRemovePhotoModal(true);
  };

  return (
    <StyledSection>
      <TitleContainer>
        <L16B>{t('Photo')}</L16B>
      </TitleContainer>

      <MainContainer>
        <AvatarContainer>
          {getMeLoading && (
            <CircularSkeleton>
              <Skeleton height="80px" width="80px" animation="wave" />
            </CircularSkeleton>
          )}

          {!getMeLoading && (
            <ImageFileInput fileSelected={onUserAvatarSelected}>
              <CircleImage
                logo={user.avatar}
                text={user.name}
                size={80}
                textOnly={isEmpty(user.avatar)}
                bgColor={THEME.greyColors.grey5}
                color={THEME.secondaryColors.black2}
              />
              <PencilIconContainer>
                <Pencil />
              </PencilIconContainer>
            </ImageFileInput>
          )}
        </AvatarContainer>

        <Box textAlign="left">
          {user.avatar && (
            <ButtonLink onClick={onRemovePhotoClick} color={THEME.primaryColors.main} margin="12px 0 0 0">
              {t('buttonsText.RemovePhoto')}
            </ButtonLink>
          )}
        </Box>
      </MainContainer>
    </StyledSection>
  );
};

Photo.propTypes = {
  getMeLoading: bool.isRequired,
  user: userPropType.isRequired,
  setUserPhoto: func.isRequired,
  onEditPhotoOpen: func.isRequired,
  setRemovePhotoModal: func.isRequired,
};

export default Photo;
