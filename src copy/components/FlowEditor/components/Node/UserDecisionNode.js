import React from 'react';
import { string } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { StyledBox, StyledGrabbableBox, StyledIconWrap } from './styled';
import NodeBase from './NodeBase';
import { L12M } from '../../../atoms';
import THEME from '../../../../constants/theme';
import { L12B } from '../../../atoms/Typography/L12B';
import ChevronRight from '../../../../assets/icons/Elements/ChevronRight';
import Play from '../../../../assets/icons/Play';
import { useFlowEditorContext } from '../../context';

const UserDecisionNode = ({ id }) => {
  const { t } = useTranslation();
  const { onUserDecisionConfirm } = useFlowEditorContext();

  return (
    <NodeBase id={id}>
      <StyledGrabbableBox
        onClick={(e) => e.stopPropagation()}
        display="flex"
        flexDirection="column"
        width="216px"
        borderRadius="10px"
        bgcolor="#fff"
        boxShadow="0px 2px 2px rgba(0, 0, 0, 0.04), 0px 10px 14px rgba(0, 0, 0, 0.04)"
        justifyContent="flex-start"
        zIndex="300"
      >
        <StyledBox>
          <L12M color={THEME.greyColors.grey1}>{t('Choose to continue')}</L12M>
        </StyledBox>
        <StyledBox cursor="pointer" onClick={() => onUserDecisionConfirm(true)}>
          <StyledIconWrap>
            <ChevronRight />
          </StyledIconWrap>
          <L12B color="#000">{t('Simulate action')}</L12B>
        </StyledBox>
        <StyledBox cursor="pointer" onClick={() => onUserDecisionConfirm(false)}>
          <StyledIconWrap marginRight="13px">
            <Play stroke="#787F88" />
          </StyledIconWrap>
          <L12B color="#000">{t('Run test against service')}</L12B>
        </StyledBox>
      </StyledGrabbableBox>
    </NodeBase>
  );
};

UserDecisionNode.propTypes = {
  id: string.isRequired,
};

export { UserDecisionNode };
