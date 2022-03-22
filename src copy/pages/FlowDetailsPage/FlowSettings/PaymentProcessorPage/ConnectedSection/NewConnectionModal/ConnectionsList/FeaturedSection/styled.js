import styled, { css } from 'styled-components';
import THEME from '../../../../../../../../constants/theme';

const COMMON_GRADIENT_STYLES = css`
  & .featured-item-text {
    & p:first-child {
      color: #fff !important;
    }
    & p:last-child {
      color: rgba(255, 255, 255, 0.75);
    }
  }

  & .MuiButton-root {
    background-color: ${THEME.greyColors.grey12} !important;
    span {
      color: ${THEME.primaryColors.primary} !important;
    }

    &:hover {
      background-color: ${THEME.greyColors.grey5} !important;
    }
  }
`;
const GRADIENT_STYLES = css`
  &:nth-child(1) {
    @supports (background: linear-gradient(106.01deg, #9370b3 0%, #e37250 100%)) {
      background: linear-gradient(106.01deg, #9370b3 0%, #e37250 100%);
      ${COMMON_GRADIENT_STYLES};
    }
  }

  &:nth-child(2) {
    @supports (background: linear-gradient(106.01deg, #446deb 0%, #aa789b 100%)) {
      background: linear-gradient(106.01deg, #446deb 0%, #aa789b 100%);
      ${COMMON_GRADIENT_STYLES};
    }
  }
  &:nth-child(3) {
    @supports (background: linear-gradient(106.01deg, #cc6e6a 0%, #436ceb 100%)) {
      background: linear-gradient(106.01deg, #cc6e6a 0%, #436ceb 100%);
      ${COMMON_GRADIENT_STYLES};
    }
  }
`;

const StyledFeaturedConnection = styled.div`
  height: 180px;
  background-color: ${THEME.primaryColors.primaryLight};
  box-sizing: border-box;
  padding: 24px;
  border-radius: 8px;
  width: 330px;
  display: flex;
  flex-direction: column;
  margin-right: 16px;

  ${GRADIENT_STYLES}
`;

export { GRADIENT_STYLES, StyledFeaturedConnection };
