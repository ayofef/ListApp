import { InMemoryCache } from '@apollo/client';
import possibleTypes from '../generated/possibleTypes.json';

const cache = new InMemoryCache({
  possibleTypes,
  typePolicies: {
    CheckoutCustomer: {
      keyFields: ['id', 'name', 'email'],
    },
    Query: {
      fields: {
        listPaymentFilterValues: {
          merge: (existing = {}, incoming) => ({ ...existing, ...incoming }),
        },
        listRecommendations: {
          merge: false,
        },
        /* TODO: resolve this */
        /*we: {
          merge: (existing = {}, incoming, fieldFunctionOption) => {
            console.groupCollapsed('we merge');
            console.log('existing', existing);
            console.log('incoming', incoming);
            console.log('fieldFunctionOption', fieldFunctionOption);
            console.groupEnd();
            return { ...existing, ...incoming };
          },
        },*/
      },
    },
  },
});

export default cache;
