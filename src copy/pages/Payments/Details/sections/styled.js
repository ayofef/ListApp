import styled from 'styled-components';
import THEME from '../../../../constants/theme';

const StyledMetadataWrapper = styled.div`
  background-color: #282a36;
  border-radius: 10px;
  ${({ $transform }) => $transform && `transform: ${$transform}`};
`;

const StyledMetaDataHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${THEME.primaryColors.white};
  border: 1px solid rgba(193, 195, 198, 0.3);
  padding: 0 8px 0 16px;
  height: 44px;

  p {
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    position: relative;
    padding-top: 9px;

    &::after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 1px;
      background-color: ${THEME.primaryColors.white};
      top: 0;
      left: 0;
      transform: translateY(37px);
    }
  }
`;

const StyledJsonBlockWrapper = styled.div`
  padding: 16px;
  max-height: 460px;
  overflow: auto;

  .object-key {
    color: ${THEME.primaryColors.white} !important;
    & > * {
      color: ${THEME.primaryColors.white} !important;
    }
  }

  .string-value {
    color: #ff79c6 !important;
  }

  .icon-container {
    .collapsed-icon,
    .expanded-icon {
      svg {
        color: ${THEME.primaryColors.white} !important;
      }
    }
  }
`;

const StyledCopyButton = styled.div`
  background-color: rgba(255, 255, 255, 0);
  padding: 6px 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease-out;
`;

export { StyledJsonBlockWrapper, StyledCopyButton, StyledMetadataWrapper, StyledMetaDataHeader };
