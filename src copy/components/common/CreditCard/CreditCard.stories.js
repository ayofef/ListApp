import React from 'react';
import CreditCardComponent from './CreditCard';

export const CreditCard = (args) => <CreditCardComponent {...args} />;

CreditCard.args = {
  cardInfo: {
    expMonth: 'Sep',
    expYear: '2021',
    maskedNumber: '4242424242424242',
    nickname: 'Test Name',
    cardholderName: 'Cardholer Test',
    cardType: 'VISA',
  },
  secureCard: {},
};

export default {
  title: 'Common Components/CreditCard',
  component: CreditCardComponent,
  argTypes: {
    color: {
      control: {
        type: 'select',
        options: ['default', 'red', 'blue', 'green'],
      },
    },
  },
};
