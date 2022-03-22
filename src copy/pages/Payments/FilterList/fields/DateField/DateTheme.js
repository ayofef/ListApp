import { createTheme } from '@material-ui/core';
import THEME from '../../../../../constants/theme';

export const DATE_THEME = createTheme({
  spacing: 2,
  transitions: {
    create: () => 'none',
  },
  overrides: {
    disableRipple: true,

    MuiFormControl: {
      root: {
        outline: 'none !important',
        border: 'none !important',
        cursor: 'pointer !important',

        '& p': {
          display: 'none !important',
        },
        '& > div fieldset': {
          borderColor: ({ isOpen }) => isOpen && '#4E40EF',
          boxShadow: ({ isOpen }) => isOpen && '0 0 2px 1px rgba(150,160, 255,0.2)',
        },
        '& .Mui-focused fieldset': {
          borderColor: '#fff !important',
        },
      },
      MuiError: {
        root: {
          display: 'none !important',
        },
      },
    },
    MuiOutlinedInput: {
      root: {
        padding: '8px 16px !important',
        fontSize: '12px',
        backgroundColor: '#fff',
        borderRadius: '6px',
        transition: 'all .2s ease-out',
        height: '40px',
        cursor: 'pointer !important',

        '&$error': {
          '& fieldset': {
            borderColor: '#4E40EF !important',
          },
        },

        '&:hover': {
          borderColor: '#9CA0FF !important',
          borderWidth: '1px',
          outline: 'none !important',

          '& fieldset': {
            borderColor: '#9CA0FF !important',
            boxShadow: '0 0 2px 1px rgba(150,160, 255,0.2) !important',
            outline: 'none !important',
          },
        },
        '&:focus': {
          borderColor: '#4E40EF !important',
          boxShadow: '0 0 2px 1px rgba(150,160, 255,0.2) !important',
          borderWidth: '1px',
          outline: 'none !important',
          '& fieldset': {
            borderColor: '#4E40EF !important',
            outline: 'none !important',
          },
        },

        '& input': {
          color: '#232629 !important',
          borderColor: '#fff',
          cursor: 'pointer !important',

          padding: '0',
        },
        '& fieldset': {
          borderColor: '#fff',
          width: '100%',
          borderWidth: '1px !important',
          transition: 'all .2s ease-out',

          padding: '0',
        },
      },
    },

    MuiPickersCalendarHeader: {
      daysHeader: {
        marginBottom: '8px',
        '& span': {
          color: `${THEME.greyColors.grey8}`,
          fontSize: '0',
          '&:first-letter': {
            fontSize: '14px',
          },
        },
      },
      transitionContainer: {
        width: '140px',
      },

      switchHeader: {
        padding: '0 20px',
        marginBottom: '16px',

        '& p': {
          fontWeight: '600',
          fontSize: '14px',
          textAlign: 'center',
        },
        '& button': {
          padding: '4px',
          transform: 'scale(1.2)',
          '&:hover': {
            backgroundColor: '#fff',
          },
          '& svg': {
            fontSize: '20px',
          },
        },
      },
    },
    MuiPickersBasePicker: {
      container: {
        display: 'block',
        padding: '4px 0 4px 0',
      },
    },
    MuiPaper: {
      root: {
        borderRadius: '6px !important',
        boxShadow: '0px 1px 6px rgba(0, 0, 0, 0.12) !important',
      },
    },

    MuiPickersDay: {
      day: {
        color: '#232629',
        backgroundColor: '#fff',
        marginBottom: '4px',
        borderRadius: '50%',

        '&:hover': {
          backgroundColor: '#dedcf5',
        },
      },
      daySelected: {
        backgroundColor: '#4E40EF',
        '&:hover': {
          transitionDuration: '0 !important',
          backgroundColor: '#4E40EF',
        },
      },
      dayDisabled: {
        backgroundColor: '#fff',
        color: `${THEME.greyColors.grey8}`,
      },
      current: {
        color: '#232629',
        transitionDuration: '0 !important',

        backgroundColor: '#E9E7FF',
      },
    },
  },
});
