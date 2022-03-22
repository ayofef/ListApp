import React from 'react';
import { shape, bool } from 'prop-types';
import { useMutation } from '@apollo/client';
import { Formik, Form } from 'formik';
import isEmpty from 'lodash/isEmpty';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import { NotificationManager } from 'react-notifications';
import { makeStyles } from '@material-ui/core/styles';
import { profileTabFields, validationSchema } from '../../../utils/schemas/editProfileSchema';
import { UPDATE_MY_PROFILE } from '../../../utils/queries/customer/customerMutations';
import Input from '../../../components/forms/_common/Input';
import FormControl from './FormControl';
import { MUTATE_OPTIONS } from '../constant';
import { TOAST_TIMEOUT } from '../../../constants/toastTimeout';
import { FlexContainer } from '../../../components/atoms/flex/FlexContainer';

export const useStyles = makeStyles(() => ({
  input: {
    width: '100%!important',
    border: '1px solid rgb(231, 230, 230)!important',
    boxShadow: 'none!important',
    '&:focus': {
      borderColor: 'rgb(35, 70, 242)!important',
    },
  },
}));

const TITLE = 'Profile';
const SUCCESS_MESSAGE = 'Profile successfully updated';

const ProfileForm = ({ initialValues, getMeLoading }) => {
  const { t } = useTranslation();
  const [updateMyProfile, { loading }] = useMutation(UPDATE_MY_PROFILE, {
    context: { skipGlobalHandling: true },
    ...MUTATE_OPTIONS,
  });

  const notifyUser = (data) => {
    if (!isEmpty(data.errors)) {
      const message = data?.errors?.[0]?.message;

      NotificationManager.error(t(message), t(TITLE), TOAST_TIMEOUT);

      return false;
    }

    NotificationManager.success(t(SUCCESS_MESSAGE), t(TITLE), TOAST_TIMEOUT);

    return true;
  };

  const handleSubmit = async (values) => {
    const data = await updateMyProfile({ variables: { ...values } });
    notifyUser(data);
  };

  return (
    <FlexContainer flexDirection="column" justifyContent="flex-start" alignItems="flex-start">
      <FlexContainer flexDirection="column" width="100%" alignItems="stretch">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          enableReinitialize
          validate={validationSchema}
          validateOnBlur={true}
          validateOnMount={false}
        >
          <Form>
            {profileTabFields.map(({ field, type, label, disabled: fieldDisabled }) => (
              <Input
                key={field}
                variant="outlined"
                type={type}
                name={field}
                label={label}
                disabled={getMeLoading || loading || fieldDisabled}
                customLabel
                customLabelProps={{
                  fontSize: '12px',
                  fontWeight: '600',
                }}
              />
            ))}

            <Box display="flex">
              <FormControl loading={loading} getMeLoading={getMeLoading}>
                {t('Update profile')}
              </FormControl>
            </Box>
          </Form>
        </Formik>
      </FlexContainer>
    </FlexContainer>
  );
};

ProfileForm.propTypes = {
  getMeLoading: bool,
  initialValues: shape({}).isRequired,
};

ProfileForm.defaultProps = {
  getMeLoading: false,
};

export default ProfileForm;
