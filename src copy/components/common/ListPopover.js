import React from 'react';
import { bool, func, number, arrayOf, shape } from 'prop-types';
import styled from 'styled-components';
import EmailIcon from '@material-ui/icons/Email';
import THEME from '../../constants/theme';
import CircleWrapper from '../atoms/CircleWrapper/CircleWrapper';
import { MaterialIconStyler, P14 } from '../atoms';
import { FlexContainer } from '../atoms/flex/FlexContainer';

const ListPopoverWrapper = styled.div`
  position: relative;
  display: ${({ open }) => (open ? 'block' : 'none')};
  > * {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    max-height: ${({ minHeight }) => (minHeight ? `${minHeight}px` : '200px')};
    min-height: ${({ minHeight }) => (minHeight ? `${minHeight}px` : '120px')};
    background: ${THEME.primaryColors.white};
    border: 1px solid ${THEME.greyColors.grey4};
    box-sizing: border-box;
    box-shadow: 0 4px 4px rgba(132, 132, 132, 0.03);
    border-radius: 4px;
    z-index: 1;
    overflow: scroll;
  }
  ${({ onlySearch }) => onlySearch && '> * {border: none;box-shadow: none;margin: 10px 0 -5px;padding: 0;}'}
  .avatar {
    overflow: hidden;
    img {
      max-width: 100%;
    }
  }
  .overflow {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }
`;

const ListPopoverItem = styled.div`
  position: relative;
  width: 100%;
  padding: 8px 24px;
  display: flex;
  cursor: pointer;
  z-index: 1;
  &:hover {
    background-color: ${THEME.greyColors.grey4};
  }
`;

const ListPopover = ({ values, open, onlySearch, onClose, handleSelect, minHeight }) => {
  const clickHandler = (item) => {
    handleSelect(item);
    onClose();
  };

  const itemImage = (item) => (item.avatar ? <img src={item.avatar} alt="" /> : item.name.charAt(0).toUpperCase());

  const itemAvatar = (item) =>
    item.status === 'INVITED' ? (
      <MaterialIconStyler icon={EmailIcon} color={THEME.primaryColors.white} width="16px" />
    ) : (
      itemImage(item)
    );

  return (
    <ListPopoverWrapper onlySearch={onlySearch} open={open} minHeight={minHeight}>
      <FlexContainer flexDirection="column" alignItems="flex-start">
        <span className="overflow" onClick={onClose} />
        {values.length > 0 ? (
          values.map((item) => (
            <ListPopoverItem onClick={() => clickHandler(item)} key={`ListPopover-${item?.name}`}>
              {(item.avatar || item.name) && (
                <CircleWrapper
                  size={24}
                  background={THEME.secondaryColors.blue}
                  className="avatar"
                  margin="0 16px 0 0"
                  color="#fff"
                >
                  {itemAvatar(item)}
                </CircleWrapper>
              )}

              <P14 textTransform="capitalize">
                {item.name || item.email || (!item.name && !item.email && item.country)}
              </P14>
            </ListPopoverItem>
          ))
        ) : (
          <ListPopoverItem>
            <P14>No one found matching</P14>
          </ListPopoverItem>
        )}
      </FlexContainer>
    </ListPopoverWrapper>
  );
};

ListPopover.propTypes = {
  values: arrayOf(shape({})),
  open: bool.isRequired,
  onlySearch: bool,
  onClose: func.isRequired,
  handleSelect: func.isRequired,
  minHeight: number,
};

ListPopover.defaultProps = {
  values: [],
  onlySearch: false,
  minHeight: 0,
};

export default ListPopover;
