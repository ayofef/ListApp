import PropTypes from 'prop-types';
import React, { useCallback, useMemo, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import { NotificationManager } from 'react-notifications';
import { useMutation } from '@apollo/client';
import OptionsMenu from '../../../../components/atoms/OptionsMenu';
import Title from '../../Header/Title';
import { DELETE_CUSTOMERS, GET_CUSTOMERS } from '../../../../utils/queries/dataTables/customers';
import { ROWS_PER_PAGE } from '../../../../hooks/dataTables/useGetCustomers';
import CreateCustomerDrawer from '../CreateCustomerDrawer';
import { useGlobalContext } from '../../../../containers/App/context';

const MUTATE_OPTIONS = {
  refetchQueries: [{ query: GET_CUSTOMERS, variables: { first: ROWS_PER_PAGE, after: 0 } }],
  awaitRefetchQueries: true,
  context: { skipGlobalHandling: true },
};

const Header = ({ primary, secondary, customer }) => {
  const { detailsId } = useParams();
  const history = useHistory();
  const [deleteCustomer] = useMutation(DELETE_CUSTOMERS, MUTATE_OPTIONS);
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = useCallback(() => setIsOpen((prevState) => !prevState), []);
  const { setGlobalLoading } = useGlobalContext();

  const handleDeleteCustomer = useCallback(() => {
    setGlobalLoading('deleteCustomer', true);
    deleteCustomer({ variables: { id: detailsId } })
      .then((res) => {
        if (res && !res.data.deleteCustomer) {
          NotificationManager.error('Server error', 'Delete customer', 5000);
          return;
        }

        history.replace('/data-tables/customers');
        NotificationManager.success('Customer successfully deleted', 'Delete customer', 5000);
      })
      .finally(() => setGlobalLoading('deleteCustomer', false));
  }, [deleteCustomer, detailsId, history, setGlobalLoading]);

  const options = useMemo(
    () => [
      {
        label: 'Edit customer',
        onClick: toggleDrawer,
      },
      {
        label: 'Delete customer',
        onClick: handleDeleteCustomer,
      },
    ],
    [handleDeleteCustomer, toggleDrawer]
  );

  return (
    <Box display="flex" minHeight="40px">
      <Box display="flex" alignItems="center" flexGrow="1" width="auto" overflow="hidden">
        <Title primary={primary} secondary={secondary ?? detailsId} />
      </Box>

      <Box display="flex" alignItems="center">
        <Box pl={2}>
          <OptionsMenu options={options} />
        </Box>
      </Box>
      <CreateCustomerDrawer toggleDrawer={toggleDrawer} isOpen={isOpen} initialValues={customer} update />
    </Box>
  );
};

Header.propTypes = {
  primary: PropTypes.shape({
    title: PropTypes.string.isRequired,
    route: PropTypes.string,
  }).isRequired,
  secondary: PropTypes.string,
  customer: PropTypes.shape({}).isRequired,
};

Header.defaultProps = {
  secondary: null,
};

export default Header;
