import styled from 'styled-components';

export const StepsWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
`;

export const StepCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: inline-flex;
  justify-content: space-around;
  align-items: center;
  font-size: 14px;
  line-height: 24px;
  font-weight: 500;
  margin-right: 16px;
  background-color: transparent;
  border: ${({ isActive }) => {
    return isActive ? '1px solid white' : '1px solid #8C909D';
  }};
  color: ${({ isActive }) => {
    return isActive ? 'white' : '#8C909D';
  }};
`;

export const StepWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 24px;
  color: ${({ isActive }) => {
    return isActive ? 'white' : '#8C909D';
  }};
  & > p {
    white-space: nowrap;
  }
`;
