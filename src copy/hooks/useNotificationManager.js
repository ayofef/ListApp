import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NotificationManager } from 'react-notifications';

export function checkIfMessageExist() {
  return NotificationManager.listNotify.length !== 0;
  //TODO: decide if needed to have few stacked errors.
  // current library has a bug if shows more then one toast at time
  // delete this code if only 1 error at time needed

  // return (
  // NotificationManager.listNotify.filter((i) => {
  //   console.log(i.message, String(message));
  //   if (message) {
  //     return i.message === String(message);
  //   }
  //   return i.title === title;
  // }).length !== 0
  // );
}

/**
 * @description https://www.npmjs.com/package/react-notifications
 * @param {'info'|'success'|'warning'|'error'} type
 * @param {string} message
 * @param {string} title
 * @param {number?} timeOut
 * @param {function?} callback
 * @param {boolean?} priority
 * */
export const useNotificationManager = (type, message, title, timeOut, callback, priority) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (!message) {
      return;
    }
    if (checkIfMessageExist()) {
      return;
    }
    NotificationManager[type](t(message), t(title), timeOut, callback, priority);
  }, [type, message, title, timeOut, callback, priority, t]);
};

/**
 * @param {string} maxFileSize
 * @param {string} title
 * @param errors
 * */

export const useFileUploadNotification = (maxFileSize, title, errors) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (!errors) {
      return;
    }
    const fileTooLarge = errors[0]?.errors[0]?.code === 'file-too-large';
    if (errors?.length && fileTooLarge) {
      NotificationManager.error(t(`File is larger than ${maxFileSize}`), title, 5000);
    } else if (errors?.length && !fileTooLarge) {
      NotificationManager.error(errors[0]?.errors[0]?.message, title, 5000);
    }
  }, [maxFileSize, title, errors, t]);
};
