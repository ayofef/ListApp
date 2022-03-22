import styled from 'styled-components';
import THEME from '../../../constants/theme';

const Tag = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${({ backgroundColor }) => backgroundColor || THEME.greyColors.grey4};
  border-radius: 4px;
  padding: ${({ padding }) => padding || '5px 7px'};
  ${({ textAlign }) => (textAlign && `text-align: ${textAlign};`) || ''};
  font-weight: ${({ fontWeight }) => fontWeight || '500'};
  font-size: ${({ fontSize }) => fontSize || '12px'};
  line-height: 1;
  color: ${({ color }) => color || THEME.primaryColors.black};
  transition: all 0.3s ease-out;
  margin-top: ${({ marginTop }) => marginTop || '-5px'};
  ${({ width }) => width && `width: ${width};`};
  border-width: 1px;
  border-style: solid;
  border-color: ${({ borderColor, backgroundColor }) => borderColor || backgroundColor};

  &.Approved {
    color: ${THEME.secondaryColors.blue};
    background: rgba(5, 20, 156, 0.1);
  }
  &.info {
    padding: 8px;
    position: relative;
    &:before {
      content: '';
      position: absolute;
    }
    &-top {
      &:before {
        top: -6px;
        left: 16px;
        border-bottom: 10px solid ${({ backgroundColor }) => backgroundColor || THEME.greyColors.grey4};
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
      }
    }
  }
`;

export default Tag;
