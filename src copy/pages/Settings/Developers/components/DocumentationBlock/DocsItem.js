import React from 'react';
import { shape, string } from 'prop-types';
import Box from '@material-ui/core/Box';
import capitalize from '@material-ui/core/utils/capitalize';
import { useTranslation } from 'react-i18next';
import { P, P14B } from '../../../../../components/atoms';

const DocsItem = ({ data }) => {
  const { t } = useTranslation();

  const Icon = data?.icon;

  return (
    <Box
      component={data.link ? 'a' : 'div'}
      flex="1"
      display="flex"
      mr="24px"
      alignItems="flex-start"
      {...(data?.link && { href: data.link, target: '_blank', rel: 'noopener noreferrer' })}
    >
      <Box
        width="48px"
        height="48px"
        borderRadius="6px"
        bgcolor=" #F5F2FF"
        overflow="hidden"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexShrink="0"
      >
        <Icon />
      </Box>
      <Box pl="24px" height="100%" display="flex" flexDirection="column" justifyContent="center">
        <P14B>{capitalize(data.title)}</P14B>
        <P lineHeight="1.5" color="#787F88" fontSize="13px">
          {t(data.description)}
        </P>
      </Box>
    </Box>
  );
};

DocsItem.propTypes = {
  data: shape({
    title: string,
    description: string,
    linkText: string,
    link: string,
  }).isRequired,
};

export default DocsItem;
