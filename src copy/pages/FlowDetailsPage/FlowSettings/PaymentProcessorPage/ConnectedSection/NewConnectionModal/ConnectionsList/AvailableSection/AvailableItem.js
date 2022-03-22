import React, { useMemo, useCallback } from 'react';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import ConnectionItem from '../../../../ConnectionItem';
import { BORDER_COLOR } from '../../../../../../constant';
import { ButtonRounded } from '../../../../../../../../components/atoms';
import THEME from '../../../../../../../../constants/theme';
import { useNewConnectionContext } from '../../context';
import { useHandleConnection } from '../../useHandleConnection';

const SUB_TEXT_PROPS = {
  color: THEME.greyColors.grey11,
  fontSize: '12px',
};

const AvailableItem = ({ connection }) => {
  const { t } = useTranslation();
  const { closeModal } = useNewConnectionContext();
  const { handleConnect, renderConnectionForm } = useHandleConnection({ connection, closeModal });
  const connectionName = useMemo(() => connection?.name ?? connection?.company?.name, [connection]);
  const handleConnection = useCallback(() => handleConnect(), [handleConnect]);

  return (
    <Box
      height="72px"
      bgcolor="#fff"
      boxSizing="border-box"
      p="16px"
      borderRadius="8px"
      width="330px"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      border={`0.5px solid ${BORDER_COLOR}`}
      mb="16px"
      mr="16px"
    >
      <ConnectionItem
        connectionName={connectionName}
        connectionIcon={connection?.company?.logo}
        iconSize={40}
        subText={connection?.company?.categories?.[0] ?? 'Payment Gateway'}
        subTextProps={SUB_TEXT_PROPS}
        titleFontWeight="500"
      />

      <Box display="flex" alignItems="flex-end" justifyContent="space-between">
        <ButtonRounded
          onClick={handleConnection}
          type="button"
          color="secondary"
          variant="contained"
          height="32px"
          borderRadius="6px"
        >
          {t('Connect')}
        </ButtonRounded>
      </Box>
      {renderConnectionForm()}
    </Box>
  );
};

AvailableItem.propTypes = {
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

export default AvailableItem;
