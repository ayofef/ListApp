import styled, { css } from 'styled-components';
import Typography from '@material-ui/core/Typography';

const CSSFontSize = css`
  font-size: 12px !important;
`;

const StyledTypography = styled(Typography)`
  &.MuiTypography-root {
    ${CSSFontSize}
  }
`;

export { StyledTypography, CSSFontSize };
