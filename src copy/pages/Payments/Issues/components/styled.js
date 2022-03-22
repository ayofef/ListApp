import styled from 'styled-components';

export const StyledButton = styled.button`
  border: none;
  outline: none;
  padding: ${({ $padding }) => $padding || '6px 0px'};
  margin: 0;
  background: rgba(255, 255, 255, 0);
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  box-sizing: border-box;
  height: 100%;

  & > div {
    position: relative;
    z-index: 100;
  }

  &::before {
    content: '';
    position: absolute;
    display: block;
    background-color: #e6e9ec;
    width: ${({ $pseudoWidth }) => $pseudoWidth || '120%'};
    height: 100%;
    top: 0;
    left: 50%;
    z-index: 1;
    transform: translateX(-50%);
    border-radius: 4px;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease-out;
  }

  &:hover {
    &::before {
      opacity: 1;
      visibility: visible;
    }
  }
`;
