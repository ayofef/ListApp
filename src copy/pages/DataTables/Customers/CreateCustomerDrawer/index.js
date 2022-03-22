import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import Box from '@material-ui/core/Box';
import { Form, Formik } from 'formik';
import { useMutation } from '@apollo/client';
import { NotificationManager } from 'react-notifications';
import { useTranslation } from 'react-i18next';
import isEmpty from 'lodash/isEmpty';
import omit from 'lodash/omit';
import { P18B, P16B } from '../../../../components/atoms';
import { StyledDialogActions } from '../../../../components/Dialog/styled';
import { FIELDS, INITIAL_VALUES, validationSchema } from './formSettings';
import CreateForm from '../../components/FormComponents/CreateForm';
import FormControl from '../../../../components/forms/_common/FormControl';
import {
  CREATE_CUSTOMERS,
  UPDATE_CUSTOMER,
  GET_CUSTOMERS,
  GET_CUSTOMER,
} from '../../../../utils/queries/dataTables/customers';
import { ROWS_PER_PAGE } from '../../../../hooks/dataTables/useGetCustomers';
import { useGlobalContext } from '../../../../containers/App/context';
import { StyledDrawer } from '../../styled';
import CloseButton from '../../../../components/Dialog/CloseButton';

const CREATE_MUTATE_OPTIONS = {
  refetchQueries: [{ query: GET_CUSTOMERS, variables: { first: ROWS_PER_PAGE, after: 0 } }],
  awaitRefetchQueries: true,
  context: { skipGlobalHandling: true },
};

const UPDATE_MUTATE_OPTIONS = (id) => ({
  refetchQueries: [{ query: GET_CUSTOMER, variables: { id } }],
  awaitRefetchQueries: true,
  context: { skipGlobalHandling: true },
});

const LABEL_MAP = {
  update: 'Update customer',
  create: 'Create customer',
};

const TYPE_NAME_MAP = [
  '__typename',
  'billingAddress.__typename',
  'shippingAddress.__typename',
  'shippingAddress.address.__typename',
];

const CreateCustomerDrawer = ({ isOpen, toggleDrawer, update, initialValues }) => {
  const { t } = useTranslation();
  const [createCustomerInternal] = useMutation(CREATE_CUSTOMERS, CREATE_MUTATE_OPTIONS);
  const [updateCustomer] = useMutation(UPDATE_CUSTOMER, UPDATE_MUTATE_OPTIONS(initialValues?.id ?? ''));
  const { setGlobalLoading } = useGlobalContext();

  const onSubmit = useCallback(
    (val) => {
      setGlobalLoading('createCustomerInternal', true);
      const values = omit(val, ['defaultPaymentMethod']);

      const promise = update ? updateCustomer : createCustomerInternal;
      const variables = update
        ? { id: values.id, customer: omit(values, TYPE_NAME_MAP) }
        : { data: { customer: values } };
      const toastTitle = update ? LABEL_MAP.update : LABEL_MAP.create;

      promise({ variables })
        .then((res) => {
          if (!isEmpty(res.errors)) {
            NotificationManager.error(t(res.errors[0]?.message), t(toastTitle), 5000);
            return;
          }

          if (update && !res.data.updateCustomerInternal) {
            NotificationManager.error(t('An unexpected error occured'), t(toastTitle), 5000);
            return;
          }

          NotificationManager.success(
            t(`Customer successfully ${update ? 'updated' : 'created'}`),
            t(toastTitle),
            5000
          );
        })

        .finally(() => {
          setGlobalLoading('createCustomerInternal', false);
          toggleDrawer();
        });
    },
    [toggleDrawer, createCustomerInternal, updateCustomer, update, t, setGlobalLoading]
  );

  return (
    <StyledDrawer anchor="right" open={isOpen} onClose={toggleDrawer}>
      <Box width="440px" padding="24px 18px 14px 24px" height="100vh">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <P18B>{t(update ? LABEL_MAP.update : LABEL_MAP.create)}</P18B>
          <CloseButton onClick={toggleDrawer} top="16px" right="16px" />
        </Box>

        <Formik
          initialValues={initialValues}
          validate={validationSchema}
          onSubmit={onSubmit}
          validateOnBlur
          enableReinitialize
        >
          <Form>
            <Box mt="20px" height="calc(100vh - 150px)" overflow="auto" pb="32px" pr="20px" pl="4px">
              <P16B margin="0 0 16px 0">{t('Customer details')}</P16B>
              <CreateForm fieldsArr={FIELDS} />
            </Box>

            <Box mt="20px">
              <StyledDialogActions px="0" py="0">
                <FormControl
                  primaryText={t(update ? LABEL_MAP.update : LABEL_MAP.create)}
                  toggleIsOpen={toggleDrawer}
                />
              </StyledDialogActions>
            </Box>
          </Form>
        </Formik>
      </Box>
    </StyledDrawer>
  );
};

CreateCustomerDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  update: PropTypes.bool,
  initialValues: PropTypes.shape({
    id: PropTypes.string,
  }),
};
CreateCustomerDrawer.defaultProps = {
  initialValues: INITIAL_VALUES,
  update: false,
};

export default CreateCustomerDrawer;
