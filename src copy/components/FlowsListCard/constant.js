const INTERVAL_LENGTH = 24;

const generateInterval = (n) =>
  Array.from(Array(n).keys()).map(() => ({
    count: 0,
    interval: {
      end: '',
      start: '',
    },
    total: {
      currency: '',
      formattedAmount: '',
      rawAmount: 0,
    },
  }));

const MOCK_STATS = {
  paymentIntents: generateInterval(INTERVAL_LENGTH),
  successfulPayments: generateInterval(INTERVAL_LENGTH),
  declinedPayments: generateInterval(INTERVAL_LENGTH),
  refundedPayments: generateInterval(INTERVAL_LENGTH),
  failedPayments: generateInterval(INTERVAL_LENGTH),
  issuesPayments: generateInterval(INTERVAL_LENGTH),
};

export { MOCK_STATS };
