import { gql } from '@apollo/client';

export const GRAPH_CMS_AUTOMATION_TEMPLATE = gql`
  query automationTemplate($template: String!) {
    automationTemplate(where: { template_id: $template }) {
      id
      name
      description
      difficultyLevel
      integrations
    }
  }
`;

export const GQL_Q_AUTOMATION_DIRECTORY_CONTENTS = gql`
  query automationDirectoryContents {
    automationDirectoryContents {
      blog {
        tags
        title
        blogSlug
        image {
          url
        }
      }
    }
  }
`;

export const GRAPH_CMS_AUTOMATION_TEMPLATES = gql`
  query automationTemplates {
    automationTemplates {
      id
      template_id
      showOnWebApp
      blogReady
      videoOnWebApp {
        id
        fileName
        url
      }
      imageWebApp {
        url
      }
      name
      description
      integrations
      recommended
      category
      plan
      slug
      difficultyLevel
      difficultyDescription
    }
  }
`;
