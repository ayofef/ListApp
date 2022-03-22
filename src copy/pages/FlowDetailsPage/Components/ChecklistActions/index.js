import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIosRounded';

import { P12, Checkbox } from '../../../../components/atoms';
import { StyledList, StyledLink } from './styled';

const ChecklistActions = ({ checklist, callback }) => {
  const { t } = useTranslation();

  const handleClick = useCallback(() => {
    if (typeof callback === 'function') {
      callback();
    }
  }, [callback]);

  return (
    <StyledList>
      {checklist?.map((step) => (
        <li key={step?.label}>
          <StyledLink to={step?.route} onClick={handleClick}>
            <Box display="flex" alignItems="center">
              <Checkbox checked={step?.completed} />

              <P12 fontWeight="500" margin="0 0 0 16px">
                {t(step?.label)} [{t(step?.required ? 'essential' : 'optional')}]
              </P12>
            </Box>

            <ArrowForwardIosIcon />
          </StyledLink>
        </li>
      ))}
    </StyledList>
  );
};

ChecklistActions.propTypes = {
  checklist: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      completed: PropTypes.bool,
      required: PropTypes.bool,
      route: PropTypes.string,
    })
  ).isRequired,
  callback: PropTypes.func,
};

ChecklistActions.defaultProps = {
  callback: () => {},
};

export default ChecklistActions;
