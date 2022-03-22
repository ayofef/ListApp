import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import TableCell from '@material-ui/core/TableCell';
import THEME from '../../constants/theme';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    boxSizing: 'border-box',
    fontFamily: 'NeurialGrotesk, sans-serif !important',

    [theme.breakpoints.down('sm')]: {
      minWidth: '700px',
    },
  },

  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },

  body: {
    height: ({ head }) => (head === 'none' ? 'auto' : '0px'),
    visibility: ({ noBody }) => (noBody ? 'hidden' : 'visible'),
    paddingTop: 100,
  },

  headCell: {
    borderBottom: ({ head }) => (head === 'none' ? 'none' : '1px solid #E9E9E9'),
    padding: '16px 5px',
    fontFamily: 'NeurialGrotesk, sans-serif !important',
    height: '56px',
    boxSizing: 'border-box',

    [theme.breakpoints.up('md')]: {
      '&:first-child': {
        paddingLeft: 24,
      },
    },

    '& p': {
      color: THEME.greyColors.grey1,
    },

    '& .th-name': {
      display: 'flex',
      alignItems: 'center',
      color: THEME.primaryColors.black,
    },

    '& svg': {
      marginLeft: 8,
    },
  },

  table: {
    boxSizing: 'content-box',

    '&.default': {
      [theme.breakpoints.up('md')]: {
        width: '100%',
      },
    },
  },

  tableHead: {
    visibility: ({ head }) => (head === 'none' ? 'hidden' : 'visible'),
    height: () => {
      return ({ head }) => (head !== 'none' ? 'auto' : '0px');
    },
  },

  row: {
    border: 'none',
    height: '56px',
    boxSizing: 'border-box',

    '&.default': {
      height: ({ head }) => (head !== 'none' ? '0' : '72px'),
    },

    '&:last-child': {
      '& > *': {
        borderBottom: 'none',
      },
    },

    '&.Mui-selected': {
      cursor: 'pointer',
      backgroundColor: 'transparent!important',

      '& > *': {
        backgroundColor: `${THEME.secondaryColors.inputBg}!important`,
      },

      '& p': {
        '&::after': {
          color: `${THEME.secondaryColors.inputBg}!important`,
        },
      },

      '& .status-item': {
        borderColor: 'rgba(0,0,0,0.1)',
      },
    },

    '& .hover-show': {
      display: 'none',
    },

    '&:hover': {
      backgroundColor: 'transparent!important',
    },

    '&.default:hover': {
      cursor: 'pointer',
      backgroundColor: 'transparent!important',

      '& > *': {
        backgroundColor: `${THEME.secondaryColors.inputBg}!important`,
      },

      '& p': {
        '&::after': {
          color: `${THEME.secondaryColors.tableLineSelected}!important`,
        },
      },

      '& .status-item': {
        borderColor: 'rgba(0,0,0,0.1)',
      },

      [theme.breakpoints.up('md')]: {
        '&.default:hover': {
          color: `${THEME.secondaryColors.inputBg}!important`,

          '& .hover-show': {
            display: 'flex',
          },

          '& .hover-hide': {
            display: 'none',
          },
        },
      },
    },

    '&.simple td': {
      borderBottom: `1px solid ${THEME.greyColors.grey3}`,
    },

    '&.simple:last-child td': {
      borderStyle: 'none',
    },
  },

  cell: {
    boxSizing: 'border-box',
    height: '64px',
    border: 'none',
    padding: '4px 5px',
    fontFamily: 'NeurialGrotesk, sans-serif !important',

    [theme.breakpoints.up('lg')]: {
      '&.MuiTableCell-root': {
        width: '25%',
      },
    },

    '&:first-child': {
      paddingLeft: 24,
    },

    [theme.breakpoints.down('xs')]: {
      '&:first-child': {
        paddingTop: 15,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
      },

      '&:last-child': {
        paddingBottom: 24,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
      },
    },

    [theme.breakpoints.up('sm')]: {
      '&.default:first-child': {
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
      },

      '&.default:last-child': {
        marginRight: -20,
        borderTopRightRadius: 16,
        borderBottomRightRadius: 16,
      },

      '&.simple:first-child': {
        padding: '21px 5px 21px 0',
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
      },

      '&.simple:last-child': {
        paddingRight: 0,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
      },
    },
  },

  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export const StyledTableCell = styled(TableCell)`
  min-width: ${({ minWidth }) => minWidth || 'auto'};
  max-width: ${({ maxWidth }) => maxWidth || 'none'};
`;
