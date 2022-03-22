import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import { Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { NotificationManager } from 'react-notifications';
import { useSelectedElement } from '../../../hooks';
import { useFlowEditorContext } from '../../../../../../../context';
import { StyledDialogContent, StyledDialogTitle } from '../../../../../../../../Dialog/styled';
import EmailMessageHeader from '../../../../../../../../forms/EmailTemplateForm/EmailMessageHeader';
import EmailMessageFields from '../../../../../../../../forms/EmailTemplateForm/EmailMessageFields';
import { ID, DEFAULT_VALUE } from '../../../../../../../../forms/EmailTemplateForm/constants';
import { StyledPaper } from './styled';
import { createVariables } from './createVariables';
import { useSaveConfiguration } from '../../../../../../../../../hooks/flowEditor/useSaveConfiguration';

const EmailMessageModal = ({ templateData, setModalType }) => {
  const { t } = useTranslation();
  const {
    flowId,
    elements,
    initialState,
    setInitialState,
    setElementDataToSave,
    elementDataToSave,
    setChangesMade,
    selectedElementData,
    setElements,
  } = useFlowEditorContext();
  const [{ id: stepId }] = useSelectedElement();
  const { saveFlowPromise } = useSaveConfiguration({
    flowId,
    initialState,
    setElements,
    setInitialState,
    setChangesMade,
    selectedElementData,
    elementDataToSave,
    setElementDataToSave,
  });
  const initialValues = useMemo(() => {
    const stepValue = initialState?.find(({ key }) => key === `${stepId}.message`)?.value;

    return Object.entries(DEFAULT_VALUE).reduce(
      (acc, [key, defaultValue]) => ({
        ...acc,
        [key]: stepValue?.[key] ?? templateData?.[key] ?? defaultValue,
      }),
      {}
    );
  }, [initialState, templateData, stepId]);

  const closeHandler = useCallback(() => setModalType(), [setModalType]);
  const changeTemplate = useCallback(() => setModalType('EmailSelectTemplateModal'), [setModalType]);
  // TODO: We need to change the logic for this. it shouldn't save at this point
  const submitHandler = useCallback(
    (values) => {
      const { updatedStep, ...variables } = createVariables({ stepId, values, elements });
      return saveFlowPromise({ variables }).then(({ errors }) => {
        if (errors) {
          NotificationManager.error(t('errors.errorSavingData'), 'Oops..', 5000);
          return;
        }
        setElementDataToSave(updatedStep.data);
        setModalType();
      });
    },
    [elements, stepId, saveFlowPromise, setModalType, t, setElementDataToSave]
  );

  return (
    <Formik initialValues={initialValues} onSubmit={submitHandler} enableReinitialize>
      <Form>
        <Dialog
          open={true}
          scroll="paper"
          PaperComponent={StyledPaper}
          aria-labelledby="email-configuration"
          fullScreen
        >
          <StyledDialogTitle id={`${ID}-title`} disableTypography>
            <EmailMessageHeader closeHandler={closeHandler} />
          </StyledDialogTitle>

          <StyledDialogContent>
            <EmailMessageFields changeTemplate={changeTemplate} templateData={templateData} />
          </StyledDialogContent>
        </Dialog>
      </Form>
    </Formik>
  );
};

EmailMessageModal.propTypes = {
  templateData: PropTypes.shape({
    body: PropTypes.string,
    subject: PropTypes.string,
  }).isRequired,
  setModalType: PropTypes.func.isRequired,
};

export default EmailMessageModal;
