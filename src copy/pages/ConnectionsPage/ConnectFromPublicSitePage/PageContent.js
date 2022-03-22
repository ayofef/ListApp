import React, { useEffect } from 'react';
import { shape } from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useHandleConnectionConnect } from '../../../hooks/connectionsHooks';

const PageContent = ({ connection }) => {
  const { push } = useHistory();
  const { handleConnect, renderConnectionForm } = useHandleConnectionConnect({ connection });
  useEffect(() => {
    if (connection) {
      handleConnect();
    } else {
      push('/connections');
    }
  }, [handleConnect, connection, push]);

  return <>{renderConnectionForm()}</>;
};

PageContent.propTypes = {
  connection: shape({}).isRequired,
};

export default PageContent;
