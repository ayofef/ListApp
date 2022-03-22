import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';

import { StyledBox, StyledButton } from './styled';
import AddAction from '../../../assets/img/AddActionButon.svg';
import ActionButton from './ActionButton';
import ActionForm from './ActionForm';

const EmptyBlock = ({ brandColor, buttonType, buttonText, buttonLink, preview, previewModal, handleSave }) => {
  const showButton = buttonText && buttonLink ? 1 : 0;
  const [showAddButton, setShowAddButton] = useState(0);
  const [showActionForm, setShowActionForm] = useState(0);
  const [showAddMenu, setShowAddMenu] = useState(false);

  const [actionButton, setActionButton] = useState(showButton);
  const [actionText, setActionText] = useState(buttonText);
  const [actionLink, setActionLink] = useState(buttonLink);
  const displayActionButton = actionButton && (actionText || actionLink);

  const { t } = useTranslation();

  const handleShowAddButton = () => {
    setShowAddButton(1);
  };
  const handleHideButton = () => {
    setShowAddButton(0);
    setShowAddMenu(false);
  };
  const handleShowAddMenu = () => {
    setShowAddMenu(!showAddMenu);
  };

  const addActionButton = () => {
    setActionButton(true);
    setShowActionForm(1);
    setShowAddButton(0);
  };

  const handleBlur = () => {
    handleSave({ actionText, actionLink });
  };

  const handleHideActionForm = () => {
    setShowActionForm(0);
    handleBlur();
  };
  const handleFormEdit = () => {
    setShowActionForm(1);
  };
  const handleButtonDelete = () => {
    setActionText('');
    setActionLink('');
    setActionButton(false);
  };

  if (previewModal && !displayActionButton) {
    return null;
  }

  return (
    <Box
      minHeight="8px"
      position="relative"
      onMouseLeave={handleHideButton}
      onMouseEnter={handleShowAddButton}
      padding="20px 16px"
    >
      <ActionForm
        buttonLink={actionLink}
        buttonText={actionText}
        showForm={showActionForm}
        setText={setActionText}
        setLink={setActionLink}
        setBlur={handleHideActionForm}
        Zindex={500}
      />
      <StyledBox
        zIndex="100"
        position="absolute"
        top="50%"
        left="10px"
        show={showAddButton}
        onClick={handleShowAddMenu}
      >
        {showAddMenu ? (
          <ul>
            {actionButton && (actionText || actionLink) ? (
              <>
                <li>
                  <StyledButton onClick={handleFormEdit}>{t('Edit Button')}</StyledButton>
                </li>
                <li>
                  <StyledButton onClick={handleButtonDelete}>{t('Remove Button')}</StyledButton>
                </li>
              </>
            ) : (
              <li>
                <StyledButton onClick={addActionButton}>{t('Add Button')}</StyledButton>
              </li>
            )}
          </ul>
        ) : (
          !preview && <img src={AddAction} alt="add action button" />
        )}
      </StyledBox>
      <Box color="#fff" minHeight={preview && !displayActionButton ? '80px' : '100%'}>
        {displayActionButton && (
          <ActionButton
            brandColor={brandColor}
            type={buttonType}
            text={actionText}
            to={actionLink}
            preview={preview}
            previewModal={previewModal}
          />
        )}
      </Box>
    </Box>
  );
};

EmptyBlock.propTypes = {
  brandColor: PropTypes.string.isRequired,
  buttonType: PropTypes.string.isRequired,
  buttonText: PropTypes.string,
  buttonLink: PropTypes.string,
  preview: PropTypes.bool,
  previewModal: PropTypes.bool,
  handleSave: PropTypes.func,
};
EmptyBlock.defaultProps = {
  buttonText: '',
  buttonLink: '',
  preview: false,
  previewModal: false,
  handleSave: () => {},
};

export default EmptyBlock;
