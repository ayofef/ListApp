import { gql } from '@apollo/client';

export const SAVE_BRAND = gql`
  mutation saveBrand(
    $accentColor: String
    $logo: LogoInput
    $favicon: FaviconInput
    $actionButton: ActionButton
    $socialNetworks: [LinkInput]
    $footerText: String
    $signOffContent: String
    $logoConfig: LogoConfigInput
  ) {
    saveBrand(
      accentColor: $accentColor
      logo: $logo
      favicon: $favicon
      actionButton: $actionButton
      socialNetworks: $socialNetworks
      logoConfig: $logoConfig
      footerText: $footerText
      signOffContent: $signOffContent
    ) {
      id
      accentColor
      logoUrl
      faviconUrl
      logoContentType
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
`;
