import styled, { css } from 'styled-components';
import THEME from '../../../constants/theme';
import { P14 } from '../../atoms';
import { FLOW_MONITOR_DETAILS_ITEM_CONTEXT } from '../constant';

/**
 * Calendar component had to be styled this way to match design system,
 * Comments are made on each sections styled
 * library - materialui-daterange-picker does not provided a style props to override styles
 */

const DATE_AND_MONTH_DROPDOWN_CSS = (nthChild3) => css`
  & div[class*='MuiPopover-paper MuiPaper-elevation'] {
    position: absolute !important;
    top: 12px !important;
    left: ${nthChild3 ? '-80px !important' : '-60px !important'};
    transform: none !important;
    min-width: 100px !important;
    min-height: 220px;

    li {
      font-size: 12px !important;
      font-weight: 600 !important;

      &:not(:last-child) {
        margin-bottom: 4px !important;
      }
    }
  }
`;

export const DATE_COMPONENT_CSS = css`
  & .wt-date-range-picker {
    & > div[class*='MuiPaper-root'] div div:last-child {
      & div[class*='MuiPaper-root materialui-daterange-picker-makeStyles-root'] {
        & div div[class*='materialui-daterange-picker-MuiGrid-justify-xs-space-between']:first-child {
          //calendar header

          & > div:first-child,
          > div:last-child {
            opacity: 0 !important;
          }

          & > div:nth-child(2),
          & > div:nth-child(3) {
            & div {
              &::before,
              &::after {
                border: none !important;
              }

              & div[class*='MuiPopover-root'] {
                position: relative !important;

            
                  background-color: red !important;
                
                  ${DATE_AND_MONTH_DROPDOWN_CSS(true)};
                } 
              }
            }
          }
        }

        & div div[class*='materialui-daterange-picker-MuiGrid-justify-xs-space-between']:nth-child(2) {
          & span {
            color: ${THEME.greyColors.grey8} !important;
            font-size: 0 !important;

            &:first-letter {
              font-size: 14px !important;
            }
          }
        }
      }
    }
  }
`;

export const StyledFlowMonitorDetailsHeader = styled.div`
  padding: 18px 24px;
  display: flex;
  border-top: 1px solid ${THEME.greyColors.grey200};
  border-bottom: 1px solid ${THEME.greyColors.grey200};
`;

export const StyledErrorMessage = styled(P14)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${THEME.secondaryColors.nodeError};
`;

export const StyledFlowInstancesListError = styled(StyledErrorMessage)`
  color: ${THEME.greyColors.grey600};
  & > span {
    color: ${THEME.secondaryColors.nodeError};
  }
`;

export const StyledFlowMonitorDetailsItem = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 0;

  &:hover {
    cursor: pointer;
  }
  ${({ $context }) =>
    $context === FLOW_MONITOR_DETAILS_ITEM_CONTEXT.instanceDetails &&
    css`
      &:first-of-type {
        padding-top: 0;
      }
      padding: 10px 0;
    `}
`;
