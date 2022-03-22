import React from 'react';
import { string, bool, node, func } from 'prop-types';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import slackLogo from '../../../assets/img/slackLogo.svg';
import THEME from '../../../constants/theme';
import CircularLoader from '../CircularLoader/CircularLoader';
import { LinkWrapper } from '../LinkWrapper/LinkWrapper';

export const ButtonWrap = styled.div`
  padding: ${({ padding }) => padding};
  border: 1px solid ${THEME.greyColors.grey3};
  border-radius: 8px;
  box-sizing: border-box;
  width: ${({ width }) => width};
  display: flex;
  justify-content: space-around;
  height: 48px;
  overflow: hidden;
  outline: none;
  cursor: pointer;
  position: relative;
  ${({ backgroundColor }) => backgroundColor && `background-color:${backgroundColor}`};
  a {
    display: flex;
    align-items: center;
    justify-content: space-around;
    text-decoration: none;
    padding: ${({ smaller }) => (smaller ? '8px 10px' : '10px 10px')};
    width: 100%;
    &:hover {
      text-decoration: none;
    }
  }
  p {
    color: #000;
    font-weight: 700;
    font-size: 14px;
    font-family: Inter, sans-serif !important;
  }
  img {
    position: absolute;
    left: 16px;
  }
`;

const SlackButton = ({ url, children, loading, width, smaller, onClick }) => {
  return (
    <ButtonWrap width={width} padding={loading ? '12px 10px' : '0'} smaller={smaller}>
      {loading ? (
        <CircularLoader size="16px" bgcolor={THEME.primaryColors.primary} />
      ) : (
        <LinkWrapper disabled href={url} onClick={onClick}>
          <Box display="flex" alignItems="center" component="span" color="#393a3f" fontWeight="500">
            <Box component="img" src={slackLogo} alt="slack logo" maxWidth="20px" mr="8px" />
            {children}
          </Box>
        </LinkWrapper>
      )}
    </ButtonWrap>
  );
};

SlackButton.propTypes = {
  children: node.isRequired,
  url: string,
  loading: bool,
  smaller: bool,
  width: string,
  onClick: func,
};

SlackButton.defaultProps = {
  url: '',
  loading: false,
  smaller: false,
  width: 'auto',
  onClick: () => {},
};

export default SlackButton;
