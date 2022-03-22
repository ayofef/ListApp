import React, { Fragment, useState } from 'react';
import { withFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import isEmpty from 'lodash/isEmpty';
import { func, shape, string } from 'prop-types';
import Box from '@material-ui/core/Box';
import editPersonSchema, { editPersonFields, editPersonOptions } from '../../../utils/schemas/editPersonSchema';
import { FieldsWrapper } from '../formStyles';
import { Button, BlockWrap, L12, StyledSelect, P } from '../../atoms';
import THEME from '../../../constants/theme';
import Input from '../_common/Input';
import { FlexContainer } from '../../atoms/flex/FlexContainer';

const EditPersonForm = ({ values, handleChange, handleBlur, errors, setShowModal, updateUser, userId }) => {
  const [showErrors, setShowErrors] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = () => {
    if (!isEmpty(errors)) {
      setShowErrors(true);
    } else {
      setShowModal();
      updateUser({
        variables: {
          id: userId,
          newRole: values.companyRole,
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
        {editPersonFields.map(({ field, type, label }) => (
          <Fragment key={field}>
            {field !== 'companyRole' ? (
              <Box mb="16px">
                <Input
                  variant="outlined"
                  disabled
                  type={type || 'text'}
                  key={field}
                  name={field}
                  label={label}
                  value={values[field]}
                  onChange={onChange}
                  onBlur={handleBlur}
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
                  options={editPersonOptions}
                  label={label}
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
          <Button onClick={handleSubmit} className="blue">
            {t('buttonsText.RequestChange')}
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

EditPersonForm.propTypes = {
  values: shape({}).isRequired,
  errors: shape({}).isRequired,
  handleChange: func.isRequired,
  handleBlur: func.isRequired,
  setShowModal: func.isRequired,
  updateUser: func.isRequired,
  userId: string.isRequired,
};

export default withFormik(editPersonSchema)(EditPersonForm);
