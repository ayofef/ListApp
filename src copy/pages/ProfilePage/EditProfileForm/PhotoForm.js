import { useMutation } from '@apollo/client';
import React, { useState, useRef } from 'react';
import isEmpty from 'lodash/isEmpty';
import ReactCrop from 'react-image-crop';
import styled from 'styled-components';
import { func, string, shape } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { NotificationManager } from 'react-notifications';
import { image64toCanvas, getFileExtensionFromBase64, compressBase64Image } from '../../../utils/helpers';
import 'react-image-crop/dist/ReactCrop.css';
import { Button, P16B, P14, BlockWrap } from '../../../components/atoms';
import { UPDATE_MY_PROFILE } from '../../../utils/queries/customer/customerMutations';
import { MUTATE_OPTIONS } from '../constant';
import { TOAST_TIMEOUT } from '../../../constants/toastTimeout';
import { HeaderWrapper } from '../styled';
import { FlexContainer } from '../../../components/atoms/flex/FlexContainer';
import { StretchBlock } from '../../../components/atoms/flex/StretchBlock';

const CropWrapper = styled(FlexContainer)`
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.05);
  overflow: hidden;
  & img {
    max-height: 400px;
    max-width: 400px;
  }
`;

const StyledReactCrop = styled(ReactCrop)`
  background-color: transparent;
`;

const CanvasWrapper = styled.canvas`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 15px;
`;

const PhotoForm = ({ username, photoSrc, setIsEditPhotoOpen }) => {
  const { t } = useTranslation();
  const preview = useRef(null);
  const cropRef = useRef(null);
  const [updateMyProfile, { loading }] = useMutation(UPDATE_MY_PROFILE, MUTATE_OPTIONS);
  const [crop, setCrop] = useState({
    unit: '%',
    x: 0,
    y: 0,
    height: 30,
    width: 30,
    aspect: 1,
  });

  const onCropChange = (_crop) => {
    setCrop(_crop);
  };

  const onCropComplete = (_crop, pixelCrop) => {
    const { imageRef } = cropRef.current;
    image64toCanvas(preview.current, imageRef, photoSrc.imageData, pixelCrop);
  };

  const notifyUser = (data) => {
    if (!isEmpty(data.errors)) {
      const { code } = data.errors[0].extensions;
      const message = t(code);
      const title = t('uiMessages.failed');

      NotificationManager.error(message, title, TOAST_TIMEOUT);
      return false;
    }

    const message = t('editProfile.photoForm.success');
    const title = t('uiMessages.success');

    NotificationManager.success(message, title, TOAST_TIMEOUT);
    return true;
  };

  const openProfileForm = () => {
    setIsEditPhotoOpen(false);
  };

  const confirmChanges = (data) => {
    const success = notifyUser(data);
    if (success) {
      setIsEditPhotoOpen(false);
    }
  };

  const onSubmit = async () => {
    const fileExt = getFileExtensionFromBase64(photoSrc.imageData);
    const imageData64 = preview.current.toDataURL(`image/${fileExt}`, 0.8);
    const compressedBase64Data = await compressBase64Image(imageData64, 512, 512);
    const data = await updateMyProfile({
      variables: {
        avatarFileData: compressedBase64Data,
      },
    });

    confirmChanges(data);
  };

  return (
    <StretchBlock alignItems="stretch" justifyContent="flex-start" flexDirection="column">
      <HeaderWrapper>
        <FlexContainer width="100%" justifyContent="space-between">
          <P16B>{t('Crop your image')}</P16B>
        </FlexContainer>
      </HeaderWrapper>

      <CropWrapper fullWidth margin="0 0 25px 0" height="400px">
        <StyledReactCrop
          ref={cropRef}
          src={photoSrc.imageData}
          crop={crop}
          onChange={onCropChange}
          onComplete={onCropComplete}
          minHeight={50}
          minWidth={50}
          keepSelection
        />
      </CropWrapper>

      <FlexContainer justifyContent="flex-start">
        <CanvasWrapper ref={preview} />
        <P14>{username}</P14>
      </FlexContainer>
      <FlexContainer width="100%" margin="auto 0 0 0" justifyContent="flex-end">
        <BlockWrap margin="30px 16px 0">
          <Button ghost onClick={openProfileForm}>
            {t('buttonsText.Cancel')}
          </Button>
        </BlockWrap>

        <BlockWrap margin="30px 0 0">
          <Button className="blue" loading={loading} onClick={onSubmit}>
            {t('buttonsText.Save')}
          </Button>
        </BlockWrap>
      </FlexContainer>
    </StretchBlock>
  );
};

PhotoForm.propTypes = {
  photoSrc: shape({ imageData: string.isRequired, fileName: string.isRequired }).isRequired,
  username: string.isRequired,
  setIsEditPhotoOpen: func.isRequired,
};

export default PhotoForm;
