import styled from 'styled-components';
import THEME from '../../../constants/theme';

export const StyledTasksWrapper = styled.div`
  width: 100%;
  max-width: 530px;

  position: relative;
  height: 100%;
  min-height: calc(100vh - 230px);

  @media screen and (max-width: 700px) {
    margin: 0 auto;
  }

  &::after {
    content: '';
    display: block;
    position: absolute;

    width: 1px;
    height: 100%;

    top: 0;
    left: -12px;

    background-color: ${THEME.greyColors.grey2};

    @media screen and (max-width: 700px) {
      opacity: 0;
      visibility: hidden;
    }
  }
`;
