import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import { StyledFormControl } from '../Condition/styled';
import { useFlowEditorContext } from '../../../../../context';
import { useSelectedElement } from '../hooks';
import { FALSE_STEP_ID, ELSE_STEP_ID, HANDLE_ID, SIZE, STEP_SETTINGS, TRUE_STEP_ID } from './constants';
import { createOptions } from './createOptions';
import Select, { NONE } from '../../../../../../forms/_common/Select';

const StepId = ({ fieldName, disabled }) => {
  const { t } = useTranslation();
  const { elements, makeConnection } = useFlowEditorContext();
  const [selectedElementData] = useSelectedElement();
  const { [fieldName]: fieldValue } = selectedElementData;
  const { title, bgColor } = useMemo(() => STEP_SETTINGS[fieldName], [fieldName]);

  const options = useMemo(() => createOptions({ elements, selectedElementData }), [elements, selectedElementData]);

  const onChange = useCallback(
    ({ target: { name, value } }) => {
      makeConnection({
        source: selectedElementData.id,
        sourceHandle: HANDLE_ID[name],
        target: value,
      });
    },
    [makeConnection, selectedElementData.id]
  );

  return (
    <Box>
      <Box component="p" mt="24px" mb="16px" fontSize="16px" fontWeight="600">
        {t(title)}:
      </Box>

      <Box display="flex" alignItems="center" p="16px" borderRadius="8px" bgcolor="#F5F6F7">
        <Box
          width={SIZE}
          height={SIZE}
          flexShrink="0"
          mr="12px"
          border="1px solid rgba(0, 0, 0, 0.07)"
          borderRadius="50%"
          bgcolor={bgColor}
          boxShadow="0px 2px 4px rgba(155, 159, 171, 0.11)"
        />

        <Box maxWidth="200px" flexGrow="1">
          <StyledFormControl fullWidth padding="8.5px 20px">
            <Select
              name={fieldName}
              value={fieldValue || NONE}
              options={options}
              onChange={onChange}
              disabled={disabled}
            />
          </StyledFormControl>
        </Box>
      </Box>
    </Box>
  );
};

StepId.propTypes = {
  fieldName: PropTypes.oneOf([TRUE_STEP_ID, FALSE_STEP_ID, ELSE_STEP_ID]).isRequired,
  disabled: PropTypes.bool,
};

StepId.defaultProps = {
  disabled: false,
};

export default StepId;
