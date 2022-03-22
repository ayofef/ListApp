import { NotificationManager } from 'react-notifications';
import axios from 'axios';
import omit from 'lodash/omit';

const uploadOptions = (file) => {
  return {
    headers: {
      'Content-Type': file.type,
      'Content-Disposition': `attachment; filename="${window.encodeURI(file.name)}"`,
    },
    withCredentials: false,
  };
};

const OMIT = [
  'faviconContentType',
  'faviconObjectKey',
  'faviconUrl',
  'logoContentType',
  'logoObjectKey',
  'logoUrl',
  '__typename',
  'id',
  'templateConfig',
];

const saveGraphics = ({ uploadUrl, objectKey, file, type }, { data, mutateData, socialNetworks }, others) => {
  axios
    .put(uploadUrl, file, uploadOptions(file))
    .then(() => {
      mutateData({
        ...omit(data?.we?.brand, OMIT),
        socialNetworks,
        ...others,
        ...(type === 'logo'
          ? {
              logo: {
                name: 'logo',
                contentType: file.type,
                objectKey,
              },
              favicon: {
                name: 'favicon',
                contentType: data?.we?.brand?.faviconContentType,
                objectKey: data?.we?.brand?.faviconObjectKey,
              },
            }
          : {
              logo: {
                name: 'logo',
                contentType: data?.we?.brand?.logoContentType,
                objectKey: data?.we?.brand?.logoObjectKey,
              },
              favicon: { name: 'favicon', contentType: file.type, objectKey },
            }),
      });
    })
    .catch((err) => {
      NotificationManager.error(err.message, 'Graphics', 5000);
    });
};

export { saveGraphics };
