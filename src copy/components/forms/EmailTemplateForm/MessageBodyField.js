import React, { useCallback } from 'react';
import Box from '@material-ui/core/Box';
import { useFormikContext } from 'formik';
import { useFlowPropertiesList } from '../../FlowEditor/components/AutomationDetails/AutomationStep/fields/hooks';
import EmptyBlock from '../../EmailTemplate/EmptyBlock';
import EmailContent from '../../EmailTemplate/EmailContent';
import EmailFooter from '../../EmailTemplate/EmailFooter';
import EmailLogo from '../../EmailTemplate/EmailLogo';
import EmailSignOff from '../../EmailTemplate/EmailSignOff';
import { useBrandedEmailData } from '../../../hooks/useBrandedEmailData';
import EmailSkeleton from '../../EmailTemplate/EmailSkeleton';
// MOCKED
const notBrandCenter = true;
const preview = false;
const noop = () => {};
const initialFooterText = `PS: If not now then WhenThen`;

const MessageBodyField = () => {
  const { loading, we, logoHandler, brandInfo } = useBrandedEmailData();
  const { getAvailableProperties: properties, loading: _loading } = useFlowPropertiesList();
  const { values, setFieldValue } = useFormikContext();

  const handleSave = useCallback(
    (value) => {
      setFieldValue('body', value);
    },
    [setFieldValue]
  );
  const handleSaveButton = useCallback(
    (value) => {
      setFieldValue('actionLink', value.actionLink);
      setFieldValue('actionText', value.actionText);
    },
    [setFieldValue]
  );

  if (loading || _loading) {
    return <EmailSkeleton />;
  }

  return (
    <Box
      boxSizing="border-box"
      padding="40px"
      borderRadius="8px"
      bgcolor="#fff"
      boxShadow="0px 0px 0px 2px rgba(155, 159, 171, 0.11)"
    >
      <EmailLogo
        defaultTab={!notBrandCenter}
        brandColor={brandInfo?.accentColor}
        admin={we}
        logo={brandInfo?.logoUrl}
        logoHandler={logoHandler}
        preview={preview}
      />

      <EmailContent
        handleSave={handleSave}
        properties={properties}
        initialEditorText={values?.body}
        defaultTab={notBrandCenter}
        notBrandCenter={notBrandCenter}
        preview={preview}
      />

      <EmptyBlock
        brandColor={brandInfo?.accentColor}
        buttonType={brandInfo?.actionButton}
        buttonText={values?.actionText}
        buttonLink={values?.actionLink}
        preview={preview}
        handleSave={handleSaveButton}
      />

      <EmailSignOff
        signOffContent={brandInfo?.templateConfig?.signOffContent}
        notBrandCenter={notBrandCenter}
        we={we}
        handleSaveSignOffContent={noop}
        preview={preview}
      />

      <EmailFooter
        footerText={brandInfo?.templateConfig?.footerText ?? initialFooterText}
        socialNetworks={brandInfo?.socialNetworks}
        notBrandCenter={notBrandCenter}
        handleSaveFooterText={noop}
        preview={preview}
      />
    </Box>
  );
};

export default MessageBodyField;
