import PropTypes from 'prop-types';
import React, { useCallback, useRef } from 'react';
import Box from '@material-ui/core/Box';
import { Form, Formik } from 'formik';
import { useMutation } from '@apollo/client';
import { NotificationManager } from 'react-notifications';
import { useTranslation } from 'react-i18next';
import isEmpty from 'lodash/isEmpty';
import { v4 as uniqueID } from 'uuid';
import { useGlobalContext } from '../../../../containers/App/context';

import { P18B } from '../../../../components/atoms';
import { StyledDialogActions } from '../../../../components/Dialog/styled';
import { FIELDS, parseValue, INITIAL_VALUES, validationSchema } from './formSettings';
import CreateForm from '../../components/FormComponents/CreateForm';
import FormControl from '../../../../components/forms/_common/FormControl';
import { CREATE_CARD, GET_CARDS } from '../../../../utils/queries/dataTables/cards';
import { ROWS_PER_PAGE } from '../../../../hooks/dataTables/useGetCustomers';
import { StyledDrawer } from '../../styled';
import CloseButton from '../../../../components/Dialog/CloseButton';

const MUTATE_OPTIONS = {
  refetchQueries: [{ query: GET_CARDS, variables: { first: ROWS_PER_PAGE, after: 0 } }],
  awaitRefetchQueries: true,
  context: { skipGlobalHandling: true },
};

const TOAST_TITLE = 'Create card';

const CreateCardDrawer = ({ isOpen, toggleDrawer }) => {
  const { t } = useTranslation();
  const [createCard] = useMutation(CREATE_CARD, MUTATE_OPTIONS);
  const { setGlobalLoading } = useGlobalContext();
  const idempotencyKeyRef = useRef(null);

  const onSubmit = useCallback(
    (values) => {
      if (!idempotencyKeyRef.current) {
        idempotencyKeyRef.current = uniqueID();
      }

      setGlobalLoading('createCard', true);
      const val = parseValue(values);
      createCard({
        variables: { data: val },
        context: {
          headers: {
            'X-Idempotency-Key': idempotencyKeyRef.current,
          },
        },
      })
        .then((res) => {
          if (!isEmpty(res.errors)) {
            NotificationManager.error(t(res.errors[0]?.message), t(TOAST_TITLE), 5000);
            return;
          }

          NotificationManager.success(t('Card successfully created'), t(TOAST_TITLE), 5000);
        })
        .finally(() => {
          setGlobalLoading('createCard', false);
          toggleDrawer();
        });
    },
    [toggleDrawer, createCard, t, setGlobalLoading]
  );

  const onFormChange = useCallback(() => {
    idempotencyKeyRef.current = null; // reset idempotency key when form changes
  }, []);

  return (
    <StyledDrawer anchor="right" open={isOpen} onClose={toggleDrawer}>
      <Box width="440px" padding="24px 18px 14px 24px" height="100vh">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <P18B>{t('Create card')}</P18B>
          <CloseButton onClick={toggleDrawer} top="16px" right="16px" />
        </Box>

        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          validateOnBlur
          enableReinitialize
        >
          <Form onChange={onFormChange}>
            <Box height="calc(100vh - 130px)" overflow="auto" pb="32px" pr="20px" pl="4px">
              <CreateForm fieldsArr={FIELDS} />
            </Box>

            <Box mt="20px">
              <StyledDialogActions px="0" py="0">
                <FormControl primaryText={t('Create card')} toggleIsOpen={toggleDrawer} />
              </StyledDialogActions>
            </Box>
          </Form>
        </Formik>
      </Box>
    </StyledDrawer>
  );
};

CreateCardDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
};

export default CreateCardDrawer;
