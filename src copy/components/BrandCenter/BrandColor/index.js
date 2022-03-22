import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';

import Modal from '../Modal';
import Palette from './Palette';
import Swatches from './Swatches';

const BrandColor = ({ color, handleColorPick }) => {
  const [showModal, setShowModal] = useState(false);
  const [initialColor, setInitialColor] = useState(color);

  const { t } = useTranslation();

  const openModal = () => setShowModal(!showModal);

  const handleCancel = () => {
    setInitialColor(color);
    setShowModal(false);
  };
  const handleSave = () => {
    handleColorPick(initialColor);
    setShowModal(false);
  };

  return (
    <>
      <Palette color={color} openModal={openModal} />
      <Modal
        showModal={showModal}
        handleModal={openModal}
        title={t('Pick your accent color')}
        handleCancel={handleCancel}
        handleSave={handleSave}
        description={t('This color will be used for buttons, links, and other highlights.')}
      >
        <Box display="flex" flexWrap="nowrap">
          <Box>
            <Palette color={initialColor} editable setInitialColor={setInitialColor} />
          </Box>
          <Swatches handleChange={setInitialColor} />
        </Box>
      </Modal>
    </>
  );
};

BrandColor.propTypes = {
  color: PropTypes.string.isRequired,
  handleColorPick: PropTypes.func.isRequired,
};

export default BrandColor;
