import styled from 'styled-components';

export const StyledEmailSections = styled.div`
  position: relative;

  & > [type='checkbox']:checked ~ aside {
    display: block;
  }
  & > [type='checkbox']:checked ~ div::before {
    background-color: #3023c8;
  }
  div {
    box-sizing: border-box;
  }

  & > div {
    position: relative;
    width: 100%;
    min-height: min-content;
    display: block;
    padding: ${({ padding }) => padding || 0};

    &::before {
      content: '';
      display: ${({ preview }) => (preview ? 'none' : 'block')};
      position: absolute;
      width: 16px;
      height: 16px;
      background-color: #c1c3c6;
      top: 50%;
      left: -48px;
      border-radius: 50%;
      transform: translateY(-50%);
      cursor: pointer;
    }

    &:focus {
      outline: none;

      ::before {
        background-color: #3023c8;
      }
    }
    &:hover::before,
    &:focus::before {
      background-color: #3023c8;
    }
  }
  & > input,
  & > label {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
`;
export const StyledSectionIndicator = styled.aside`
  margin: 0;
  position: absolute;
  top: 49%;
  left: -80px;
  transform: translate(-100%, -50%);
  transition: all 0.3s ease-out;
  display: none;
  padding: 16px;
  background-color: #fff;
  color: #787f88;
  box-shadow: 0px 0px 0px 2px rgba(155, 159, 171, 0.11);
  border-radius: 8px;

  a {
    color: #3023c8;

    :hover,
    :active {
      color: #3023c8;
      text-decoration: underline;
    }
  }
`;
