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
  const hasCompletedProfile = session?.user.user_metadata.hasCompletedProfile;

  useEffect(() => {
    setSession(supabase.auth.session());

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, _session) => {
      setSession(_session);
    });

    return () => {
      authListener?.unsubscribe();
    };
  }, [session]);

  useEffect(() => {
    if (hasCompletedProfile) {
      getProfile({ setLoading: setGlobalLoading, setProfile });
    }
  }, [hasCompletedProfile]);

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
