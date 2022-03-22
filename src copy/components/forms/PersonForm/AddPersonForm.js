import React, { Fragment, useState, useEffect } from 'react';
import { withFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import isEmpty from 'lodash/isEmpty';
import { func, shape } from 'prop-types';
import Box from '@material-ui/core/Box';
import addPersonSchema, { addPersonFields, addPersonOptions } from '../../../utils/schemas/addPersonSchema';
import { FieldsWrapper } from '../formStyles';
import { Button, StyledSelect, BlockWrap, L12, P } from '../../atoms';
import THEME from '../../../constants/theme';
import { useInviteUser } from '../../../hooks/userHooks';
import { useGlobalContext } from '../../../containers/App/context';
import useSetCustomerMetadata from '../../../hooks/useSetCustomerMetadata';
import Input from '../_common/Input';
import { FlexContainer } from '../../atoms/flex/FlexContainer';

const AddPersonForm = ({ values, handleChange, handleBlur, errors, setShowModal, userRefetch }) => {
  const [showErrors, setShowErrors] = useState(false);
  const [InviteUser, { data, loading }] = useInviteUser();
  const { stepsCheckListMeta } = useGlobalContext();
  const { setMetadata } = useSetCustomerMetadata();

  const { t } = useTranslation();

  useEffect(() => {
    if (data) {
      userRefetch();
      setShowModal();
      if (!stepsCheckListMeta.collegues) {
        setMetadata({ checklist: { ...stepsCheckListMeta, collegues: true } });
      }
    }
  }, [data, userRefetch, stepsCheckListMeta, setMetadata, setShowModal]);

  const handleSubmit = () => {
    if (!isEmpty(errors)) {
      setShowErrors(true);
    } else {
      InviteUser({
        variables: {
          ...values,
          teamRole: 'USER',
        },
      });
    }
  };

  const onChange = (e) => {
    handleChange(e);
  };

  return (
    <>
      <FieldsWrapper>
        {addPersonFields.map(({ field, type, label }) => (
          <Fragment key={field}>
            {field !== 'companyRole' ? (
              <Box mb="16px">
                <Input
                  variant="outlined"
                  type={type || 'text'}
                  name={field}
                  key={field}
                  label={label}
                  value={values[field]}
                  onChange={onChange}
                  onBlur={handleBlur}
                  autoFocus={field === 'name' || false}
                  customLabel
                  customLabelProps={{
                    fontSize: '12px',
                  }}
                />
              </Box>
            ) : (
              <>
                <P
                  fontSize="12px !important"
                  fontWeight={700}
                  width="100%"
                  textAlign="left"
                  lineHeight="30px"
                  margin="0 0 -12px 0"
                >
                  {label}
                </P>
                <StyledSelect
                  name={field}
                  id={field}
                  value={values[field]}
                  onChange={onChange}
                  options={addPersonOptions}
                />
              </>
            )}
            {showErrors && errors[field] && (
              <L12 margin="-10px 0 10px 0" color={THEME.secondaryColors.danger}>
                {errors[field]}
              </L12>
            )}
          </Fragment>
        ))}
      </FieldsWrapper>
      <FlexContainer margin="auto 0 0" justifyContent="flex-start">
        <BlockWrap margin="30px 16px 0 0">
          <Button onClick={handleSubmit} className="blue" loading={loading}>
            {t('buttonsText.Invite')}
          </Button>
        </BlockWrap>
        <BlockWrap margin="30px 0 0">
          <Button onClick={setShowModal} ghost>
            {t('buttonsText.Cancel')}
          </Button>
        </BlockWrap>
      </FlexContainer>
    </>
  );
};

AddPersonForm.propTypes = {
  values: shape({}).isRequired,
  errors: shape({}).isRequired,
  handleChange: func.isRequired,
  handleBlur: func.isRequired,
  setShowModal: func.isRequired,
  userRefetch: func.isRequired,
};

export default withFormik(addPersonSchema)(AddPersonForm);
