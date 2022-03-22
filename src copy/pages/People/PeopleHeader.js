import React from 'react';
import { useTranslation } from 'react-i18next';
import { string, func, node, oneOfType, arrayOf } from 'prop-types';
import { ButtonRounded, H3, BlockWrap } from '../../components/atoms';
import { FlexContainer } from '../../components/atoms/flex/FlexContainer';

const PeopleHeader = ({ title, buttonText, handleClick, addToSlack }) => {
  const { t } = useTranslation();

  return (
    <FlexContainer margin="-3px 0 20px 0" width="100%" justifyContent="space-between">
      <H3 fontWeight="600">{t(title)}</H3>

      <FlexContainer justifyContent="flex-start">
        {addToSlack && <BlockWrap margin="0 16px 0 0">{addToSlack}</BlockWrap>}

        <ButtonRounded variant="contained" color="primary" smaller onClick={handleClick}>
          {t(buttonText)}
        </ButtonRounded>
      </FlexContainer>
    </FlexContainer>
  );
};

PeopleHeader.propTypes = {
  title: string.isRequired,
  buttonText: string.isRequired,
  handleClick: func.isRequired,
  addToSlack: oneOfType([node, arrayOf(node)]),
};

PeopleHeader.defaultProps = {
  addToSlack: null,
};

export default PeopleHeader;
