import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

export const ConnectBankWrap = styled.div`
  .connect {
    &__container {
      min-height: 100vh;
      padding: 54px 112px;
      justify-content: flex-start;
    }
    &__info {
      position: relative;
      overflow: hidden;
      min-height: 100vh;
      padding: 54px 112px;
      > div {
        position: relative;
        z-index: 1;
      }
    }
  }
`;

export const AbsImage = styled.img`
  position: absolute;
  bottom: -16%;
  right: 0;
`;

export const StyledGrid = styled(Grid)`
  background-color: ${({ backgroundColor }) => backgroundColor || 'transparent'};
`;
