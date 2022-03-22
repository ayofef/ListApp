import styled from 'styled-components';

const SectionLeft = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  align-self: flex-start;
  flex: 1;
  margin-right: 32px;
  min-width: 275px;
`;

const SectionRight = styled.div`
  flex: 1;
  margin-left: auto;
`;

const ButtonsContainer = styled.div`
  display: flex;
  margin-top: 16px;
  flex-direction: column;

  @media (min-width: 1210px) {
    flex-direction: row;
  }
`;

const ConfigButton = styled.div`
  margin-bottom: 8px;

  @media (min-width: 1210px) {
    margin-bottom: 0;
    margin-right: 10px;
  }
`;

export { SectionLeft, SectionRight, ButtonsContainer, ConfigButton };
