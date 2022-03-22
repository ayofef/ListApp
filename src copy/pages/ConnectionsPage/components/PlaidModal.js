import { string, shape, func } from 'prop-types';
import React, { useEffect, useState, useRef } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import { UI_ROUTES } from '../../../constants/routes';
import useSearch from '../../../hooks/useSearch';

const PlaidModal = ({ plaidConnectionData, handleResetPlaid, setChildWindow }) => {
  const buttonRef = useRef(null);
  const { push } = useHistory();

  const [modalShown, setModalShown] = useState(false);
  const { authorizationUrl, id } = plaidConnectionData;
  const [{ id: searchID }] = useSearch();

  const onSuccess = (data) => {
    const childWindowConst = window.open(
      `${window.location.origin}${UI_ROUTES.connections}/oauth?state=${id}&queryString=${`token=${data}`} `,
      'new',
      'resizable=yes,fullscreen=yes'
    );
    setChildWindow(childWindowConst);
  };

  const onExit = () => {
    handleResetPlaid();
    if (searchID) {
      push('/connections');
    }
  };

  const config = {
    token: authorizationUrl || '',
    onSuccess,
    onExit,
  };

  const { open, ready } = usePlaidLink(config);
  useEffect(() => {
    if (authorizationUrl && ready && !modalShown) {
      setTimeout(() => buttonRef.current.click(), 1000);
      setModalShown(true);
    }
  }, [authorizationUrl, ready, open, modalShown]);

  const handleConnect = (e) => {
    e.stopPropagation();
    open();
  };
  return <Box display="none" ref={buttonRef} onClick={handleConnect} />;
};

PlaidModal.propTypes = {
  plaidConnectionData: shape({
    authorizationUrl: string,
    id: string,
  }).isRequired,
  setChildWindow: func.isRequired,
  handleResetPlaid: func.isRequired,
};

export default PlaidModal;
