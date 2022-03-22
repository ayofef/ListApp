import styled from 'styled-components';
import { TableContainer, withStyles } from '@material-ui/core';

const StyledWrapper = styled.span`
  background: #fff !important;
  width: 100%;
  & > span {
    content: '...';
    position: absolute;
    display: flex;
    top: -15px;
    left: 0;
    color: red;
    width: 100%;
    height: 20px;
    justify-content: center;
    align-items: center;
    opacity: 0;
  }

  &:hover span {
    opacity: 1;
  }
`;

const StyledTableContainer = withStyles({
  root: {
    position: 'relative',
    width: ({ draweropen, sidecollapsed }) =>
      draweropen
        ? `calc(100vw - ${sidecollapsed ? '422px' : '674px'})`
        : `calc(100vw - ${sidecollapsed ? '100px' : '350px'})`,
    height: ({ empty }) => `calc(100vh - ${empty ? '106px' : '160px'})`,

    '& .MuiTableHead-root': {
      position: 'relative',
      textTransform: 'uppercase',
      '& .MuiTableRow-root': {
        '&>:hover': {
          background: '#e6e9ec !important',
          backgroundColor: '#e6e9ec !important',
        },
        '& .MuiTableCell-root': {
          paddingBottom: ' 0 !important',
          borderRadius: '6px 6px 0 0 !important',
          transition: '0.35s',
          position: 'relative',

          '&:last-child': {
            '& .HeadCell_DropdownMenu': {
              left: '-110px !important', //fixes dropdown position of last-child
              transformOrigin: '100% 0%',
              '& .dropdown_facade': {
                left: '110px !important',
              },
            },
          },
        },
      },
    },
  },
})(TableContainer);

export { StyledTableContainer, StyledWrapper };
