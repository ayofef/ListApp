import PropTypes from 'prop-types';
import React from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@material-ui/icons/Close';

import { P16B } from '../../../components/atoms';
import { BORDER_COLOR } from '../constant';
import { StyledIconButton } from '../../../components/atoms/Buttons/StyledIconButton';

const TITLE = 'Upgrade Flow';

const Header = ({ handleClose }) => {
  const { t } = useTranslation();
  return (
    <Box
      width="100%"
      bgcolor="#fff"
      boxSizing="border-box"
      height="63px"
      textAlign="center"
      display="flex"
      justifyContent="center"
      alignItems="center"
      borderBottom={`0.5px solid ${BORDER_COLOR}`}
      position="relative"
      flexShrink={0}
    >
      <P16B>{t(TITLE)}</P16B>
      <Box onClick={handleClose} position="absolute" right="16px" top="11px">
        <StyledIconButton position="absolute" top="">
          <CloseIcon />
        </StyledIconButton>
      </Box>
    </Box>
  );
};

Header.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default Header;
