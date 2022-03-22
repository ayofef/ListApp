import { NotificationManager } from 'react-notifications';
import axios from 'axios';

const uploadOptions = (file, updateProgress) => {
  return {
    headers: {
      'Content-Type': file.type,
      'Content-Disposition': `attachment; filename="${window.encodeURI(file.name)}"`,
    },
    withCredentials: false,
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      const percent = Math.floor((loaded * 100) / total);
      if (percent < 95) {
        updateProgress(file, percent);
      }
    },
  };
};

const saveAttachment = (
  getUploadUrl,
  files,
  mutatePaymentAttachment,
  detailsId,
  setUploadLoading,
  progress,
  setProgress,
  setFiles,
  setCircularLoader
) => {
  const localObject = {};
  const updateProgress = (file, percent) => {
    localObject[file?.name] = percent;
    setProgress({ ...progress, ...localObject });
  };

  const uploaders = files.map((file) => {
    return axios.put(getUploadUrl?.uploadUrl, file, uploadOptions(file, updateProgress)).then(() => {
      mutatePaymentAttachment({
        fileName: file?.name,
        objectKey: getUploadUrl?.objectKey,
        contentType: file?.type,
        paymentId: detailsId,
      });
      updateProgress(file, 100);
    });
  });

  axios
    .all(uploaders)
    .then(() => {
      setCircularLoader(false);
      //clear state
      setTimeout(() => {
        setUploadLoading(false);
        setFiles([]);
        setProgress({});
      }, 5000);
    })
    .catch((err) => {
      setCircularLoader(false);
      setUploadLoading(false);
      setFiles([]);
      setProgress({});
      NotificationManager.error(err.message, 'Payment Attachment', 5000);
    });
};

export { saveAttachment };
