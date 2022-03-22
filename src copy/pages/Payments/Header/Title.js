import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import capitalize from '@material-ui/core/utils/capitalize';
import Box from '@material-ui/core/Box';
import { StyledBox } from './StyledBox';

const Title = ({ primary, secondary }) => {
  const { t } = useTranslation();

  return (
    <StyledBox component="p" display="flex" alignItems="center" width="100%" m="4px 0 0 0">
      <StyledBox component="span" fontSize="24px" fontWeight="600" whiteSpace="nowrap" mt="-6px">
        {primary?.route ? (
          <Link to={primary.route}>{t(capitalize(primary?.title || primary))}</Link>
        ) : (
          t(capitalize(primary))
        )}
      </StyledBox>

      {secondary && (
        <Box component="span" display="flex" alignItems="center" mt="-9px">
          <StyledBox
            alignSelf="flex-start"
            component="span"
            m="0 14px"
            fontSize="24px"
            lineHeight="normal"
            color="#C1C3C6"
          >
            /
          </StyledBox>

          <StyledBox
            component="span"
            pt="2px"
            pr="10px"
            fontSize="14px"
            lineHeight="1.5"
            color="#787F88"
            whiteSpace="nowrap"
            flexGrow="1"
            width="auto"
            overflow="hidden"
          >
            {secondary}
          </StyledBox>
        </Box>
      )}
    </StyledBox>
  );
};

Title.propTypes = {
  primary: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
  secondary: PropTypes.string,
};

Title.defaultProps = {
  primary: 'all',
  secondary: undefined,
};

export default Title;
