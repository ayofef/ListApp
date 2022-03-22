import React, { useState, useRef } from 'react';
import { string, shape, arrayOf, oneOfType } from 'prop-types';
import Box from '@material-ui/core/Box';
import isEmpty from 'lodash/isEmpty';
import { StyledSetupItem } from './styled';
import ArrowUp from '../../../../../../../../assets/icons/ArrowUp';
import { P12, L14M } from '../../../../../../../../components/atoms';
import { parseIntegrationText } from '../../../../constant';
import { INTEGRATION_FN_MAP, MENU_ITEMS_MAP } from '../constant';
import THEME from '../../../../../../../../constants/theme';

const DEFAULT_HEIGHT = 52;

const SetupItem = ({ integrationItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const descriptionRef = useRef(null);
  const descriptionHeight = descriptionRef.current?.clientHeight;

  const { title, descriptions } = INTEGRATION_FN_MAP[integrationItem.dataKey](integrationItem);
  const isArrayDescription = Array.isArray(descriptions);

  const handleToggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  // This needs refactoring
  if (integrationItem.dataKey === MENU_ITEMS_MAP.integration && isEmpty(descriptions)) return null;

  return (
    <StyledSetupItem
      onClick={handleToggleOpen}
      $isOpen={isOpen}
      ref={descriptionRef}
      $height={isOpen ? `${descriptionHeight + DEFAULT_HEIGHT}px` : `${DEFAULT_HEIGHT}px`}
    >
      <Box display="flex" justifyContent="space-between" pb="16px" pt="18px">
        <L14M>{title} </L14M> <ArrowUp />
      </Box>

      <Box>
        {isArrayDescription ? (
          descriptions.map((desc) => (
            <P12 key={desc} margin="0 0 5px 0" color={THEME.greyColors.grey1}>
              {parseIntegrationText(desc)}
            </P12>
          ))
        ) : (
          <P12 color={THEME.greyColors.grey1}>{descriptions}</P12>
        )}
      </Box>
    </StyledSetupItem>
  );
};

SetupItem.propTypes = {
  integrationItem: shape({
    dataKey: string.isRequired,
    title: string.isRequired,
    data: oneOfType[(string, arrayOf(string))],
    subData: string,
  }).isRequired,
};

export default SetupItem;
