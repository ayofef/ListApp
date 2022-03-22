import { gql } from '@apollo/client';

export const GET_UPLOAD_URL = gql`
  query getUploadUrl($urlType: UrlType!, $fileName: String) {
    getUploadUrl(urlType: $urlType, fileName: $fileName) {
      objectKey
      uploadUrl
      accessUrl
    }
  }
`;
