import styled from 'styled-components';
import THEME from '../../../../constants/theme';

const AvatarContainer = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: ${THEME.greyColors.grey5};
`;

const PencilIconContainer = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  background-color: ${THEME.primaryColors.blue};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CircularSkeleton = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
`;

export { AvatarContainer, PencilIconContainer, CircularSkeleton };
