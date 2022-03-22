import { gql } from '@apollo/client';

export const GET_TEAM = gql`
  {
    team {
      id
      name
      membersCount
    }
  }
`;
