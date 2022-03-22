import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { useHistory } from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import { useTranslation } from 'react-i18next';

import { UI_ROUTES } from '../../../../../constants/routes';
import { DefaultCardTag } from '../../../../../components/table/Cells/DefaultCardCell';
import DropDownMenu from '../../../../../components/menus/DropDownMenu';
import ConnectionItem from '../ConnectionItem';
import SetDefaultConfirmationModal from './SetDefaultConfirmationModal';
import RemoveConfirmationModal from './RemoveConfirmationModal';
import { usePaymentFlowContext } from '../../../paymentFlowContext';
import { useSetPaymentProcessAsDefault } from '../../hooks/useSetPaymentProcessAsDefault';
import { BROKEN_CONNECTION_PROPS, BROKEN_CONNECTION_BG_COLOR } from '../../constant';
import { useRemoveProcessorFromFlow } from '../../hooks/useRemoveProcessorFromFlow';
import { GET_STATUS } from '../../../../ConnectionsPage/components/constant';

const ConnectedConnectionItem = ({ connection, defaultProcessor }) => {
  const { t } = useTranslation();
  const { flow } = usePaymentFlowContext();
  const { push } = useHistory();
  const { handleSetAsDefault, loading: setAsDefaultLoading } = useSetPaymentProcessAsDefault();
  const { handleRemoveProcessor, loading: removeProcessorLoading } = useRemoveProcessorFromFlow();

  const [defaultModal, setDefaultModal] = useState(false);
  const toggleSetDefaultModal = useCallback(() => setDefaultModal((prevState) => !prevState), []);

  const [removeModal, setRemoveModal] = useState(false);
  const toggleRemoveModal = useCallback(() => setRemoveModal((prevState) => !prevState), []);

  const connectionName = useMemo(() => connection?.name ?? connection?.company?.name, [connection]);
  const showStatus = useMemo(() => connection?.status !== 'CONNECTED', [connection?.status]);
  const isDefault = useMemo(() => defaultProcessor === connection?.id, [defaultProcessor, connection?.id]);

  const handleFullDetails = useCallback(() => push(`${UI_ROUTES.connectionDetails}/${connection?.id}`), [
    push,
    connection?.id,
  ]);

  const handleSetDefault = useCallback(
    () => handleSetAsDefault(connection?.id, connectionName, toggleSetDefaultModal),
    [handleSetAsDefault, connection?.id, connectionName, toggleSetDefaultModal]
  );

  const handleRemove = useCallback(() => handleRemoveProcessor(connection?.id, connectionName, toggleRemoveModal), [
    handleRemoveProcessor,
    connection?.id,
    connectionName,
    toggleRemoveModal,
  ]);

  const connectionActions = useMemo(
    () => [
      {
        ...(!isDefault && !showStatus && { 'Set as default': toggleSetDefaultModal }),
        'Edit payment method': handleFullDetails,
        'Full details': handleFullDetails,
        ...(!isDefault && { Remove: toggleRemoveModal }),
      },
    ],
    [handleFullDetails, toggleSetDefaultModal, toggleRemoveModal, isDefault, showStatus]
  );

  const handleClick = useCallback(
    (e) => {
      e.stopPropagation();
      push(`${UI_ROUTES.connectionDetails}/${connection?.id}`);
    },
    [push, connection?.id]
  );

  return (
    <Box
      className="connection-button"
      key={connection?.id}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      onClick={handleClick}
      {...(showStatus && {
        bgcolor: BROKEN_CONNECTION_BG_COLOR,
      })}
    >
      <ConnectionItem
        connectionName={connectionName}
        connectionIcon={connection?.company?.logo}
        {...(showStatus && {
          ...BROKEN_CONNECTION_PROPS,
          subText: t(GET_STATUS[connection?.status]?.text),
        })}
      />

      <Box display="flex" alignItems="center" justifyContent="space-between">
        {isDefault && (
          <Box mr="14px">
            <DefaultCardTag />
          </Box>
        )}

        <Box>
          <DropDownMenu
            options={connectionActions}
            lastItemDanger={!isDefault}
            button={
              <IconButton>
                <MoreHoriz />
              </IconButton>
            }
            id={connection.id}
          />
        </Box>
      </Box>
      {defaultModal && (
        <SetDefaultConfirmationModal
          open={defaultModal}
          onCancel={toggleSetDefaultModal}
          connectionName={connectionName}
          onConfirm={handleSetDefault}
          loading={setAsDefaultLoading}
        />
      )}

      {removeModal && (
        <RemoveConfirmationModal
          open={removeModal}
          onCancel={toggleRemoveModal}
          connectionName={connectionName}
          flowName={flow?.name ?? 'your flow'}
          onConfirm={handleRemove}
          loading={removeProcessorLoading}
        />
      )}
    </Box>
  );
};

ConnectedConnectionItem.propTypes = {
  connection: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    status: PropTypes.string,
    company: PropTypes.shape({
      logo: PropTypes.string,
      name: PropTypes.string,
    }),
  }).isRequired,
  defaultProcessor: PropTypes.string.isRequired,
};

export default ConnectedConnectionItem;
