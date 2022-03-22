import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';
import { useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import capitalize from '@material-ui/core/utils/capitalize';
import { ButtonRounded, H4 } from '../../atoms';
import GoToBrandCenter from '../../goToBrandCenter';
import BasicInputs from './BasicInputs';
import CarbonCopyControl from './CarbonCopyControl';
import CarbonCopyInputs from './CarbonCopyInputs';
import MessageBodyField from './MessageBodyField';
import { CHECKBOX_KEYS } from './constants';

const EmailMessageFields = ({ changeTemplate, templateData }) => {
  const { t } = useTranslation();
  const { values } = useFormikContext();

  const [carbonControl, setCarbonControl] = useState(() =>
    CHECKBOX_KEYS.reduce((acc, key) => ({ ...acc, [key]: values[key] ?? false }), {})
  );

  return (
    <Box display="flex" justifyContent="center" pt="10px">
      <Box flex="1 1 auto" maxWidth="700px">
        <Grid container spacing={2}>
          <BasicInputs />

          <CarbonCopyInputs carbonControl={carbonControl} />

          <Grid item xs={12}>
            <MessageBodyField />
          </Grid>
        </Grid>
      </Box>

      <Box component="aside" ml="56px">
        <Box component="p" m="0 0 16px" fontSize="16px" lineHeight="25px">
          {t('Email Options')}
        </Box>

        <CarbonCopyControl carbonControl={carbonControl} setCarbonControl={setCarbonControl} />

        <Box component="section" mt="24px">
          <Box component="p" m="0 0 16px" fontSize="16px" lineHeight="25px">
            {t('Current template')}
          </Box>

          <Box maxWidth="200px">
            <H4>{capitalize(t(`${isEmpty(templateData) ? 'New email template' : templateData?.name}`) ?? '')}</H4>
          </Box>
        </Box>

        <Box component="section" color="#3023C8" display="flex" flexDirection="column" alignItems="flex-start">
          <Box ml="-10px" my="24px">
            <ButtonRounded variant="text" color="inherit" onClick={changeTemplate}>
              <Box ml="-14px" p="0 16px">
                {t('Change template')}
              </Box>
            </ButtonRounded>
          </Box>
        </Box>

        <GoToBrandCenter marginTop="40px" />
      </Box>
    </Box>
  );
};

EmailMessageFields.propTypes = {
  changeTemplate: PropTypes.func.isRequired,
  templateData: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

export default EmailMessageFields;
