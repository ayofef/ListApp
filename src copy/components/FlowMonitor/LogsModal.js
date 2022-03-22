import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import THEME from '../../constants/theme';
import { StyledToggleGroup, StyledToggleButton } from './styled';
import { useLogsData } from './hooks/useLogsData';
import LogsRow from './LogsRow';

const LogsModal = () => {
  const { selectedItemLogs = {}, logs } = useLogsData();
  const [activeTab, setActiveTab] = useState('input');

  const handleTabChange = (e, newTab) => {
    if (newTab) {
      setActiveTab(newTab);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      flex={1}
      bgcolor={THEME.primaryColors.black}
      height="100%"
      boxSizing="border-box"
      p="24px 0 0"
    >
      <StyledToggleGroup value={activeTab} onChange={handleTabChange} exclusive>
        <StyledToggleButton value="input">Input</StyledToggleButton>
        <StyledToggleButton value="log">Log</StyledToggleButton>
        <StyledToggleButton value="output">Output</StyledToggleButton>
      </StyledToggleGroup>
      <Box width="100%" overflow="scroll" py="30px">
        {activeTab === 'input' || activeTab === 'output'
          ? selectedItemLogs[activeTab]?.map((el) => (
              <LogsRow key={`${el?.key}-${activeTab}`} name={el?.key?.toString()} value={el?.value?.toString()} />
            ))
          : logs?.map((el) => <LogsRow key={el?.id?.toString()} value={el?.message?.toString()} />)}
      </Box>
    </Box>
  );
};

export default LogsModal;
