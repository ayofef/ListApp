import PropTypes from 'prop-types';
import React from 'react';
import Box from '@material-ui/core/Box';
import withStyles from '@material-ui/core/styles/withStyles';
import { useTranslation } from 'react-i18next';
import { P16B, P14 } from '../atoms';
import ListIcon from '../../assets/icons/EmptyStates/ListIconNew';

const StyledBox = withStyles({
  root: {
    transform: 'translate(-50%, -50%)',
  },
})(Box);

const StyledSVGBox = withStyles({
  root: {
    transform: 'scale(1.1) ',
    margin: '0 0 20px -8px',
  },
})(Box);

const ListEmptyState = ({ title, description, position, top, left, minWidth, children }) => {
  const { t } = useTranslation();

  return (
    <StyledBox position={position} top={top} left={left} textAlign="center" {...(minWidth && { minWidth })}>
      <StyledSVGBox>
        <ListIcon />
      </StyledSVGBox>
      <P16B margin="32px 0 8px 0">{t(title)}</P16B>
      <P14 color="#787F88">{t(description)}</P14>
      {children}
    </StyledBox>
  );
};

ListEmptyState.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string.isRequired,
  position: PropTypes.string,
  top: PropTypes.string,
  left: PropTypes.string,
  minWidth: PropTypes.string,
};
ListEmptyState.defaultProps = {
  description: null,
  position: 'absolute',
  top: '50%',
  left: '50%',
  minWidth: '',
};
export default ListEmptyState;
