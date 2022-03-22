import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useMeasure } from 'react-use';

const StyledMaskedCard = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  align-self: flex-end;
`;
const StyledLastFour = styled.span`
  font-size: ${({ fontSize }) => `${fontSize}px` ?? 'inherit'};
`;

const StyledMask = styled.span`
  font-size: ${({ fontSize }) => `${fontSize}px` ?? 'inherit'};
  margin-right: 6px;
  height: ${({ height }) => `${height}px`};
  align-self: center;
  transform: ${({ transform }) => transform ?? 'translateY(-14px)'};
`;

const maskArray = Array.from(Array(3).keys());

const maskCardNumberObj = (cardNumber) => {
  if (cardNumber && typeof cardNumber === 'string') {
    const { length } = cardNumber;
    const lastFourDigit = cardNumber.substring(length - 4, length);
    return { lastFourDigit };
  }

  return { cardNumber };
};

const MaskedCard = ({ cardNumber, fontSize, transform }) => {
  const { lastFourDigit, cardNumber: defaultValue } = useMemo(() => maskCardNumberObj(cardNumber), [cardNumber]);
  const [ref, { height }] = useMeasure();

  return (
    <StyledMaskedCard>
      {cardNumber && defaultValue ? (
        <StyledLastFour fontSize={fontSize}>{defaultValue} </StyledLastFour>
      ) : (
        <>
          {maskArray.map((key) => (
            <StyledMask height={height} key={key} fontSize={fontSize + 18} transform={transform}>
              ····
            </StyledMask>
          ))}
          <StyledLastFour ref={ref} fontSize={fontSize}>
            {lastFourDigit}{' '}
          </StyledLastFour>
        </>
      )}
    </StyledMaskedCard>
  );
};

MaskedCard.propTypes = {
  cardNumber: PropTypes.string.isRequired,
  fontSize: PropTypes.number.isRequired,
  transform: PropTypes.string,
};
MaskedCard.defaultProps = {
  transform: undefined,
};
export default MaskedCard;
