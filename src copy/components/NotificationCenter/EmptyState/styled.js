import withStyles from '@material-ui/core/styles/withStyles';
import Box from '@material-ui/core/Box';

// TODO - Refactor this to use styled-components
const StyledBox = withStyles({
  root: {
    transform: 'translateX(-50%)',
  },
})(Box);

const StyledLineBox = withStyles({
  root: {
    opacity: ({ opacity }) => 1 / opacity,
  },
})(Box);

export { StyledBox, StyledLineBox };
