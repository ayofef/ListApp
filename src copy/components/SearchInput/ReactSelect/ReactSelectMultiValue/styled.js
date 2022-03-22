import withStyles from '@material-ui/core/styles/withStyles';
import Box from '@material-ui/core/Box';

export const StyledMultiValue = withStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#e6e6e6',
    borderRadius: '6px',
    marginRight: '2px',
  },
})(Box);

export const StyledValueType = withStyles({
  root: {
    lineHeight: '23px',
    fontSize: '12px',
    color: '#737A82',
    backgroundColor: '#d0d0d0',
    textTransform: 'uppercase',
    padding: '0 4px ',
    borderTopLeftRadius: '6px',
    borderBottomLeftRadius: '6px',
  },
})(Box);
