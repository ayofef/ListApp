import { gql } from '@apollo/client';

const CREATE_CUSTOMERS = gql`
  mutation createCustomerInternal($data: CustomerInput!) {
    createCustomerInternal(data: $data)
  }
`;
const DELETE_CUSTOMERS = gql`
  mutation deleteCustomer($id: String!) {
    deleteCustomer(vaultCustomerId: $id)
  }
`;
const UPDATE_CUSTOMER = gql`
  mutation updateCustomerInternal($id: ID!, $customer: VaultCustomerInput!) {
    updateCustomerInternal(id: $id, customer: $customer)
  }
`;

const GET_CUSTOMERS = gql`
  query listCustomers($first: Int, $last: Int, $after: String, $before: String) {
    listCustomers(first: $first, last: $last, after: $after, before: $before) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
        totalSize
      }
      edges {
        node {
          id
          systemCreated
          systemUpdated
          billingAddress {
            line1
            line2
            city
            postalCode
            state
            country
          }
          description
          email
          name
          phone
          defaultPaymentMethod
          shippingAddress {
            address {
              line1
              line2
              city
              postalCode
              state
              country
            }
            name
            phone
          }
        }
      }
    }
  }
`;

const GET_CUSTOMER = gql`
  query getCustomer($id: String!) {
    getCustomer(vaultCustomerId: $id) {
      id
      billingAddress {
        line1
        line2
        city
        postalCode
        state
        country
      }
      description
      email
      name
      phone
      defaultPaymentMethod
      shippingAddress {
        address {
          line1
          line2
          city
          postalCode
          state
          country
        }
        name
        phone
      }
    }
  }
`;

const GET_LINKED_CARDS = gql`
  query listCustomerCardsInternal($id: String!) {
    listCustomerCardsInternal(vaultCustomerId: $id) {
      token
      number
      expMonth
      expYear
      name
      type
      product
      bankName
      metadata
      externalId
      fingerprint
      isDefault
      country
      brand
    }
  }
`;

export { GET_CUSTOMERS, GET_CUSTOMER, CREATE_CUSTOMERS, DELETE_CUSTOMERS, UPDATE_CUSTOMER, GET_LINKED_CARDS };
