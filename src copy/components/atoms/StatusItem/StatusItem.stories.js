import React from 'react';
import StatusItemComponent from './StatusItem';

export const StatusItem = (args) => <StatusItemComponent {...args} />;

StatusItem.args = {
  status: 'APPROVED',
};

export default {
  title: 'Atoms/StatusItem',
  component: StatusItemComponent,
  argTypes: {
    status: {
      control: {
        type: 'select',
        options: [
          'APPROVED',
          'RECONCILED',
          'PAID',
          'COMPLETED',
          'AWAITING_APPROVAL',
          'VCN_ISSUED',
          'AWAITING_RECEIPT',
          'DECLINED',
          'DENIED',
          'UNMATCHED',
          'REMOVED',
          'PENDING',
          'CLEARED',
          'SYNCED_ACCOUNTING',
        ],
      },
    },
  },
};
