import styled, { css } from 'styled-components';

const StyledWrapper = styled.div`
  padding: 0 20px !important;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  transition: height 0.3s ease-out;
  height: 93px !important;
  will-change: height;
  overflow: hidden;

  ${({ isActive, contentHeight }) =>
    isActive &&
    css`
      height: ${`${93 + contentHeight + 24}px`} !important;
      padding-bottom: 36px !important;
    `};

  & button {
    cursor: pointer;
    background-color: #fff;

    outline: none;
    border: none;

    padding: 6px 0;
  }
`;

export { StyledWrapper };
