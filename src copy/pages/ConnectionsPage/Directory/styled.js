import styled from 'styled-components';

export const ConnectionTile = styled.div`
  margin: 0 64px 54px 0;
  box-sizing: border-box;
  width: 300px;
  max-width: 263px;
  border-radius: 6px;
  padding-left: 13px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  cursor: pointer;
`;

export const ConnectionTileLogo = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  width: ${({ width }) => width || '86px'};
  height: ${({ height }) => height || '86px'};
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    object-fit: cover;
    ${({ isSquare }) => isSquare && 'transform: scale(1.5);'}
  }
`;
