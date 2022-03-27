import isEmpty from 'lodash/isEmpty';
import { supabase } from '../../client/supabaseClient';
import { handleToast, TOAST_TYPES } from '../../constants/toast';
import { DB_PROFILES_KEY } from '../../constants/profile';

export const getProfile = async ({ setLoading, setProfile }) => {
  try {
    setLoading(true);

    const user = supabase.auth.user();

    const { data, error } = await supabase
      .from(DB_PROFILES_KEY)
      .select(`username, website, avatar_url`)
      .eq('id', user.id)
      .single();

    if (!isEmpty(error)) {
      handleToast(TOAST_TYPES.error, error.error_description);
      return;
    }

    setProfile({
      username: data.username,
      website: data.website,
      avatar_url: data.avatar_url,
    });
  } catch (error) {
    handleToast(TOAST_TYPES.error, error.error_description || error.message);
  } finally {
    setLoading(false);
  }
};
