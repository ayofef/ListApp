import styled, { css } from 'styled-components';
import Popover from '@material-ui/core/Popover/Popover';
import Paper from '@material-ui/core/Paper';

import THEME from '../../../../../constants/theme';

/**
 * Calendar component had to be styled this way to match design system,
 * Comments are made on each sections styled
 * library - materialui-daterange-picker does not provided a style props to override styles
 */

const DATE_AND_MONTH_DROPDOWN_CSS = (nthChild3) => css`
  & > div {
    position: relative;
    & div[class*='MuiPopover-root'] {
      position: relative !important;

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
    }
  }
`;

export const CustomPopper = styled(Popover)`
  z-index: 1200;
  top: 2px !important;
  left: -80px !important;
  
 

  & div {
    & div[class*='materialui-daterange-picker-makeStyles-dateRangeBackdrop'] {
      display: none !important;
    }

    & div[class*='MuiPopover-paper MuiPaper-elevation'] {
      transform: translate(-160%, 25%) !important;
    }

    & div[class*='materialui-daterange-picker-makeStyles-dateRangePicker'] {
      & div[class*='MuiPaper-root MuiPaper-elevation'] {
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
        border-radius: 8px;
        overflow: hidden;
        border: 1px solid rgba(230, 233, 236, 0.3);

        //header
        & div[class*='materialui-daterange-picker-makeStyles-header'] {
          display: none !important;

        + hr {
          display: none !important;
        }

        & .MuiGrid-item {
          display: none !important;
        }
        }

        & .MuiDivider-root {
          background-color: ${THEME.greyColors.grey5};
        }

        

        & div[class*='MuiGrid-root MuiGrid-container MuiGrid-wrap-xs-nowrap'] {
          & .MuiGrid-root + div[class*='materialui-daterange-picker-makeStyles-divider'] {
            display: none !important;
            
          }
          
          
        }

       
     //calender
        & div[class*='materialui-daterange-picker-makeStyles-divider'] {
          display: none !important;
        }

        & div[class*='MuiGrid-root MuiGrid-container MuiGrid-align-items-xs-center MuiGrid-justify-xs-space-between'] {
          justify-content: center !important;
          padding: 16px 0 !important;

          

          & div[class*='materialui-daterange-picker-MuiInput-underline'] {
            &::before {
              border-bottom: none !important;
            }
          }

            //header icons
          & div[class*='MuiGrid-root materialui-daterange-picker-makeStyles-iconContainer'] {
            display: none !important;
          
          }
        }

        & div[class*='MuiGrid-root materialui-daterange-picker-makeStyles-weekDaysContainer'] {
          & span[class*='MuiTypography-root MuiTypography-caption MuiTypography-colorTextSecondary'] {
            color: ${THEME.greyColors.grey8} !important;
            font-size: 0 !important;

            &:first-letter {
              font-size: 14px !important;
            }
          }
        }

        & div[class*='materialui-daterange-picker-makeStyles-highlighted-'] {
          background-color: ${THEME.primaryColors.primaryLight};
          & button span p {
            color: ${THEME.primaryColors.primary};
          }
        }
        & button[class*='materialui-daterange-picker-makeStyles-filled-'] {
          background-color: ${THEME.primaryColors.primary} !important;
          & span p {
            color: #fff !important;
          }
        }
        & button[class*='materialui-daterange-picker-makeStyles-outlined'] {
          border: none !important;
        }

        & div[class*=' materialui-daterange-picker-makeStyles-daysContainer-'] {
          margin-top: 8px !important;
          margin-bottom: 32px !important;
          & button.Mui-disabled {
            & span p {
              color: ${THEME.greyColors.grey8} !important;
            }
          }
        }

        //month and year select input
        & div[class*='materialui-daterange-picker-MuiInput-underline'] {
          &.Mui-focused {
            & > div.MuiSelect-root {
              background-color: #fff !important;
            }
            &::before,
            &::after {
              border: none !important;
            }
          }

          & div.MuiSelect-root {
            font-weight: 500;
            font-size: 14px;
          }

          &::after {
            content: url('data:image/svg+xml; utf8,<svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.3335 1.66669L4.00016 3.66669L6.66683 1.66669" stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
</svg>
');
            position: relative;
            display: block;
            left: 0;
            top: 0;
            transform: scale(1) translate(-18px, -3px);
            border: none;
          }
          & .MuiSelect-icon {
            display: none !important;
          }

          
        }
        //month and year dropdown
        & div[class*='MuiPaper-root MuiMenu-paper MuiPopover-paper MuiPaper-elevation8 MuiPaper-rounded'] {
          ul {
            padding-top: 8px !important;
            li {
              color: #000000;
              font-weight: 600 !important;
              font-size: 14px !important;
              padding: 6px 16px !important;
              margin: 0 !important;
              background-color: #fff !important;

              &:hover {
                color: ${THEME.primaryColors.primary};
              }
            }
          }
        }

       
        & div[class*="MuiPaper-root materialui-daterange-picker-makeStyles-root-"]:first-child {
          & div[class*='MuiGrid-root MuiGrid-container'] {
          & div[class*='MuiGrid-root MuiGrid-container MuiGrid-align-items-xs-center MuiGrid-justify-xs-space-between'] {
            &:first-child {
              div[class*='MuiGrid-root'] {
                 //first month dropdown position 
                &:nth-child(2) {
                  ${DATE_AND_MONTH_DROPDOWN_CSS()}
                }
                 //first year dropdown position
                &:nth-child(3) {
                  ${DATE_AND_MONTH_DROPDOWN_CSS(true)}
                }
              }
            }
          }
        }
        
      }
      
      & div[class*="MuiPaper-root materialui-daterange-picker-makeStyles-root-"]:last-child {
          & div[class*='MuiGrid-root MuiGrid-container'] {
          & div[class*='MuiGrid-root MuiGrid-container MuiGrid-align-items-xs-center MuiGrid-justify-xs-space-between'] {
            &:first-child {
              div[class*='MuiGrid-root'] {
                //second month dropdown position
                &:nth-child(2) {
                  ${DATE_AND_MONTH_DROPDOWN_CSS()}
                }
                 //second year dropdown position
                &:nth-child(3) {
                  ${DATE_AND_MONTH_DROPDOWN_CSS(true)}
                }
              }
            }
        }
        }
        
      }
    }
  }
  ${({ $customPopperCss }) => $customPopperCss};
`;

export const StyledButton = styled.button`
  border: none;
  outline: none;
  background-color: #fff;
  font-size: 16px;
  font-weight: 500;
  color: #000;
  padding: 8px 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 6px;

  &:hover {
    background-color: ${THEME.greyColors.grey12};
  }

  svg {
    margin-left: 6px;
    transform: translateY(1px);

    path {
      stroke: #000;
      stroke-width: 2;
    }
  }
`;

export const StyledOptionsPaper = styled(Paper)`
  &.MuiPaper-root {
    box-shadow: none;
    transform: translate(60px, 4px) !important;
    overflow: hidden !important;
    background-color: #fff;
    height: 440px;
    width: ${({ $isDateRangeType }) => ($isDateRangeType ? '800px' : '530px')};
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    border: 1px solid rgba(230, 233, 236, 0.2);

    &.MuiPaper-rounded {
      border-radius: 8px;
    }

    ${({ elevation }) => `&.MuiPaper-elevation${elevation ?? 1}`} {
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
    }
  }
`;

export const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;
