import styled from 'styled-components';
import { Cron } from 'react-js-cron';
import THEME from '../../constants/theme';

const StyledCron = styled(Cron)`
  flex-direction: column;
  align-items: initial;
  & span {
    color: ${THEME.primaryColors.black};
  }
  .react-js-cron-select {
    &.ant-select {
      border-radius: 8px;
      background-color: #f5f6f7;
      margin-left: 0;
      width: 100%;

      .ant-select-selector {
        height: 40px;
        padding-left: 12px;
        border: none;
        border-radius: inherit;
        background-color: transparent;

        .ant-select-selection-item {
          display: flex;
          align-items: center;
        }
      }
    }
  }
  .react-js-cron-field {
    flex: 1;
    flex-direction: column;
    align-items: flex-start;
    & > span {
      margin-left: 0;
      margin-bottom: 8px;
      font-size: 12px;
      font-weight: 600;
    }
  }
  .react-js-cron-minutes {
    margin-left: 8px;
    & > span {
      visibility: hidden;
    }
  }
`;

export { StyledCron };
