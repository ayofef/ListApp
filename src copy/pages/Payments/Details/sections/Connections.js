import React, { useMemo } from 'react';
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import Tabs from '../../../../components/common/Tabs';
import { Button, P } from '../../../../components/atoms';

const MOCK = ['Hubspot', 'Google Analytics'];
const HEADER = 'Connections';

const Connections = () => {
  const { t } = useTranslation();

  const tabs = useMemo(
    () => [
      {
        label: 'Input',
        node: (
          <Box>
            {MOCK.map((v) => (
              <Box key={v} display="flex" m="12px 0">
                <Box component="i" width="24px" height="24px" borderRadius="50%" bgcolor="#C4CBD2" mr="8px" />

                <Box component="p" m="0" fontSize="14px">
                  {v}
                </Box>
              </Box>
            ))}
          </Box>
        ),
      },
      {
        label: 'Output',
        node: (
          <Box>
            {MOCK.map((v) => (
              <Box key={v} display="flex" m="12px 0">
                <Box component="i" width="24px" height="24px" borderRadius="50%" bgcolor="#C4CBD2" mr="8px" />

                <Box component="p" m="0" fontSize="14px">
                  {v}
                </Box>
              </Box>
            ))}
          </Box>
        ),
      },
    ],
    []
  );

  return (
    <Box component="section" mt="54px">
      <Box component="h3">{t(HEADER)}</Box>

      <Box position="relative">
        <Box position="absolute" right="0" top="1px" zIndex="1">
          <Button small transparent minHeight="auto" onClick={() => null} fontSize="14px">
            <P color="#4E40EF">Edit</P>
          </Button>
        </Box>

        {tabs?.length ? (
          <Tabs color="#4E40EF" tabs={tabs} />
        ) : (
          <Alert severity="error">{HEADER} data are corrupted.</Alert>
        )}
      </Box>
    </Box>
  );
};

export default Connections;
