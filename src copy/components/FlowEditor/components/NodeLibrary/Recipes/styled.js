import styled from 'styled-components';
import THEME from '../../../../../constants/theme';

const StyledRecipesWrapper = styled.div`
  padding: 20px 20px 1px 20px;
  height: calc(100% - 164px);
  overflow-y: auto;

  & > :not(:last-child) {
    margin-bottom: 16px;
  }
`;

const StyledFilterWrapper = styled.div`
  padding: ${({ $noBorder }) => ($noBorder ? 'none' : '16px 20px')};
  border-bottom: ${({ $noBorder }) => ($noBorder ? 'none' : `1px solid ${THEME.greyColors.grey5}`)};

  & .MuiInputBase-root.MuiOutlinedInput-root {
    #recipe-filter {
      color: ${THEME.greyColors.grey17};
    }

    & .MuiSvgIcon-root.MuiSelect-icon {
      color: ${THEME.greyColors.grey17};
    }
  }
`;

export { StyledFilterWrapper, StyledRecipesWrapper };
