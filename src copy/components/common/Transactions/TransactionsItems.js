import DescriptionIcon from '@material-ui/icons/Description';
import ReceiptIcon from '@material-ui/icons/Receipt';
import moment from 'moment';
import { shape, string } from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Bell, BookkeepingPlatform } from '../../../assets/icons';
import THEME from '../../../constants/theme';
import { Avatar, Badge, Button, CircleButton, StatusItem, P14, P14B, P14M } from '../../atoms';
import CustomIconButton from '../../atoms/Buttons/CustomIconButton';
import { ReceiptStatusTableItem } from './styled';
import { FlexContainer } from '../../atoms/flex/FlexContainer';

const types = {
  ONE_TIME_PURCHASE: <P14 color={THEME.greyColors.grey1}>One-Time Spend</P14>,
  INVOICE: <P14 color={THEME.greyColors.grey1}>Invoice</P14>,
  SUBSCRIPTION: <P14 color={THEME.greyColors.grey1}>Subsciption</P14>,
  RECURRING_PURCHASE: <P14 color={THEME.greyColors.grey1}>Recurring Purchase</P14>,
};

export const ItemType = ({ type }) => {
  return types[type];
};

export const ItemStatus = StatusItem;
export const ItemDate = ({ date }) => {
  const momentDate = moment(date, 'YYYY-MM-DDThh:mm:ssZ').format('MMM D');
  return <P14 color={THEME.greyColors.grey1}>{momentDate}</P14>;
};
export const ItemAmount = (props) => {
  const {
    amount: { formattedAmount },
  } = props;

  return <P14B whiteSpaceNoWrap>{formattedAmount}</P14B>;
};
export const ItemProduct = (props) => {
  const { merchantAvatar, merchant } = props;
  return (
    <FlexContainer justifyContent="space-between">
      <FlexContainer justifyContent="flex-start">
        <Avatar src={merchantAvatar} name={merchant} size="avatar-table" margin="0 16px 0 0" />
        <P14M>{merchant}</P14M>
      </FlexContainer>
    </FlexContainer>
  );
};
export const ItemRequester = (props) => {
  const { flowInstanceReference = {} } = props;
  const { requester } = flowInstanceReference;

  return (
    <FlexContainer justifyContent="space-around">
      <FlexContainer>
        <Avatar src={requester.avatar} name={requester.name} size={24} margin="0 12px 0 0" />
        <P14>{requester.name}</P14>
      </FlexContainer>
    </FlexContainer>
  );
};
export const ItemMerchant = (props) => {
  const { flowInstanceReference = {} } = props;
  const { merchant } = flowInstanceReference;

  return <P14>{merchant}</P14>;
};
export const ItemProgramme = (props) => {
  const { flowInstanceReference = {} } = props;
  const { flowName } = flowInstanceReference;

  return <P14>{flowName}</P14>;
};

export const ItemButtons = () => {
  return (
    <FlexContainer justifyContent="flex-end" onClick={() => {}}>
      <CustomIconButton fill={THEME.secondaryColors.blue}>
        <DescriptionIcon />
      </CustomIconButton>
    </FlexContainer>
  );
};
export const ItemInvoice = ({ number }) => {
  return <P14M>{number}</P14M>;
};
export const ItemAmount2 = (props) => {
  const {
    amount: { formattedAmount },
  } = props;

  return <P14B whiteSpaceNoWrap>{formattedAmount}</P14B>;
};

export const ItemReceipt = (props) => {
  const { status } = props;
  let iconList = '';
  switch (true) {
    case status === 'AWAITING_RECEIPT':
      iconList = (
        <CircleButton backgroundColor={THEME.secondaryColors.red} color="white" margin="0 5px 0 auto">
          <ReceiptIcon />
        </CircleButton>
      );
      break;
    case status === 'RECONCILED':
      iconList = (
        <CircleButton backgroundColor={THEME.secondaryColors.green} color="white" margin="0 5px 0 auto">
          <ReceiptIcon />
        </CircleButton>
      );
      break;
    case status === 'SYNCED_ACCOUNTING':
      iconList = (
        <CircleButton backgroundColor={THEME.secondaryColors.blue} color="white" margin="0 5px 0 auto">
          <BookkeepingPlatform />
        </CircleButton>
      );
      break;
    default:
      iconList = (
        <CircleButton backgroundColor={THEME.functionalColors.red} color="white" margin="0 5px 0 auto">
          <ReceiptIcon />
        </CircleButton>
      );
      break;
  }

  return iconList;
};

const handleSendReceiptReminder = (e) => {
  e.preventDefault();
};

export const ItemReceiptStatus = (props) => {
  const { status, processingStatus, id } = props;
  const { t } = useTranslation();
  const statuses = {
    APPROVED: (
      <Badge margin="0 8px" color="blue" className="hover-hide">
        Approved
      </Badge>
    ),
    RECONCILED: (
      <Badge margin="0 8px" color="blue" className="hover-hide">
        Reconciled
      </Badge>
    ),
    PAID: (
      <Badge margin="0 8px" color="green" className="hover-hide">
        Paid
      </Badge>
    ),
    COMPLETED: (
      <Badge margin="0 8px" color="green" className="hover-hide">
        Completed
      </Badge>
    ),
    AWAITING_APPROVAL: (
      <Badge margin="0 8px" color="red" className="hover-hide">
        Pending approval
      </Badge>
    ),
    VCN_ISSUED: (
      <Badge margin="0 8px" color="blue" className="hover-hide">
        Approved
      </Badge>
    ),
    AWAITING_RECEIPT: (
      <>
        <Badge margin="0 8px" color="red" className="hover-hide">
          Requires receipt
        </Badge>
        <Button className="hover-show blue" smaller onClick={(e) => handleSendReceiptReminder(e, id)}>
          <Bell />
          <P14 color="white" padding="0 0 0 12px" whiteSpaceNoWrap>
            {t('buttonsText.SendReceiptReminder')}
          </P14>
        </Button>
      </>
    ),
    DECLINED: (
      <Badge margin="0 8px" color="red" className="hover-hide">
        Declined
      </Badge>
    ),
    DENIED: (
      <Badge margin="0 8px" color="red" className="hover-hide">
        Declined
      </Badge>
    ),
    UNMATCHED: (
      <Badge margin="0 8px" color="grey" className="hover-hide">
        Unmatched
      </Badge>
    ),
    REMOVED: (
      <Badge margin="0 8px" color="blue" className="hover-hide">
        Removed
      </Badge>
    ),
    PENDING: (
      <Badge margin="0 8px" color="grey" className="hover-hide">
        Pending
      </Badge>
    ),
    CLEARED: (
      <Badge margin="0 8px" color="grey" className="hover-hide">
        Cleared
      </Badge>
    ),
    SYNCED_ACCOUNTING: (
      <Badge color="grey" className="hover-hide">
        Synced accounting
      </Badge>
    ),
  };

  return (
    <ReceiptStatusTableItem>
      {statuses[processingStatus] && statuses[processingStatus]}
      {processingStatus !== 'PENDING' && statuses[status] && statuses[status]}
    </ReceiptStatusTableItem>
  );
};

ItemDate.propTypes = {
  date: string,
};
ItemDate.defaultProps = {
  date: '',
};

ItemType.propTypes = {
  type: string.isRequired,
};
ItemProduct.propTypes = {
  merchantAvatar: string,
  merchant: string,
};
ItemProduct.defaultProps = {
  merchantAvatar: '',
  merchant: '',
};

ItemMerchant.propTypes = {
  flowInstanceReference: shape({}).isRequired,
};
ItemRequester.propTypes = {
  flowInstanceReference: shape({}).isRequired,
};
ItemDate.propTypes = {
  date: string,
};
ItemDate.defaultProps = {
  date: '',
};
ItemAmount.propTypes = {
  amount: shape({}),
};

ItemInvoice.propTypes = {
  number: string.isRequired,
};
ItemAmount.defaultProps = {
  amount: {},
};

ItemProgramme.propTypes = {
  flowInstanceReference: shape({}).isRequired,
};
ItemButtons.propTypes = {};
ItemAmount2.propTypes = {
  amount: shape({}).isRequired,
};
ItemReceipt.propTypes = {
  details: shape({}),
  status: string,
};
ItemReceipt.defaultProps = {
  details: {},
  status: '',
};
ItemReceiptStatus.propTypes = {
  id: string.isRequired,
  status: string,
  processingStatus: string,
};
ItemReceiptStatus.defaultProps = {
  status: '',
  processingStatus: '',
};
