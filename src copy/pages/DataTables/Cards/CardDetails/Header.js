import PropTypes from 'prop-types';
import React, { useCallback, useMemo } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import { NotificationManager } from 'react-notifications';
import { useMutation } from '@apollo/client';
import OptionsMenu from '../../../../components/atoms/OptionsMenu';
import Title from '../../Header/Title';
import { DELETE_CARD, GET_CARDS } from '../../../../utils/queries/dataTables/cards';
import { ROWS_PER_PAGE } from '../../../../hooks/dataTables/useGetCustomers';
import { useGlobalContext } from '../../../../containers/App/context';

const MUTATE_OPTIONS = {
  refetchQueries: [{ query: GET_CARDS, variables: { first: ROWS_PER_PAGE, after: 0 } }],
  awaitRefetchQueries: true,
};

const Header = ({ primary, secondary }) => {
  const { detailsId } = useParams();
  const history = useHistory();
  const [deletePaymentMethodInternal] = useMutation(DELETE_CARD, MUTATE_OPTIONS);
  const { setGlobalLoading } = useGlobalContext();

  const handleDeleteCard = useCallback(() => {
    setGlobalLoading('deleteCard', true);
    deletePaymentMethodInternal({ variables: { token: detailsId } })
      .then((res) => {
        if (res && !res.data.deletePaymentMethodInternal) {
          NotificationManager.error('Server error', 'Delete card', 5000);
          return;
        }

        history.replace('/data-tables/cards');
        NotificationManager.success('Card successfully deleted', 'Delete card', 5000);
      })
      .finally(() => setGlobalLoading('deleteCard', false));
  }, [deletePaymentMethodInternal, detailsId, history, setGlobalLoading]);

  const options = useMemo(
    () => [
      {
        label: 'Delete card',
        onClick: handleDeleteCard,
      },
    ],
    [handleDeleteCard]
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
    </Box>
  );
};

Header.propTypes = {
  primary: PropTypes.shape({
    title: PropTypes.string.isRequired,
    route: PropTypes.string,
  }).isRequired,
  secondary: PropTypes.string,
};

Header.defaultProps = {
  secondary: null,
};

export default Header;
