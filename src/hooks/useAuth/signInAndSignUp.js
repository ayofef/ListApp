import { supabase } from '../../client/supabaseClient';
import { handleToast, TOAST_TYPES } from '../../constants/toast';
import { getErrorMessage } from '../../utils/getErrorMessage';

export const signInAndSignUp = async ({ email, setLoading, isSignInAuthType, actions }) => {
  try {
    setLoading(true);
    const { error } = await supabase.auth.signIn({ email });

    const { hasError, errorMessage } = getErrorMessage([error]);
    if (hasError) {
      handleToast(TOAST_TYPES.error, errorMessage);
      return;
    }

    handleToast(TOAST_TYPES.success, `Check your email for sign ${isSignInAuthType ? 'in' : 'up'} link!`);
  } catch (error) {
    handleToast(TOAST_TYPES.error, error.error_description || error.message);
  } finally {
    setLoading(false);
    actions.setSubmitting(false);
    actions.resetForm();
  }
};
