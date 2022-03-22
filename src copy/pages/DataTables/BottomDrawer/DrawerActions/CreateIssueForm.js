import React from 'react';
import { bool, func } from 'prop-types';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import { Form, Formik } from 'formik';
import { CircularLoader, ButtonRounded } from '../../../../components/atoms';
import { createIssueFields, initialValues, radioOptions, validation, createIssueFieldNames } from './fieldsSettings';
import Input from '../../../../components/forms/_common/Input';
import RadioGroup from '../../../../components/forms/_common/RadioGroup';
import { FlexContainer } from '../../../../components/atoms/flex/FlexContainer';

const IssueCreateModal = ({ closeModal, loading, submitForm }) => {
  const { t } = useTranslation();

  const handleSubmit = (data) => {
    submitForm(data);
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validation}
      onSubmit={handleSubmit}
      validateOnBlur={false}
      validateOnMount
    >
      <Form>
        {createIssueFields.map(({ field, type, label }) => {
          const isCommentField = field === createIssueFieldNames.comment;
          const isIssuerField = field === createIssueFieldNames.issuer;

          const Component = isCommentField ? Input : RadioGroup;

          return (
            <Component
              customLabel
              customLabelProps={{ margin: '24px 0 6px 0' }}
              key={field}
              name={field}
              type={type}
              label={label}
              {...(isIssuerField && {
                radioOptions,
              })}
              {...(isCommentField && {
                multiline: true,
                rows: 4,
              })}
            />
          );
        })}

        <FlexContainer margin="29px 0 0" justifyContent="flex-start">
          <ButtonRounded primary type="submit" variant="contained" color="primary">
            {loading ? <CircularLoader size={20} bgcolor="#fff" /> : t(`Continue`)}
          </ButtonRounded>
          <Box ml="8px">
            <ButtonRounded type="button" variant="contained" color="secondary" onClick={closeModal}>
              {t('Cancel')}
            </ButtonRounded>
          </Box>
        </FlexContainer>
      </Form>
    </Formik>
  );
};

IssueCreateModal.propTypes = {
  closeModal: func.isRequired,
  loading: bool.isRequired,
  submitForm: func.isRequired,
};

export default IssueCreateModal;
