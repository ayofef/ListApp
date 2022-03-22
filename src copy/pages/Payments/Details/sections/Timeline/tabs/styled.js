import styled from 'styled-components';
import THEME from '../../../../../../constants/theme';
import { TIMELINE_STATUS_MAP } from './constant';

export const LI = styled.div`
  position: relative;
  padding: 11px 0 10px 45px;
  margin-bottom: 3px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  ${({ status }) => (status === TIMELINE_STATUS_MAP.IN_PROGRESS && 'background: #F3FBF7;') || ''};

  > div {
    &:first-child {
      z-index: 2;
    }
  }
`;

export const TimetableLine = styled.div`
  position: absolute;
  background-color: ${THEME.greyColors.grey16};
  height: calc(100% - 40px);
  top: 10px;
  left: 24px;
  width: 1px;
  z-index: 1;
`;
