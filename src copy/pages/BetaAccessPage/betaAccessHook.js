import { useMutation } from '@apollo/client';
import { useCallback, useState } from 'react';
import _isEmpty from 'lodash/isEmpty';
import { NotificationManager } from 'react-notifications';
import { CONFIRM_BETA_ACCESS } from '../../utils/queries/public/publicMutations';
import { useGlobalContext } from '../../containers/App/context';

const useBetaAccess = () => {
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [sendAccessCode] = useMutation(CONFIRM_BETA_ACCESS, {
    context: { skipGlobalHandling: true },
  });
  const { getMeRefetch } = useGlobalContext();
  // const { handleFTE, isLoading } = useFirstTimeEntry();
  // const loading = isLoading || _loading;

  const showError = () => {
    NotificationManager.error('This beta code is invalid.', 'Error', 5000);
  };

  const handleSubmit = useCallback(() => {
    setLoading(true);
    sendAccessCode({
      variables: {
        betaCode: pass,
      },
    })
      .then((res) => {
        if (res && _isEmpty(res.errors)) {
          getMeRefetch();
          // handleFTE();
        } else {
          showError();
        }
      })
      .catch(() => showError())
      .finally(() => setLoading(false));
  }, [
    sendAccessCode,
    getMeRefetch,
    pass,
    // handleFTE,
  ]);

  return {
    handleSubmit,
    loading,
    pass,
    setPass,
  };
};

export default useBetaAccess;
