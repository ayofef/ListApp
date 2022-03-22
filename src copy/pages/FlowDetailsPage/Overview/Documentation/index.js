import React from 'react';
import Box from '@material-ui/core/Box';
import { L16B } from '../../../../components/atoms/Typography/L16B';
import { L14, LinkWrapper } from '../../../../components/atoms';
import LinkOut from '../../../../assets/icons/LinkOut';
import { DocumentationWrapper } from '../CardStages/styled';
import THEME from '../../../../constants/theme';

const devZoneUrl = process.env.REACT_APP_DEV_ZONE_URL;

const Documentation = () => (
  <LinkWrapper noUnderline href={devZoneUrl} target="_blank">
    <DocumentationWrapper>
      <Box>
        <L16B color={THEME.primaryColors.primary}>Developer documentation</L16B>
        <L14 color={THEME.primaryColors.primary} noHover>
          Visit our developer documentation to lean how to integrate our Intent SDK, Checkout SDK and Payment APIs
        </L14>
      </Box>

      <LinkOut />
    </DocumentationWrapper>
  </LinkWrapper>
);

export default Documentation;
