import styled from 'styled-components';
import Drawer from '@material-ui/core/Drawer';

export const StyledDrawer = styled(Drawer)`
  & .MuiBackdrop-root {
    background-color: rgba(193, 195, 198, 0.4) !important;
  }

  & .MuiDrawer-paper {
    background: #fff;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.04), 0 10px 14px rgba(0, 0, 0, 0.04);
  }
`;
