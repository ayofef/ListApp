import { gql } from '@apollo/client';

export const GET_AUTOMATION_TEMPLATES = gql`
  query getAvailableFlowTemplates {
    getAvailableFlowTemplates {
      showOnWebApp
      blogReady
      videoOnWebApp
      imageWebApp
      name
      description
      integrations
      recommended
      categories
      plan
      slug
      difficultyLevel
      difficultyDescription
      template {
        id
      }
    }
  }
`;
