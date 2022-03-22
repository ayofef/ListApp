import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';

const StyledPaper = styled(Paper)`
  &.MuiPaper-root {
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.04), 0px 0px 14px rgba(0, 0, 0, 0.04) !important;
    &.MuiPaper-rounded {
      border-radius: 12px;
    }
  }
`;

const StyledWrapper = styled.div`
  width: 496px;
  padding: 20px 0 0 0;

  & ul {
    margin: 0;
    padding: 0;

    & > :not(:last-child) {
      border-bottom: 1px solid #e6e9ec;
    }
    li {
      list-style-type: none;

      & > :first-child {
        padding: 20px 24px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 81px;
        transition: all 0.3s ease;

        &:hover {
          background-color: #f5f6f7;
          cursor: pointer;
        }

        .forward-icon {
          margin-right: 14px;
          svg {
            color: #4e40ef;
            font-size: 12px;
            stroke: #4e40ef;
            stroke-width: 2px;
          }
        }

        .new-badge {
          margin-right: 22.5px;
          color: #4e40ef;
          font-size: 12px;
          font-weight: 600;
          background-color: #f5f2ff;
          border-radius: 4px;
          padding: 6px 8px;
          line-height: 12px;
        }
      }
    }
  }
`;

export { StyledPaper, StyledWrapper };
