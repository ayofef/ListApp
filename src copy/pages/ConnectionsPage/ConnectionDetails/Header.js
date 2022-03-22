import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import capitalize from '@material-ui/core/utils/capitalize';
import Box from '@material-ui/core/Box';
import { UI_ROUTES } from '../../../constants/routes';
import { StyledBox } from './styled';
import OptionsMenu from '../../../components/atoms/OptionsMenu';

const Header = ({ primary, secondary, connection, statusActionHandlers }) => {
  const { t } = useTranslation();

  const options = [
    statusActionHandlers[connection.status] && {
      label: statusActionHandlers[connection.status]?.label,
      onClick: statusActionHandlers[connection.status]?.event,
    },
  ]?.filter(Boolean);

  return (
    <Box width="100%" display="flex" alignItems="center" justifyContent="space-between">
      <StyledBox component={Link} to={primary?.route} display="flex" alignItems="center" m="10px 0 0 0">
        <StyledBox component="span" fontSize="24px" fontWeight="600" mt="-8px" color="#232629">
          <span>{t(capitalize(primary?.title))}</span>
        </StyledBox>

        {secondary && (
          <Box component="span" display="flex" alignItems="center" mt="-5px">
            <StyledBox
              alignSelf="flex-start"
              component="span"
              m="0 6px"
              fontSize="16px"
              lineHeight="normal"
              color="#C1C3C6"
              fontWeight="600"
            >
              /
            </StyledBox>

            <StyledBox
              component="span"
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

      <Box ml="auto">
        <OptionsMenu options={options} />
      </Box>
    </Box>
  );
};

Header.propTypes = {
  primary: PropTypes.shape({
    title: PropTypes.string,
    route: PropTypes.string,
  }),
  secondary: PropTypes.string,
  connection: PropTypes.shape({
    id: PropTypes.string,
    status: PropTypes.string,
    company: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
  statusActionHandlers: PropTypes.shape({}).isRequired,
};

Header.defaultProps = {
  primary: {
    title: 'Connections',
    route: UI_ROUTES.connections,
  },
  secondary: undefined,
};

export default Header;
