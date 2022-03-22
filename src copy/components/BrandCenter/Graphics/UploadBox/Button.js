import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Img } from '../../../../assets/icons';

import { StyledButton } from './styled';

const UploadButton = ({ graphics, handleClick, title, modal }) => {
  const { t } = useTranslation();
  const isFavicon = useMemo(() => title === 'favicon', [title]);

  return (
    <StyledButton
      favicon={isFavicon ? 1 : 0}
      modal={modal ? 1 : 0}
      color="inherit"
      variant="text"
      type="button"
      onClick={handleClick}
    >
      {!modal && <Img fill="#787F88" />}
      {graphics ? t(`Update ${title}`) : t(`Browse ${title}`)}
    </StyledButton>
  );
};

UploadButton.propTypes = {
  graphics: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  modal: PropTypes.bool,
};
UploadButton.defaultProps = {
  graphics: '',
  modal: false,
};

export default UploadButton;
