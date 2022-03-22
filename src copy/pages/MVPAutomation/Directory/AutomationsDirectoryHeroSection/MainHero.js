import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { H3, P } from '../../../../components/atoms';
import { StyledWrapper, StyledLeftItem, StyledRightItem } from '../../Overview/BrowseAutomationTemplatesCta/styled';
import { BLOG_URL } from './constant';

const MainHero = ({ title, tag, slug, imageUrl }) => {
  const { t } = useTranslation();
  return (
    <StyledWrapper href={`${BLOG_URL}/${slug}`} target="_blank" rel="noreferrer noopener">
      <StyledLeftItem $maxWidth="392px">
        <P fontSize="12px" color="#fff" fontWeight="600">
          {t(tag)}
        </P>
        <H3 color="#fff" fontWeight="600" margin="8px 0 0 0" lineHeight="28px">
          {t(title)}
        </H3>
      </StyledLeftItem>

      <StyledRightItem $margin="0 -34px 0 0">
        <img src={imageUrl} alt={title} />
      </StyledRightItem>
    </StyledWrapper>
  );
};

MainHero.propTypes = {
  title: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default MainHero;
