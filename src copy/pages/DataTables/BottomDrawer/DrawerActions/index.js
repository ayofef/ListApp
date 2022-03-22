import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import Error from '@material-ui/icons/Error';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import { ButtonRounded } from '../../../../components/atoms';
import IssueCreateModal from './IssueCreateModal';
import THEME from '../../../../constants/theme';
import { useTableStarterContext } from '../../hooks/useTableStarter';
import { PAYMENTS_PERMISSIONS_IDS } from '../../../Payments/permissions';
import usePermission from '../../../../permissions/hooks/usePermission';
import { Export } from '../../../../assets/icons';

const DrawerActions = ({ selected }) => {
  const { t } = useTranslation();
  const [hasPaymentManagementPermission] = usePermission(PAYMENTS_PERMISSIONS_IDS.paymentsManagement);
  const { toggleExportDialog } = useTableStarterContext();

  const [isOpen, setIsOpen] = useState(false);
  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);
  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const issuesLabel = `issue${selected.length > 1 ? 's' : ''}`;

  return (
    <>
      <ButtonRounded
        type="button"
        color="secondary"
        variant="contained"
        startIcon={hasPaymentManagementPermission ? <Error /> : <Export size={20} />}
        onClick={hasPaymentManagementPermission ? openModal : toggleExportDialog}
      >
        <Box component="span" color={THEME.secondaryColors.black2}>
          {t(hasPaymentManagementPermission ? `Create ${selected.length} ${issuesLabel}` : 'Export')}
        </Box>
      </ButtonRounded>

      <IssueCreateModal modalShown={isOpen} closeModal={closeModal} selected={selected} />
    </>
  );
};

DrawerActions.propTypes = {
  selected: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default DrawerActions;
