import React from 'react';
import { arrayOf, shape, string } from 'prop-types';
import DoneIcon from '@material-ui/icons/Done';
import THEME from '../../../constants/theme';
import { ColorProvider } from '../ColorProvider';
import { P14 } from '../Typography/P14';
import { BlockWrap } from '../temp-before-delete/BlockWrap';
import { FlexContainer } from '../flex/FlexContainer';

const ListWithCheck = ({ options }) => (
  <FlexContainer justifyContent="flex-start" alignItems="flex-start" flexDirection="column">
    {options.map(({ label }, index) => (
      <FlexContainer key={`ListWithCheck-${label}`} inline margin={index !== 0 && '8px 0 0'}>
        <BlockWrap margin="0 19px 0 0">
          <ColorProvider color={THEME.primaryColors.black}>
            <DoneIcon />
          </ColorProvider>
        </BlockWrap>
        <P14>{label}</P14>
      </FlexContainer>
    ))}
  </FlexContainer>
);

ListWithCheck.propTypes = {
  options: arrayOf(shape({ label: string })),
};

ListWithCheck.defaultProps = {
  options: [],
};

export default ListWithCheck;
