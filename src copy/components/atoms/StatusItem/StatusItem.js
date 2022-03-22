import React from 'react';
import { string, bool } from 'prop-types';
import styled from 'styled-components';
import THEME from '../../../constants/theme';
import Badge from '../Badge/Badge';
import { L12 } from '../Typography/L12';

const WrapStatus = styled(L12)`
  text-transform: capitalize;
  color: #000;
  border-radius: 8px;
  display: inline-block;
  padding: 7px 11px;
  font-size: 14px;
  line-height: 24px;
  min-height: auto;
  font-weight: 400;
  border: 1px solid ${THEME.greyColors.grey4};
  &.reconciled {
    color: ${THEME.secondaryColors.blue};
  }
  &.paid {
    color: ${THEME.secondaryColors.purple};
  }
  &.approved {
    color: ${THEME.secondaryColors.approved};
  }
  &.declined {
    color: ${THEME.secondaryColors.danger};
  }
`;
const RenderItem = ({ text, ...restProps }) => {
  return <WrapStatus {...restProps}>{text}</WrapStatus>;
};

export const ItemStatus = ({ status, showText }) => {
  const statuses = {
    APPROVED: <Badge color="blue">Approved</Badge>,
    RECONCILED: <Badge color="blue">Reconciled</Badge>,
    PAID: <Badge color="green">Paid</Badge>,
    COMPLETED: <RenderItem text="Completed" className="status-item paid" />,
    AWAITING_APPROVAL: showText && <Badge color="red">Pending approval</Badge>,
    VCN_ISSUED: <Badge color="blue">Approved</Badge>,
    AWAITING_RECEIPT: showText && <Badge color="red">Missing receipt</Badge>,
    DECLINED: showText && <Badge color="red">Declined</Badge>,
    DENIED: <Badge color="red">Declined</Badge>,
    UNMATCHED: showText && <Badge color="grey">Unmatched</Badge>,
    REMOVED: <Badge color="blue">Removed</Badge>,
    PENDING: <Badge color="grey">Pending</Badge>,
    CLEARED: <Badge color="grey">Cleared</Badge>,
    SYNCED_ACCOUNTING: <Badge color="grey">Cynced accounting</Badge>,
  };
  return statuses[status] ? statuses[status] : null;
};
RenderItem.propTypes = {
  text: string.isRequired,
};
ItemStatus.propTypes = {
  text: string,
  showText: bool,
};
ItemStatus.defaultProps = {
  text: '',
  showText: false,
};

export default ItemStatus;
