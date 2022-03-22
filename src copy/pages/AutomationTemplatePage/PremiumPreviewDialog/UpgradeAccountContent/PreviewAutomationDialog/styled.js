import styled from 'styled-components';

export const StyledVideoWrapper = styled.div`
  display: block;
  width: 900px;
  margin: 0 auto;

  & > div {
    transform: scale(1.5);
  }

  & > img {
    transform: scale(0);
  }
`;
