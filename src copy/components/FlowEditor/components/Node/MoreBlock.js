import React from 'react';
import { string } from 'prop-types';
import DropDownMenu from '../../../menus/DropDownMenu';
import { MoreButton, MoreWrapper } from './styled';
import More from '../../../../assets/icons/More';
import { useFlowEditorContext } from '../../context';
import useIsDemo from '../../../../hooks/useIsDemo';

const MoreBlock = ({ id }) => {
  const isDemo = useIsDemo();
  const { onElementsRemove, setSelectedElementId } = useFlowEditorContext();

  return (
    <MoreWrapper>
      <DropDownMenu
        id={`Node-${id}`}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        button={
          <MoreButton onMouseDown={(event) => event.stopPropagation()}>
            <More />
          </MoreButton>
        }
        options={[{ Edit: () => setSelectedElementId(id) }, !isDemo && { Delete: () => onElementsRemove([{ id }]) }]}
      />
    </MoreWrapper>
  );
};

MoreBlock.propTypes = {
  id: string.isRequired,
};

export default MoreBlock;
