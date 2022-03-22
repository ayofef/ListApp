import { useEffect } from 'react';
import { useGlobalContext } from '../../containers/App/context';

const LogoutPage = () => {
  const { logOut } = useGlobalContext();

  useEffect(() => {
    logOut();
  }, [logOut]);

  return null;
};

export default LogoutPage;
