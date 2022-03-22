import React from 'react';
import { useTranslation } from 'react-i18next';
import capitalize from '@material-ui/core/utils/capitalize';
import isEmpty from 'lodash/isEmpty';

import THEME from '../../../../../constants/theme';
import { P } from '../../../../atoms';

const SelectPlaceholder = () => {
  const { t } = useTranslation();
  return <P color={THEME.greyColors.grey17}>{t('All categories')}</P>;
};

const renderSelectValue = (values, max = 1) => {
  if (!Array.isArray(values)) return values;
  if (Array.isArray(values) && values.some((value) => typeof value !== 'string')) return values;
  if (isEmpty(values)) {
    return <SelectPlaceholder />;
  }
  return (
    values
      ?.slice(0, max || values.length)
      ?.map((value) => capitalize(value?.toLowerCase()?.replace(/_/g, ' ') || ''))
      ?.join(', ') + (values?.length > (max || values.length) ? `...` : '')
  );
};

const generateOptions = (recipes) => {
  if (!Array.isArray(recipes)) return [];

  const uniqueTemplatesCategories = [
    ...new Set(
      recipes
        .map((template) => template?.categories)
        .flat()
        .filter(Boolean)
    ),
  ];

  return uniqueTemplatesCategories.map((value) => ({
    value: value
      .split(' ')
      .join('_')
      .toUpperCase(),
    text: { text: capitalize(value?.toLowerCase?.() || '') },
  }));
};

export { renderSelectValue, generateOptions };
