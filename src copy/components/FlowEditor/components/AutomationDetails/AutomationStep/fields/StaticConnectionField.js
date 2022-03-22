import React from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import Select from '../../../../../forms/_common/Select';
import Title from '../../Title';
import { StyledFormControl } from './styled';
import { useConnectionDetails, useSelectedElement } from './hooks';
import { CircleImage } from '../../../../../atoms';
import LoadingState from '../../LoadingState';

const StaticConnectionField = () => {
  const { t } = useTranslation();
  const [{ connectionId }] = useSelectedElement();
  const { connections, connectionsLoading } = useConnectionDetails([connectionId]);

  const { id, name, company } = connections[0] ?? {};

  const options = [
    {
      value: id,
      title: (
        <Box display="flex" alignItems="center">
          <CircleImage src={company?.logo} alt={name} size="24" />
          <Box ml={1}> {name}</Box>
        </Box>
      ),
    },
  ];

  return (
    <Box component="section">
      <Title>{t('Connection')}</Title>
      <LoadingState loading={connectionsLoading} height="40px">
        {id && (
          <StyledFormControl fullWidth>
            <Select name="connection" value={id} options={options} disabled={true} />
          </StyledFormControl>
        )}
      </LoadingState>
    </Box>
  );
};

export default StaticConnectionField;
