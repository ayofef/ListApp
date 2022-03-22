import React from 'react';
import { string, func, bool } from 'prop-types';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import { ButtonWrap } from './SlackButton';
import { GoogleIcon } from '../../../assets/icons';
import CircularLoader from '../CircularLoader/CircularLoader';
import THEME from '../../../constants/theme';

const StyledWrapper = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    font-size: 14px;
    font-family: HelveticaNow, sans-serif !important;
    color: #000;
    font-weight: 700;
  }
  svg {
    position: absolute;
    left: 0;
  }
`;

const GoogleAuthButton = ({ handleClick, children, loading }) => (
  <ButtonWrap role="button" onClick={handleClick}>
    <StyledWrapper>
      {loading ? (
        <CircularLoader size="16px" bgcolor={THEME.primaryColors.primary} />
      ) : (
        <>
          <GoogleIcon width="55px" height="55px" />
          <Box component="span" ml="-8px" color="#393a3f" fontWeight="500">
            {children}
          </Box>
        </>
      )}
    </StyledWrapper>
  </ButtonWrap>
);

GoogleAuthButton.propTypes = {
  children: string.isRequired,
  handleClick: func.isRequired,
  loading: bool.isRequired,
};

export default GoogleAuthButton;
