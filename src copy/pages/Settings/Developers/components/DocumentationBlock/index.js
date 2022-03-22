import React from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import { H4, P14 } from '../../../../../components/atoms';
import DocsItem from './DocsItem';
import { Insights, Engage, Optimise } from '../../../../../assets/icons/Developers';

const devZoneUrl = process.env.REACT_APP_DEV_ZONE_URL;

const docsConsts = [
  {
    title: 'intent',
    description:
      'Monitor, analyse and optimise your checkout for payment intents, attempts, acceptance, fees and much more.',
    link: `${devZoneUrl}/intent`,
    icon: Insights,
  },
  {
    title: 'payments',
    description: 'Take a look at our Payments API to integrate with our vault and process payments.',
    link: `${devZoneUrl}/instruct/payments`,
    icon: Optimise,
  },
  {
    title: 'checkout',
    description:
      'WhenThen’s Checkout library contains client SDKs to build a checkout that can be customised, branded, and securely captures payment information.',
    link: `${devZoneUrl}/instruct/checkout`,
    icon: Engage,
  },
];

const HEADING = 'Which documentation are you looking for?';
const DESCRIPTION = 'Read WhenThen API Reference documentation to understand all of our APIs.';

const DocumentationBlock = () => {
  const { t } = useTranslation();
  return (
    <Box pt="40px" pb="80px">
      <H4>{t(HEADING)}</H4>
      <P14 color="#787F88" margin="8px 0 0 0">
        {t(DESCRIPTION)}
      </P14>
      <Box width="100%" display="flex" justifyContent="space-between" mt="40px">
        {docsConsts.map((data) => (
          <DocsItem key={data?.title} data={data} />
        ))}
      </Box>
    </Box>
  );
};

export default DocumentationBlock;
