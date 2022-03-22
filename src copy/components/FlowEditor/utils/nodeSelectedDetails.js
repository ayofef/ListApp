import React from 'react';
import capitalize from 'lodash/capitalize';

export const parseSmartIdToLabel = (smartId) => {
  const [, dashedStr] = smartId.split(':');
  return capitalize(dashedStr?.replaceAll('-', ' '));
};

export const capitalizeFn = (str) => {
  if (typeof str === 'string') {
    if (str?.includes('API')) {
      return capitalize(str.toLowerCase()).replace(/api/g, 'API');
    }
    return capitalize(str.toLowerCase());
  }
  return str;
};

export const sanitizeSubLabelFn = (str) => {
  if (typeof str === 'string') {
    if (str === 'api') {
      return str.toUpperCase();
    }
    if (/(http(s?)):\/\//i.test(str)) {
      const [method, url] = str.split(' ');
      const { hostname } = new URL(url);
      return (
        <>
          {method} <br /> {hostname}
        </>
      );
    }
    return capitalize(str.toLowerCase());
  }
  return str;
};
