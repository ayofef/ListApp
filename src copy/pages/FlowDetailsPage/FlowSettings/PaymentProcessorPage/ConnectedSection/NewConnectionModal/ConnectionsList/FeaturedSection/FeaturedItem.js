import React, { useCallback, useMemo } from 'react';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { P16, ButtonRounded, P14 } from '../../../../../../../../components/atoms';
import THEME from '../../../../../../../../constants/theme';
import CircleImage from '../../../../../../../../components/table/CircleImage';
import { useHandleConnection } from '../../useHandleConnection';
import { useNewConnectionContext } from '../../context';
import { StyledFeaturedConnection } from './styled';

const FeaturedItem = ({ connection }) => {
  const { t } = useTranslation();
  const { closeModal } = useNewConnectionContext();
  const { handleConnect, renderConnectionForm } = useHandleConnection({ connection, closeModal });
  const connectionName = useMemo(() => connection?.name ?? connection?.company?.name, [connection]);

  const handleConnection = useCallback(() => handleConnect(), [handleConnect]);

  return (
    <StyledFeaturedConnection>
      <Box mb="auto">
        <CircleImage text={connectionName} logo={connection?.company?.logo} size={56} />
      </Box>

      <Box display="flex" alignItems="flex-end" justifyContent="space-between">
        <Box className="featured-item-text">
          <P16 fontWeight="500">{connectionName}</P16>
          <P14 color={THEME.greyColors.grey11}>{connection?.company?.categories?.[0] ?? 'Payment Gateway'}</P14>
        </Box>

        <ButtonRounded
          onClick={handleConnection}
          type="button"
          color="primary"
          variant="contained"
          height="32px"
          borderRadius="6px"
        >
          {t('Connect')}
        </ButtonRounded>
      </Box>
      {renderConnectionForm()}
    </StyledFeaturedConnection>
  );
};

FeaturedItem.propTypes = {
  connection: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    company: PropTypes.shape({
      name: PropTypes.string,
      logo: PropTypes.string,
      categories: PropTypes.arrayOf(PropTypes.string),
    }),
  }).isRequired,
};

export default FeaturedItem;
