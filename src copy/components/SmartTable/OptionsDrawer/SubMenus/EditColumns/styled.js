import styled from 'styled-components';
import { FlexContainer } from '../../../../atoms/flex/FlexContainer';

const StyledWrapper = styled.div`
  width: 100%;
  padding-top: 16px;
`;

const StyledButton = styled.div`
  padding: 0;
  margin: 32px 0 16px 0;
  background: none;
  outline: none;
  border: none;
  cursor: pointer;
`;

const StyledListItem = styled(FlexContainer)`
  .dragHandler {
    opacity: 0;
    transition: all 0.3s ease-out;
  }
  .visibilityIcon {
    cursor: pointer;
  }
  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: -23px;
    width: calc(100% + 42px);
    height: 100%;
    background-color: #e4ddff;
    border-radius: 6px;
    z-index: -1;
    opacity: 0;
    transition: all 0.3s ease-out;
  }
  :hover {
    &::before {
      opacity: 1;
    }
    & .dragHandler {
      opacity: ${({ checked }) => (checked ? 1 : 0)};
    }
  }
`;

export { StyledWrapper, StyledListItem, StyledButton };
