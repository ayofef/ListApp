import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import { useMutation } from '@apollo/client';
import { saveAs } from 'file-saver';
import { EXPORT_PAYMENTS_CSV } from '../../../utils/queries/payments/paymentsMutation';
import { getFilterData } from '../../../hooks/useGetPaymentList/getFilterData';
import useSearch from '../../../hooks/useSearch';
import { useNotificationManager } from '../../../hooks/useNotificationManager';
import { EXPORT_MODE } from './constants';

const ExportFilesForm = ({ children, exportMode, handleClose, columns, columnSet, selected }) => {
  const [exportCSVPromise, { error }] = useMutation(EXPORT_PAYMENTS_CSV);
  useNotificationManager('error', error?.message, 'Fetch Payment columns');
  const [searchParams] = useSearch();
  const COLUMNS = useMemo(
    () =>
      columnSet.reduce((acc, column) => ({ ...acc, [column.name]: { name: column.name, label: column.label } }), {}),
    [columnSet]
  );

  const handleSubmit = useCallback(
    (inputValues) => {
      const values = inputValues?.columns?.filter((value) => value !== '');
      const variables = {
        exportMode,
        columns: values.map((name) => COLUMNS[name]),
        ...(exportMode === EXPORT_MODE.selected && { payments: selected }),
        ...(exportMode === EXPORT_MODE.filters && { data: getFilterData(searchParams) }),
      };

      return exportCSVPromise({ variables }).then(({ errors, data }) => {
        if (errors) {
          return;
        }

        if (!data?.downloadPaymentsCsvFile) {
          return;
        }

        saveAs(data.downloadPaymentsCsvFile, 'payments.csv');

        handleClose();
      });
    },
    [exportMode, selected, searchParams, exportCSVPromise, COLUMNS, handleClose]
  );

  return (
    <Formik initialValues={{ columns }} onSubmit={handleSubmit} enableReinitialize>
      <Form>{children}</Form>
    </Formik>
  );
};

ExportFilesForm.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  columnSet: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selected: PropTypes.arrayOf(PropTypes.string).isRequired,
  exportMode: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default ExportFilesForm;
