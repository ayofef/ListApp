import { shape, string, arrayOf } from 'prop-types';
import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import { NodeLibraryItem } from './NodeLibraryItem';
import { L12B } from '../../../atoms/Typography/L12B';
import { HeaderWrapper, ItemContainer, ShowAll } from './styled';
import { L12 } from '../../../atoms';
import AddNewConnectionButton from '../AddNewConnectionButton';
import THEME from '../../../../constants/theme';
import { generateUserPilotAttribute } from '../../../../constants/generateUserPilotLabel';
import { USER_PILOT_SECTION_ID } from '../constant';

const NodeLibraryGroup = ({ name, items, extraItems }) => {
  const [shownAll, setShownAll] = useState(false);

  return (
    <>
      {name !== 'ungrouped' && (
        <HeaderWrapper
          display="flex"
          justifyContent="space-between"
          {...generateUserPilotAttribute(USER_PILOT_SECTION_ID, 'section_header', name)}
        >
          <L12B color={THEME.greyColors.grey9}>{name.toUpperCase()}</L12B>
          {extraItems && extraItems.length > 0 && (
            <ShowAll>
              <L12 onClick={() => setShownAll(!shownAll)}>{shownAll ? 'Hide extras' : 'Show all'}</L12>
            </ShowAll>
          )}
        </HeaderWrapper>
      )}

      <Box mt={2} display="flex" flexDirection="column">
        {name === 'services' && (
          <ItemContainer>
            <AddNewConnectionButton
              iconSize="32px"
              {...generateUserPilotAttribute(USER_PILOT_SECTION_ID, 'service', 'new-connection')}
            />
          </ItemContainer>
        )}
        {items.map((paletteItem) => (
          <NodeLibraryItem key={paletteItem.id} nodeData={paletteItem} section={name} />
        ))}
        {shownAll &&
          extraItems &&
          extraItems.map((paletteItem) => (
            <NodeLibraryItem key={paletteItem.id} nodeData={paletteItem} section={name} />
          ))}
      </Box>
    </>
  );
};

NodeLibraryGroup.propTypes = {
  name: string.isRequired,
  extraItems: arrayOf(
    shape({
      id: string.isRequired,
    }).isRequired
  ),
  items: arrayOf(
    shape({
      id: string.isRequired,
    }).isRequired
  ).isRequired,
};

NodeLibraryGroup.defaultProps = {
  extraItems: [],
};

export { NodeLibraryGroup };
