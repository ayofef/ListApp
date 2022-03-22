import styled from 'styled-components';

export const QRCover = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px;
  border: 1px solid #e6e9ec;
  border-radius: 6px;
  min-height: 100px;

  canvas {
    width: 100px !important;
    height: 100px !important;
  }
`;
