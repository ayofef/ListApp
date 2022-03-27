import React, { useMemo, useState, useCallback } from 'react';
import { ToastContainer } from 'react-toastify';
import PublicRoute from './container/PublicRoute';
import RestrictedRoute from './container/RestrictedRoute';
import { useAuth } from './hooks/useAuth';
import { GlobalContextProvider } from './context';

function App() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const toggleMenu = useCallback(() => setMenuIsOpen((prevState) => !prevState), []);

  const { isAuthenticated, hasCompletedProfile, globalLoading, profile, setProfile, signOut, handleDeleteAccount } =
    useAuth();

  const contextValues = useMemo(() => {
    return {
      isAuthenticated,
      hasCompletedProfile,
      globalLoading,
      profile,
      setProfile,
      signOut,
      handleDeleteAccount,
      toggleMenu,
      menuIsOpen,
      setMenuIsOpen,
    };
  }, [
    isAuthenticated,
    hasCompletedProfile,
    globalLoading,
    profile,
    setProfile,
    signOut,
    handleDeleteAccount,
    toggleMenu,
    menuIsOpen,
    setMenuIsOpen,
  ]);

  return (
    <GlobalContextProvider value={contextValues}>
      {isAuthenticated ? <RestrictedRoute /> : <PublicRoute />}

      <ToastContainer />
    </GlobalContextProvider>
  );
}

export default App;
