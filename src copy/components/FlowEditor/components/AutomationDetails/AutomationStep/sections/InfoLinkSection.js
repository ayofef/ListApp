import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import Title from '../../Title';
import Bookmark from '../../../../../../assets/icons/Bookmark';
import { InfoLinkBox } from '../fields/styled';
import SubTitle from '../../SubTitle';
import { StyledBox, StyledWrapper } from './styled';
import ChevronRight from '../../../../../../assets/icons/Elements/ChevronRight';

const InfoLinkSection = ({ link, linkTitle, title, subTitle, linkSubTitle }) => {
  const { t } = useTranslation();
  return (
    <Box marginBottom="80px">
      {title && <Title>{t(title)}</Title>}
      {subTitle && <SubTitle>{t(subTitle)}</SubTitle>}
      <StyledBox>
        <InfoLinkBox>
          <Bookmark />
        </InfoLinkBox>
        <StyledWrapper>
          <a href={link} target="_blank" rel="noopener noreferrer">
            <Box>
              <Title fontSize="14px" mt="2px" mb="2px" color="#000">
                {t(linkTitle)}
              </Title>

              {linkSubTitle && (
                <SubTitle fontSize="13px" mt="2px" mb="2px">
                  {t(linkSubTitle)}
                </SubTitle>
              )}
            </Box>
            <StyledBox marginRight="10px">
              <ChevronRight />
            </StyledBox>
          </a>
        </StyledWrapper>
      </StyledBox>
    </Box>
  );
};

InfoLinkSection.propTypes = {
  link: PropTypes.string.isRequired,
  linkTitle: PropTypes.string.isRequired,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  linkSubTitle: PropTypes.string,
};

InfoLinkSection.defaultProps = {
  title: '',
  subTitle: '',
  linkSubTitle: '',
};

export default InfoLinkSection;
