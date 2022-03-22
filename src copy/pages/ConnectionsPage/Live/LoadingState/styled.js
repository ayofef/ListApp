import styled from 'styled-components';

export const SkeletonFlex = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 80px;

  & > :not(:last-child) {
    margin-right: 16px;
  }
`;
