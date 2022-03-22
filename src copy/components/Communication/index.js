import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import { v4 } from 'uuid';

import EmptyState from './emptyState';
import Preview from '../EmailTemplate/Preview';
import { H4, P14 } from '../atoms';
import GoToBrandCenter from '../goToBrandCenter';

const Communication = ({ brandInfo, we, templates, editorProperties }) => {
  const { t } = useTranslation();

  return (
    <Box display="flex" flexWrap="nowrap" p="32px 0">
      <Box flex="0 0 420px" mb="32px">
        <H4>{t('Email templates')}</H4>
        <P14 color="#787F88" padding="16px 0" maxWidth="230px">
          {t('Email templates can be used in automations.')}
        </P14>
        <Box mt="40px">
          <GoToBrandCenter invert />
        </Box>
      </Box>
      <Box width="100%" display="flex" flexWrap="wrap" position="relative">
        {templates?.length > 0 ? (
          templates.map((el) => (
            <Preview brandInfo={brandInfo} we={we} template={el} key={v4()} editorProperties={editorProperties} />
          ))
        ) : (
          <EmptyState />
        )}
      </Box>
    </Box>
  );
};

Communication.propTypes = {
  we: PropTypes.string.isRequired,
  templates: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      subject: PropTypes.string,
      content: PropTypes.string,
      actionText: PropTypes.string,
      actionLink: PropTypes.string,
    })
  ).isRequired,
  brandInfo: PropTypes.shape({
    accentColor: PropTypes.string,
    actionButton: PropTypes.string,
    socialNetworks: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        iconUrl: PropTypes.string,
        linkUrl: PropTypes.string,
      })
    ),
    logoUrl: PropTypes.string,
    faviconUrl: PropTypes.string,
    templateConfig: PropTypes.shape({
      signOffContent: PropTypes.string,
      footerText: PropTypes.string,
      logoType: PropTypes.string,
      logoPosition: PropTypes.string,
      logoSize: PropTypes.string,
    }),
  }).isRequired,
  editorProperties: PropTypes.arrayOf(
    PropTypes.shape({
      group: PropTypes.string,
      properties: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
        })
      ),
    })
  ),
};

Communication.defaultProps = {
  editorProperties: [],
};

export default Communication;
