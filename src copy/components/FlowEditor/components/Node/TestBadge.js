import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { StyledBadge, StyledCheckIcon, StyledCloseIcon, StyledMoreHorizIcon } from './styled';
import THEME from '../../../../constants/theme';
import { TEST_NODE_TYPES, useFlowTestStep } from './hooks/useFlowTestStep';
import { useFlowEditorContext } from '../../context';

const testBadgeTypes = {
  inProgress: {
    icon: <StyledMoreHorizIcon />,
    color: THEME.primaryColors.primary,
  },
  completed: {
    icon: <StyledCheckIcon />,
    color: THEME.statusColors.succeeded,
  },
  error: {
    icon: <StyledCloseIcon />,
    color: THEME.statusColors.failed,
  },
};

const TestBadge = ({ stepId }) => {
  const { examplesRequired, setIsOpenTestExamplesModal } = useFlowEditorContext();
  const { testNodeType } = useFlowTestStep({ stepId });

  const isOpenModal = useMemo(() => testNodeType === TEST_NODE_TYPES.inProgress && examplesRequired, [
    testNodeType,
    examplesRequired,
  ]);

  const onClickHandler = () => {
    if (isOpenModal) {
      setIsOpenTestExamplesModal(true);
    }
  };

  return (
    testNodeType && (
      <StyledBadge
        bgColor={testBadgeTypes[testNodeType]?.color}
        cursor={isOpenModal && 'pointer'}
        onClick={onClickHandler}
      >
        {testBadgeTypes[testNodeType]?.icon}
      </StyledBadge>
    )
  );
};

TestBadge.propTypes = {
  stepId: PropTypes.string.isRequired,
};

export { TestBadge };
