import styled from 'styled-components';

const StyledCategoryIcons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > :not(:first-child) {
    margin-top: -4px;
  }
`;

const StyledIcon = styled.div`
  display: inline-block;
  position: relative;
  z-index: ${({ index }) => index};
`;
export { StyledCategoryIcons, StyledIcon };
