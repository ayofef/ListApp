import styled from 'styled-components';

const StyledHeaderWrapper = styled.div`
  transform: translateY(4px);
  color: #787f88;
`;

const CustomerLink = styled.div`
  display: flex;
  align-items: center;
`;

const CardNumberHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;

  svg,
  img {
    width: 40px;
    height: auto;
    margin-right: 24px;
  }
`;

export { StyledHeaderWrapper, CardNumberHeader, CustomerLink };
