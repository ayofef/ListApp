import styled from 'styled-components';
import { SIDEBAR_WIDTH } from '../../constant';

const StyledSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 60px;

  & > :first-child {
    flex: 1;
    max-width: 600px;
    margin-right: 104px;
  }

  & > :last-child {
    max-width: 360px;
    flex: 1;
  }

  @media screen and (min-width: 1600px) {
    max-width: calc(1600px - ${SIDEBAR_WIDTH});
    margin: 0 auto 60px auto;
  }

  @media screen and (max-width: 1220px) {
    & > :first-child {
      margin-right: 30px;
    }
  }

  @media screen and (max-width: 1160px) {
    flex-direction: column-reverse;

    & > :first-child {
      max-width: unset;
      margin-right: 0;
      margin-bottom: 20px;
      width: 100%;
    }

    & > :last-child {
      width: 100%;
      max-width: unset;
      margin-bottom: 40px;
    }
  }
`;

export { StyledSection };
