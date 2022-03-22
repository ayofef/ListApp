import { gql } from '@apollo/client';

export const GET_BRAND = gql`
  {
    we {
      id
      name
      brand {
        id
        accentColor
        logoUrl
        logoContentType
        faviconUrl
        faviconContentType
        logoObjectKey
        faviconObjectKey
        actionButton
        socialNetworks {
          id
          iconUrl
          linkUrl
        }
        templateConfig {
          signOffContent
          footerText
          logoType
          logoPosition
          logoSize
          logoText
        }
      }
    }
  }
`;
