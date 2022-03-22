import styled from 'styled-components';
import { FlexContainer } from '../../../atoms/flex/FlexContainer';

export const StyledLabel = styled.label`
  width: 100%;
  position: relative;
  margin: 0 auto;
  display: block;
  text-align: center;
  cursor: pointer;

  input[type='radio'] {
    position: absolute;
    opacity: 0;
    visibility: hidden;

    :checked ~ div {
      background-color: rgba(220, 211, 255, 0.9);
    }
  }
`;

export const StyledFlexWrapper = styled(FlexContainer)`
  & > :nth-child(2) {
    display: flex;
    ::before,
    ::after {
      content: '';
      position: relative;
      display: block;
      width: 2px;
      top: 0;
      left: 0;
      background-color: rgba(155, 159, 171, 0.11);
    }
  }
`;

export const StyledWrapper = styled.div`
  & > :not(:last-child) {
    margin-bottom: 16px;
  }
`;
