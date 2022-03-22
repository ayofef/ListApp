import React from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import Add from '@material-ui/icons/AddRounded';
import Title from '../../../Title';
import SearchTermsFieldItem from './SearchTermsFieldItem';
import { useElementDataToSave } from '../hooks/useElementDataToSave';
import { StyledAddNewButton } from '../styled';

const SearchTermsField = () => {
  const { t } = useTranslation();
  const [{ searchTerms }, updateDataToSave] = useElementDataToSave();

  const onAdd = () => {
    updateDataToSave({ searchTerms: [...(searchTerms ?? []), ''] });
  };

  return (
    <Box position="relative" mb="8px">
      <Title>{t('Search Terms')}</Title>
      {searchTerms?.map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <SearchTermsFieldItem key={index} index={index} />
      ))}

      <StyledAddNewButton
        type="button"
        startIcon={<Add />}
        onClick={onAdd}
        disabled={(searchTerms ?? []).some((item) => item === '')}
      >
        {t('Add new')}
      </StyledAddNewButton>
    </Box>
  );
};

export default SearchTermsField;
