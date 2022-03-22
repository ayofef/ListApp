import React, { useMemo, useState } from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import Title from '../../../../Title';
import EmailMessageModal from './EmailMessageModal';
import { useFlowEditorContext } from '../../../../../../context';
import { useSelectedElement } from '../../hooks/useSelectedElement';
import { useBrandedEmailData } from '../../../../../../../../hooks/useBrandedEmailData';
import EmailSelectTemplateModal from './EmailSelectTemplateModal';
import EmailPreview from './EmailPreview';

const EmailMessageInput = () => {
  const [modalType, setModalType] = useState();
  const [templateData, setTemplateData] = useState({});
  const { t } = useTranslation();
  const { loading, we, brandInfo } = useBrandedEmailData();
  const { initialState } = useFlowEditorContext();
  const [{ id: stepId }] = useSelectedElement();
  const emailData = useMemo(() => {
    if (!stepId) return undefined;

    return initialState?.find(({ key }) => key === `${stepId}.message`)?.value;
  }, [initialState, stepId]);

  if (loading) {
    return <Box>Email Message loading...</Box>;
  }

  return (
    <Box>
      <Title>{t('Preview')}</Title>

      {emailData ? (
        <Box onClick={() => setModalType('EmailMessageModal')}>
          <EmailPreview brandInfo={brandInfo} we={we} editorContent={emailData.body} />
        </Box>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="190px"
          height="200px"
          border="1px solid rgba(0, 0, 0, 0.07)"
          boxShadow="0 2 4px rgba(155, 159, 171, 0.11)"
          borderRadius="6px"
          color="#787F88"
        >
          <Box component="span" width="50%" textAlign="center">
            {t('Email is not configured')}
          </Box>
        </Box>
      )}

      <Box mt="18px">
        <EmailSelectTemplateModal
          isOpen={modalType === 'EmailSelectTemplateModal'}
          setModalType={setModalType}
          setTemplateData={setTemplateData}
          emailData={emailData}
        />
      </Box>

      {modalType === 'EmailMessageModal' && (
        <EmailMessageModal templateData={templateData} setModalType={setModalType} />
      )}
    </Box>
  );
};

export default EmailMessageInput;
