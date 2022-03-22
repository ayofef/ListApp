import Box from '@material-ui/core/Box';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useQuery } from '@apollo/client';
import {
  StyledDialog,
  StyledDialogActions,
  StyledDialogContent,
  StyledDialogTitle,
  StyledPaper,
} from '../../Dialog/styled';
import { ButtonRounded } from '../../atoms';
import Select, { NONE } from '../../forms/_common/Select';
import { StyledFormControl } from './styled';
import { useFlowEditorContext } from '../../FlowEditor/context';
import TestSummary from './TestSummary';
import { useTestExamplesData } from './useTestExamplesData';
import { exampleDataTypeTitles } from './exampleDataTypes';
import { GQL_Q_GET_TEST_EXAMPLES } from '../../../utils/queries/flows/queries';
import CloseButton from '../../Dialog/CloseButton';

const ID = 'automation-test-examples';

const TestExamplesModal = ({ isOpen, onClose, onConfirm }) => {
  const { t } = useTranslation();
  const {
    setTestExamples,
    selectedTestExample,
    setSelectedTestExample,
    userInputRequestLoading,
    testFlowInstance,
    currentTestStepId,
    examplesRequired,
  } = useFlowEditorContext();
  const { examples, examplesOptions, selectValue, setSelectValue, exampleDataType } = useTestExamplesData();
  const { data, loading } = useQuery(GQL_Q_GET_TEST_EXAMPLES, {
    fetchPolicy: 'no-cache',
    variables: {
      instanceId: testFlowInstance?.id,
      stepId: currentTestStepId,
    },
    skip: !examplesRequired,
  });

  const handleOnChange = (e) => {
    setSelectValue(e.target.value);
    setSelectedTestExample(examples[e.target.value]);
  };

  useEffect(() => {
    setTestExamples(data?.getTestExamples);
  }, [data?.getTestExamples, setTestExamples]);

  useEffect(() => {
    if (examplesOptions?.length) {
      const id = examplesOptions?.[0]?.value;
      setSelectValue(id);
      setSelectedTestExample(examples[id]);
    }
  }, [examples, examplesOptions, setSelectValue, setSelectedTestExample]);
  return (
    !loading && (
      <StyledDialog
        open={isOpen}
        scroll="paper"
        width="496px"
        maxWidth="xs"
        PaperComponent={StyledPaper}
        aria-labelledby={ID}
      >
        <CloseButton onClick={onClose} />
        <StyledDialogTitle id={`${ID}-title`} disableTypography>
          {exampleDataTypeTitles[exampleDataType] || t('Choose data')}
        </StyledDialogTitle>
        <StyledDialogContent px="24px">
          <Box minWidth="300px" pb="12px" mt="16px">
            <StyledFormControl fullWidth>
              <Select
                value={selectValue || NONE}
                name="testExample"
                options={examplesOptions}
                onChange={handleOnChange}
                hideNone={true}
              />
            </StyledFormControl>
          </Box>
          {selectedTestExample && <TestSummary exampleDataType={exampleDataType} data={selectedTestExample} />}
        </StyledDialogContent>
        <StyledDialogActions px="24px">
          <ButtonRounded
            type="button"
            variant="contained"
            color="primary"
            onClick={onConfirm}
            disabled={userInputRequestLoading}
          >
            {userInputRequestLoading ? <CircularProgress size={24} color="inherit" /> : t('Continue')}
          </ButtonRounded>
          <ButtonRounded type="button" color="secondary" variant="contained" onClick={onClose}>
            {t('Cancel')}
          </ButtonRounded>
        </StyledDialogActions>
      </StyledDialog>
    )
  );
};

TestExamplesModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default TestExamplesModal;
