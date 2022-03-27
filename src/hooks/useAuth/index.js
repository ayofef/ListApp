import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { supabase } from '../../client/supabaseClient';
import { getProfile } from './getProfile';
import { deleteAccount } from './deleteAccount';

const useAuth = () => {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState({});
  const [globalLoading, setGlobalLoading] = useState(false);
  const { push } = useHistory();

  const isAuthenticated = !!session;

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, _session) => {
      setSession(_session);
    });
  }, []);

  useEffect(() => {
    if (session) {
      getProfile({ setLoading: setGlobalLoading, setProfile });
    }
  }, [session]);

  const hasCompletedProfile = session?.user.user_metadata.hasCompletedProfile;

  const signOut = async () => {
    await supabase.auth.signOut();
    push('/');
  };

  const handleDeleteAccount = async () => {
    await deleteAccount({ setGlobalLoading, userId: session.user.id, setSession });
  };

  return {
    isAuthenticated,
    hasCompletedProfile,
    globalLoading,
    profile,
    setProfile,
    setGlobalLoading,
    signOut,
    handleDeleteAccount,
  };
};

export { useAuth };
