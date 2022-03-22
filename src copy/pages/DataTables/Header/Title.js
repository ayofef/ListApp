import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import capitalize from '@material-ui/core/utils/capitalize';
import Box from '@material-ui/core/Box';
import { StyledBox } from './StyledBox';

const Title = ({ primary, secondary, customSecondary }) => {
  const { t } = useTranslation();
  const CustomSecondaryComponent = customSecondary;
  return (
    <StyledBox
      component="p"
      display="flex"
      alignItems="center"
      width="100%"
      m="4px 0 0 0"
      {...(!secondary && { maxWidth: '1500px' })}
    >
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
            alignSelf={CustomSecondaryComponent ? 'center' : 'flex-start'}
            component="span"
            m="0 8px"
            fontSize="24px"
            lineHeight="normal"
            color="#C1C3C6"
          >
            /
          </StyledBox>

          {CustomSecondaryComponent ? (
            <CustomSecondaryComponent />
          ) : (
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
              {capitalize(secondary ?? '')}
            </StyledBox>
          )}
        </Box>
      )}
    </StyledBox>
  );
};

Title.propTypes = {
  primary: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
  secondary: PropTypes.string,
  customSecondary: PropTypes.func,
};

Title.defaultProps = {
  primary: 'all payments',
  secondary: undefined,
  customSecondary: undefined,
};

export default Title;
