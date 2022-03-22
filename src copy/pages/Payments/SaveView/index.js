import { useMutation } from '@apollo/client';
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Form, Formik } from 'formik';
import Box from '@material-ui/core/Box';
import omit from 'lodash/omit';
import { stringify } from 'qs';

import { STRINGIFY_OPTIONS } from '../../../hooks/useSearch';
import {
  StyledDialog,
  StyledDialogActions,
  StyledDialogContent,
  StyledDialogTitle,
  StyledPaper,
} from '../../../components/Dialog/styled';

import NameField from './NameField';
import FormControl from '../../../components/forms/_common/FormControl';

import { validationSchema } from './formSettings';
import { SAVE_PAYMENT_VIEW, UPDATE_PAYMENT_VIEW } from '../../../utils/queries/payments/paymentsMutation';
import { transformFilterToSearchParams } from '../../../utils/filterToSearchParams/transformFilterToSearchParams';
import { transformSortToSearchParams } from '../../../utils/transformSortToSearchParams';
import { GQL_Q_LIST_PAYMENT_VIEW } from '../../../utils/queries/payments/paymentsQueries';
import CloseButton from '../../../components/Dialog/CloseButton';

const ID = 'save-payment-view';

const mutateOptions = {
  refetchQueries: [{ query: GQL_Q_LIST_PAYMENT_VIEW }],
  awaitRefetchQueries: true,
};

const SaveView = ({ initialValues, isOpen, toggleIsOpen }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const [saveView] = useMutation(SAVE_PAYMENT_VIEW, mutateOptions);
  const [updateView] = useMutation(UPDATE_PAYMENT_VIEW, mutateOptions);

  const onSubmit = useCallback(
    (values, actions) => {
      const data = omit(values, 'id');

      const { key, promise } = values.id
        ? { promise: updateView, key: 'updatePaymentView' }
        : { promise: saveView, key: 'savePaymentView' };

      promise({ variables: { ...(values?.id && { id: values?.id }), view: data } }).then(
        ({ errors, data: resData }) => {
          actions.setSubmitting(false);
          if (errors) {
            return;
          }
          const res = resData[key];
          const sort = transformSortToSearchParams(res?.sort);
          const filter = res?.filter;
          const filterToSearch = filter ? transformFilterToSearchParams(filter) : '';

          history.push({
            ...history.location,
            pathname: `/payments/views/${res?.id}`,
            search: `?${stringify(
              { ...(filterToSearch && { filter: filterToSearch }), ...(sort && { sort: sort }) },
              STRINGIFY_OPTIONS
            )}`,
            state: { views: { title: res?.name, filter: filterToSearch, sort, view: res } },
          });
          toggleIsOpen();
        }
      );
    },
    [saveView, updateView, toggleIsOpen, history]
  );

  return (
    <StyledDialog
      open={isOpen}
      scroll="paper"
      maxWidth="xs"
      PaperComponent={StyledPaper}
      onClose={toggleIsOpen}
      aria-labelledby={ID}
    >
      <CloseButton onClick={toggleIsOpen} />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnMount
        enableReinitialize
      >
        <Form>
          <StyledDialogTitle id={`${ID}-title`} disableTypography>
            {t('Save payment view')}
          </StyledDialogTitle>

          <StyledDialogContent>
            <Box minWidth="300px" pb="24px" mt="16px">
              <NameField />
            </Box>
          </StyledDialogContent>

          <StyledDialogActions>
            <FormControl toggleIsOpen={toggleIsOpen} />
          </StyledDialogActions>
        </Form>
      </Formik>
    </StyledDialog>
  );
};

SaveView.propTypes = {
  initialValues: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    filter: PropTypes.shape({
      amount: PropTypes.shape({}),
      currency: PropTypes.shape({}),
      date: PropTypes.shape({}),
      method: PropTypes.shape({}),
      status: PropTypes.shape({}),
    }).isRequired,
    sort: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggleIsOpen: PropTypes.func.isRequired,
};

export default SaveView;
