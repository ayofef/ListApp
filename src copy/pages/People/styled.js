import styled from 'styled-components';
import THEME from '../../constants/theme';

export const SearchLine = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  border-bottom: 1px solid ${THEME.greyColors.grey4};
  padding-bottom: 12px;
  padding-top: 16px;

  input::placeholder {
    color: ${THEME.greyColors.grey9} !important;
    opacity: 1;
  }
`;
