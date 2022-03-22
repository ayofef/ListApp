import styled, { css, keyframes } from 'styled-components';
import { LinearProgress, withStyles } from '@material-ui/core';
import THEME from '../../../../../constants/theme';
import { FlexContainer } from '../../../../../components/atoms/flex/FlexContainer';

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to{
      transform: rotate(360deg);
    }
`;

const spinner = css`
  animation: ${rotate} 1s linear infinite;
`;
const StyledDropZoneHoverCSS = css`
  p {
    color: ${THEME.primaryColors.primary};
  }
  svg {
    path {
      fill: ${THEME.primaryColors.primary};
    }
  }
`;
const StyledDropZone = styled.div`
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
  height: 80px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease-out;
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='rgba(232,232,232)' stroke-width='2' rx='8' ry='8' stroke-dasharray='6%2c 7' stroke-dashoffset='0' stroke-linecap='round'/%3e%3c/svg%3e");

  :hover {
    ${StyledDropZoneHoverCSS};
  }
  ${({ dragging }) => dragging && `${StyledDropZoneHoverCSS}`};

  &:focus {
    outline: none;
  }
`;

const StyledUploadIndicator = styled.div`
  position: fixed;
  bottom: 20px;
  right: 30px;
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
  z-index: 9999;
  box-shadow: 0 0 2px 2px rgba(155, 159, 171, 0.11);
  transition: all 0.2s ease-out;
  opacity: ${({ isLoading }) => (isLoading ? '1' : '0')};
  transform: ${({ isLoading }) => (isLoading ? 'translateX(0)' : 'translateX(400px)')};
  > :not(:first-child, :last-child) {
    margin-bottom: 8px;
  }
`;

const StyledProgress = withStyles({
  root: {
    backgroundColor: 'rgba(105,68,255,0.2)',
    borderRadius: '4px',
    marginTop: '4px',
  },
  bar: {
    backgroundColor: THEME.primaryColors.primary,
  },
})(LinearProgress);

const StyledSpinner = styled.div`
  width: 20px;
  height: 20px;
  color: #fff;
  box-sizing: border-box;
  padding: 2px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  transition: background-color 0.2s linear;
  ${({ isLoading }) => !isLoading && 'background-color: #1cce6a'};
  img {
    width: 100%;
    ${spinner};
  }
`;

const StyledAttachmentWrapper = styled(FlexContainer)`
  width: 100%;
  min-height: 48px;
  margin-bottom: 8px;

  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;

  &:not(:last-child) {
    border-bottom: 1px solid ${THEME.greyColors.grey200};
  }
`;

const StyledDownloadLink = styled.a`
  font-size: 14px;
  color: ${THEME.primaryColors.blackMain};
  text-decoration: none;

  &:hover {
    color: ${THEME.primaryColors.primary};
  }
`;

const DeleteAttachmentButton = styled.button`
  background-color: #ffffff;
  width: 40px;
  height: 38px;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 6px 6px;
  border-radius: 4px;
  margin: 0;
  border: none;
  outline: none;
  cursor: pointer;
  transform: translateX(12px);

  &:hover {
    svg {
      stroke: ${THEME.secondaryColors.secondary};

      path {
        stroke: ${THEME.secondaryColors.secondary};
      }
    }
  }
`;

export {
  StyledDropZone,
  StyledUploadIndicator,
  StyledProgress,
  StyledSpinner,
  StyledAttachmentWrapper,
  StyledDownloadLink,
  DeleteAttachmentButton,
};
