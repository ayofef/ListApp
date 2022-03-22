import styled from 'styled-components';

const VerticalHandler = styled('div')`
  position: absolute;
  width: 3px;
  height: 26px;
  top: 50%;
  right: -1px;
  transform: translate(100%, -50%);
  border-radius: 1.5px;
  background-color: #787f88;
`;

export default VerticalHandler;
