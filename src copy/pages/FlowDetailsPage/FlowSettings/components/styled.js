import styled from 'styled-components';

import { SIDEBAR_WIDTH, BORDER_COLOR } from '../../constant';

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 60px;

  & > :first-child {
    max-width: 360px;
    margin-right: 106px;
  }

  & > :last-child {
    flex: 1;
    max-width: 600px;
  }

  @media screen and (min-width: 1600px) {
    max-width: calc(1600px - ${SIDEBAR_WIDTH});
    margin: 0 auto 60px auto;
  }

  @media screen and (max-width: 1210px) {
    & > :first-child {
      margin-right: 50px;
    }
  }
  @media screen and (max-width: 1150px) {
    flex-direction: column;

    & > :first-child {
      max-width: unset;
      margin-right: 0;
      margin-bottom: 20px;
    }

    & > :last-child {
      flex: 1;
      width: 100%;
      max-width: unset;
    }
  }
`;

const StyledBar = styled.div`
  width: 100%;
  border: 0.5px solid ${BORDER_COLOR};
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 8px;
  height: 92px;
  text-align: left;

  padding: 0 24px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.02);

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export { StyledWrapper, StyledBar };
