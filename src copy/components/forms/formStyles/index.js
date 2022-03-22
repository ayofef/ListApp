import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';

export const FieldsWrapper = styled.div`
  width: 100%;
`;

export const useFormStyle = makeStyles({
  root: { marginTop: 18 },
});
export const FieldRow = styled.div`
  display: inline-flex;
  align-items: flex-start;
  flex-direction: column;
  align-self: flex-start;
`;
export const SearchFormWrapper = styled.div`
  padding: ${({ padding }) => padding || ''};
  width: ${({ width }) => width || ''};
`;
