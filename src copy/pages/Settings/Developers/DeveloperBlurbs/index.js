import React from 'react';
import Box from '@material-ui/core/Box';
import { P16B, P14, ButtonRounded } from '../../../../components/atoms';
import { StyledWrapper } from './styled';

const devZoneUrl = process.env.REACT_APP_DEV_ZONE_URL;

const BLURBS = [
  {
    title: 'Instruct',
    description:
      'WhenThen provides a collection of APIs that give you the flexibility to connect with any payment service to verify, collect payments and instruct payouts via our payment form SDK and hosted checkout experience.',
    link: { text: 'Learn more', to: `${devZoneUrl}/instruct` },
  },
  {
    title: 'See the API Documentation',
    description: 'Read WhenThen API Reference documentation to understand all of our APIs.',
    link: { text: 'Learn more', to: `${devZoneUrl}/api-reference` },
  },
];

const DeveloperBlurbs = () => {
  return (
    <StyledWrapper>
      {BLURBS.map(({ title, description, link }) => (
        <Box
          key={title}
          bgcolor="#F5F6F7"
          borderRadius="6px"
          p="24px"
          minHeight="180px"
          flex="1"
          display="flex"
          flexDirection="column"
        >
          <P16B>{title}</P16B>
          <P14 color="#787F88" margin="5px 0 0 0">
            {description}
          </P14>

          <Box mt="auto" mb="-10px">
            <ButtonRounded component="a" href={link.to} target="_blank" rel="noopener noreferrer" color="primary">
              {link?.text}
            </ButtonRounded>
          </Box>
        </Box>
      ))}
    </StyledWrapper>
  );
};

export default DeveloperBlurbs;
