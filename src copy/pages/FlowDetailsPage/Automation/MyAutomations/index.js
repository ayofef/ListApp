import PropTypes from 'prop-types';
import React from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import isEmpty from 'lodash/isEmpty';
import AddNewButton from '../../Components/AddNewButton';

import { P18 } from '../../../../components/atoms';
import LoadingState from './LoadingState';
import { usePaymentFlowContext } from '../../paymentFlowContext';
import AutomationBar from '../AutomationBar';
import { StyledBarSections } from './styled';

const MyAutomations = ({ toggleBrowseTemplates }) => {
  const { t } = useTranslation();
  const { loading, automationsList } = usePaymentFlowContext();

  return (
    <Box mb="56px">
      <P18 fontWeight="600" margin="0 0 14px 0">
        {t('My Automations')}
      </P18>
      <Box component="section">
        <StyledBarSections>
          {loading && <LoadingState />}

          {!loading &&
            !isEmpty(automationsList) &&
            automationsList?.map((automation) => <AutomationBar key={automation?.id} automation={automation} />)}

          {/* TODO: bring back post MVP*/}
          {/* <NewAutomation toggleIsOpen={toggleIsOpen} openDialog={openDialog} /> */}
          <AddNewButton
            label="Create new Automation from template"
            onClick={toggleBrowseTemplates}
            iconBorderRadius="8px"
          />
        </StyledBarSections>
      </Box>
    </Box>
  );
};

MyAutomations.propTypes = {
  toggleBrowseTemplates: PropTypes.func.isRequired,
};

export default MyAutomations;
