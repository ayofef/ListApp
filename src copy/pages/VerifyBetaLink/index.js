import React from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import PureLayout from '../../components/layouts/PureLayout';
import PureLayoutBox from '../../components/layouts/PureLayoutBox';

import { useVerifyBetaLink } from './useVerifyBetaLink';
import { Title, Description, Progress } from './styled';

const TITLE = 'Please wait.';
const DESC = 'Access link verification in progress.';

const VerifyBetaLink = () => {
  const { t } = useTranslation();
  useVerifyBetaLink();

  return (
    <PureLayout>
      <PureLayoutBox>
        <Box>
          <Title>{t(TITLE)}</Title>
          <Description>{t(DESC)}</Description>
          <Progress />
        </Box>
      </PureLayoutBox>
    </PureLayout>
  );
};

export default VerifyBetaLink;
