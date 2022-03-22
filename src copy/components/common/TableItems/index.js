import React from 'react';
import { bool, func, shape, string, arrayOf } from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import DescriptionIcon from '@material-ui/icons/Description';
import HelpIcon from '@material-ui/icons/Help';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ReceiptIcon from '@material-ui/icons/Receipt';
import moment from 'moment';
import Checkbox from '@material-ui/core/Checkbox';
import THEME from '../../../constants/theme';
import {
  Badge,
  BlockWrap,
  Button,
  CircleButton,
  CircleImage,
  CircularLoader,
  MaterialIconStyler,
  P14,
  P14B,
  StatusItem,
} from '../../atoms';
import { AvatarTableItem, ButtonsTableItem, StyledDateCover } from './styled';
import AvatarItem from '../AvatarItem/AvatarItem';
import { FlexContainer } from '../../atoms/flex/FlexContainer';

export const ItemType = ({ classifier, ts }) => {
  const date = moment(ts).format('MMM D, YYYY');
  return (
    <P14 color={THEME.greyColors.grey1}>
      {classifier}
      <StyledDateCover className="visible-sm">{date}</StyledDateCover>
    </P14>
  );
};

export const ItemStatus = ({ status }) => {
  return (
    <FlexContainer justifyContent="flex-end">
      <StatusItem status={status} />
    </FlexContainer>
  );
};

export const ItemDate = ({ ts }) => {
  const date = moment(ts).format('MMM D, YYYY');
  return <P14 color={THEME.greyColors.grey1}>{date}</P14>;
};

export const ItemAmount = (props) => {
  const {
    avatar,
    amount: { formattedAmount },
  } = props;
  return (
    <FlexContainer justifyContent="flex-end">
      {avatar && (
        <BlockWrap margin="0 20px 0 0">
          <CircleImage size="24" src={avatar} />
        </BlockWrap>
      )}
      <P14B whiteSpaceNoWrap>{formattedAmount}</P14B>
    </FlexContainer>
  );
};
export const ItemRend = (props) => {
  const {
    requester,
    purchase,
    amount: { formattedAmount },
  } = props;
  return (
    <AvatarTableItem>
      <AvatarItem
        {...{
          name: purchase,
          src: requester.avatar,
          text2: requester.name,
          ...props,
        }}
        requestInTable
      />
      <P14B whiteSpaceNoWrap className="visible-sm">
        {formattedAmount}
      </P14B>
    </AvatarTableItem>
  );
};

export const ItemButtons = ({
  id,
  status,
  canApprove,
  buttonActions: { approve, approveLoading, deny, denyLoading, setConfirmation, setShowAttention, deleteLoading },
  ...restProps
}) => {
  const showDenyLoader = denyLoading?.id === id && denyLoading.loading;
  const showApproveLoader = approveLoading?.id === id && approveLoading.loading;
  const showDeleteLoader = deleteLoading?.id === id && deleteLoading.loading;
  return (
    <ButtonsTableItem>
      {status === 'AWAITING_APPROVAL' && (
        <>
          <div className="hover-show">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                if (id) {
                  deny(id);
                }
              }}
              ghost
              className="white"
              margin="0 8px 0 0"
              smaller
            >
              <P14>Decline</P14>

              {showDenyLoader && <CircularLoader size={12} />}
            </Button>
            <Button
              className="blue"
              smaller
              onClick={(e) => {
                e.stopPropagation();
                if (id) {
                  approve(id);
                }
              }}
            >
              <P14 color="white">Approve</P14>
              {showApproveLoader && <CircularLoader size={12} bgcolor={THEME.primaryColors.white} />}
            </Button>
          </div>
          <Badge className="hover-hide">Pending approval</Badge>
        </>
      )}
      {status === 'VCN_ISSUED' && (
        <CircleButton
          backgroundColor={THEME.secondaryColors.blue}
          onClick={(e) => {
            e.stopPropagation();
            if (id) {
              setConfirmation(id);
            }
          }}
        >
          {showDeleteLoader ? (
            <CircularLoader size={12} />
          ) : (
            <MaterialIconStyler icon={DeleteIcon} color={THEME.primaryColors.white} />
          )}
        </CircleButton>
      )}
      {status === 'PAID' && (
        <CircleButton backgroundColor={THEME.secondaryColors.red}>
          <NotificationsIcon />
        </CircleButton>
      )}
      {status === 'COMPLETED' && (
        <CircleButton backgroundColor={THEME.primaryColors.main}>
          <MaterialIconStyler icon={DescriptionIcon} color={THEME.primaryColors.white} />
        </CircleButton>
      )}
      {(status === 'UNMATCHED' || status === 'AWAITING_RECEIPT') && (
        <CircleButton
          backgroundColor={THEME.functionalColors.red}
          onClick={(e) => {
            e.stopPropagation();
            setShowAttention({ id, ...restProps });
          }}
        >
          {showDenyLoader ? (
            <CircularLoader size={12} />
          ) : (
            <MaterialIconStyler icon={HelpIcon} color={THEME.primaryColors.white} />
          )}
        </CircleButton>
      )}
    </ButtonsTableItem>
  );
};

export const ItemCheckbox = ({ id, buttonActions: { selectItem, selectedItems } }) => {
  return (
    <FlexContainer margin="0 0 0 -10px" justifyContent="flex-start">
      <Checkbox
        checked={(selectedItems || []).some((item) => item === id)}
        onClick={(e) => {
          e.stopPropagation();
        }}
        onChange={() => {
          if (id) {
            selectItem(id);
          }
        }}
        ghost
        color="primary"
        margin="0 8px 0 0"
      />
    </FlexContainer>
  );
};

export const ItemReceipt = (props) => {
  const { receipts } = props;
  const isReceipt = receipts[0]?.url;
  const color = isReceipt ? THEME.secondaryColors.green : THEME.functionalColors.red;

  return (
    <CircleButton backgroundColor={color} color="white" margin="0 0 0 auto">
      <ReceiptIcon />
    </CircleButton>
  );
};

export const AttentionAvatar = (props) => {
  const { requester, purchase, merchant, merchantAvatar } = props;
  return (
    <AvatarItem
      {...{
        name: purchase,
        src: merchantAvatar,
        text: merchant,
        text2: requester?.name,
        ...props,
      }}
    />
  );
};

export const AttentionDate = ({ date }) => {
  const formatedDate = moment(date).format('MMM D');
  return (
    <P14 whiteSpaceNoWrap color={THEME.greyColors.grey1}>
      {formatedDate}
    </P14>
  );
};

ItemType.propTypes = {
  classifier: string.isRequired,
  ts: string.isRequired,
};

ItemStatus.propTypes = {
  status: string.isRequired,
};

ItemDate.propTypes = {
  ts: string.isRequired,
};

ItemAmount.propTypes = {
  avatar: string,
  amount: shape({
    formattedAmount: string,
  }),
};

ItemAmount.defaultProps = {
  avatar: '',
  amount: {},
};

ItemRend.propTypes = {
  avatar: string,
  amount: shape({
    formattedAmount: string,
  }),
};

ItemRend.defaultProps = {
  avatar: '',
  amount: {},
};

ItemRend.propTypes = {
  purchase: string.isRequired,
  merchantUrl: string,
  reason: string.isRequired,
  merchant: string.isRequired,
  requester: shape({
    name: string,
  }).isRequired,
  buttonActions: shape({
    approve: func,
    deny: func,
  }).isRequired,
};

ItemRend.defaultProps = {
  merchantUrl: '',
};

ItemButtons.propTypes = {
  id: string.isRequired,
  status: string.isRequired,
  buttonActions: shape({
    approve: func,
    deny: func,
  }).isRequired,
  canApprove: bool.isRequired,
};

ItemReceipt.propTypes = {
  receipts: arrayOf(
    shape({
      url: string,
    })
  ),
};

ItemReceipt.defaultProps = {
  receipts: {},
};

AttentionAvatar.propTypes = {
  requester: shape({
    name: string,
  }),
  purchase: string,
  merchant: string,
  merchantAvatar: string,
};

AttentionAvatar.defaultProps = {
  requester: { name: '' },
  purchase: '',
  merchant: '',
  merchantAvatar: '',
};

AttentionDate.propTypes = {
  date: string.isRequired,
};

ItemCheckbox.propTypes = {
  id: string.isRequired,
  buttonActions: shape({
    selectItem: func,
    selectedItems: arrayOf(string),
  }).isRequired,
};
