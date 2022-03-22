import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { useRouteMatch } from 'react-router-dom';
import Skeleton from '@material-ui/lab/Skeleton';
import Box from '@material-ui/core/Box';
import { StyledDialogContent, StyledDialogTitle, StyledPaper } from '../../Dialog/styled';
import ExportFilesForm from './ExportFilesForm';
import DialogActions from './DialogActions';
import DialogContent from './DialogContent';
import { useNotificationManager } from '../../../hooks/useNotificationManager';
import { useGetViews } from '../../../hooks/useGetView';
import { EXPORT_MODE, GENERATE_VIEW_COLUMN_SET } from './constants';
import { StyledDialog } from './styled';
import { useGetPaymentList } from '../../../hooks/useGetPaymentList';
import { GQL_Q_LIST_PAYMENT_EXPORT_COLUMNS } from '../../../utils/queries/payments/paymentsQueries';
import CloseButton from '../../Dialog/CloseButton';

const ID = 'ExportFiles';

const getExportMode = (source, totalSelected, totalSize) => {
  if (source === 'SEARCH') {
    return EXPORT_MODE.selected;
  }

  return totalSelected === totalSize ? EXPORT_MODE.filters : EXPORT_MODE.selected;
};

const ExportFiles = ({ selected, isOpen, toggleExportDialog, currentViewColumns }) => {
  const { t } = useTranslation();
  const [maxWidth, setMaxWidth] = useState('sm');
  const views = useGetViews();
  const match = useRouteMatch('/payments/views/:viewId');
  const viewId = match?.params?.viewId;
  const viewName = viewId && views?.[viewId]?.name;
  const { totalSize, rows, source, loading: paymentLoading } = useGetPaymentList();

  const { loading, error, data } = useQuery(GQL_Q_LIST_PAYMENT_EXPORT_COLUMNS);
  useNotificationManager('error', error?.message, 'Fetch Payment columns');
  const viewColumnSet = useMemo(() => GENERATE_VIEW_COLUMN_SET(currentViewColumns), [currentViewColumns]);
  const { columns, columnSet } = useMemo(
    () =>
      data?.getPaymentColumns?.reduce(
        (acc, column) => {
          acc.columnSet.push({ name: column.name, label: t(column.label), isDefault: column.defaultColumn });

          if (column.defaultColumn) {
            acc.columns.push(column.name);
          }

          return acc;
        },
        { columns: [], columnSet: [] }
      ) ?? { columns: [], columnSet: [] },
    [t, data?.getPaymentColumns]
  );
  const length = rows?.length ?? 0;
  const totalSelected = selected.length === length ? totalSize : selected.length;
  const exportMode = useMemo(() => getExportMode(source, totalSelected, totalSize), [source, totalSelected, totalSize]);

  if (loading || paymentLoading) {
    return (
      <StyledDialog
        open={isOpen}
        scroll="paper"
        maxWidth={maxWidth}
        PaperComponent={StyledPaper}
        onClose={toggleExportDialog}
        aria-labelledby={`${ID}-title`}
        aria-describedby={`${ID}-description`}
        fullWidth
      >
        <CloseButton onClick={toggleExportDialog} />
        <Box flexBasis="250px">
          <Skeleton variant="rect" height={400} width="100%" animation="wave" />
        </Box>
      </StyledDialog>
    );
  }

  return (
    <ExportFilesForm
      columns={viewName ? viewColumnSet : columns}
      columnSet={columnSet}
      selected={selected}
      exportMode={exportMode}
      handleClose={toggleExportDialog}
    >
      <StyledDialog
        open={isOpen}
        scroll="paper"
        maxWidth={maxWidth}
        PaperComponent={StyledPaper}
        onClose={toggleExportDialog}
        aria-labelledby={`${ID}-title`}
        aria-describedby={`${ID}-description`}
        fullWidth
      >
        <CloseButton onClick={toggleExportDialog} />
        <StyledDialogTitle id={`${ID}-title`} disableTypography>
          <Box maxWidth="90%">{t(`Would you like to export ${totalSelected} transactions?`)}</Box>
        </StyledDialogTitle>

        <StyledDialogContent>
          <DialogContent viewTitle={viewName} columnSet={columnSet} setMaxWidth={setMaxWidth} />
        </StyledDialogContent>

        <DialogActions handleClose={toggleExportDialog} />
      </StyledDialog>
    </ExportFilesForm>
  );
};

ExportFiles.propTypes = {
  selected: PropTypes.arrayOf(PropTypes.string).isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggleExportDialog: PropTypes.func.isRequired,
  currentViewColumns: PropTypes.arrayOf(
    PropTypes.shape({
      Header: PropTypes.string,
    })
  ),
};
ExportFiles.defaultProps = {
  currentViewColumns: [],
};
export default ExportFiles;
