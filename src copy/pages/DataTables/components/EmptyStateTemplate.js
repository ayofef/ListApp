import PropTypes from 'prop-types';
import React from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import isEmpty from 'lodash/isEmpty';

import useSearch from '../../../hooks/useSearch';
import ListEmptyStateWithClearSearch from '../../../components/ListEmptyStateWithClearSearch';
import { isDefined } from '../../../utils/helpers';
import { ButtonRounded, P16B } from '../../../components/atoms';

const TITLE = `You currently have no data`;

const SEARCH_TITLE = ' No results found';

const EmptyStateTemplate = ({
  iconComponent,
  handleButtonEvent,
  buttonLabel,
  searchSelectRef,
  iconWrapperProps,
  title,
  description,
  ...rest
}) => {
  const [{ search, filter }, setSearchParams] = useSearch();
  const showClearButton = isDefined(search) || isDefined(filter);
  const { t } = useTranslation();

  const hasButton = !isEmpty(buttonLabel) && isDefined(handleButtonEvent);

  const _title = search || filter ? SEARCH_TITLE : title ?? TITLE;

  return (
    <Box height="calc(100vh - 800px)">
      <ListEmptyStateWithClearSearch
        {...rest}
        position="absolute"
        title={_title}
        clearText="Clear search"
        setSearchParams={setSearchParams}
        searchSelectRef={searchSelectRef}
        showClearButton={showClearButton}
        iconComponent={iconComponent}
        iconWrapperProps={iconWrapperProps}
      >
        {description && <P16B maxWidth="155px">{t(description)}</P16B>}
        {hasButton && (
          <Box mt="16px">
            <ButtonRounded type="button" variant="contained" color="primary" onClick={handleButtonEvent}>
              {t(buttonLabel)}
            </ButtonRounded>
          </Box>
        )}
      </ListEmptyStateWithClearSearch>
    </Box>
  );
};

EmptyStateTemplate.propTypes = {
  searchSelectRef: PropTypes.shape({}),
  iconWrapperProps: PropTypes.shape({}),
  iconComponent: PropTypes.elementType,
  handleButtonEvent: PropTypes.func.isRequired,
  title: PropTypes.string,
  buttonLabel: PropTypes.string.isRequired,
  description: PropTypes.string,
};

EmptyStateTemplate.defaultProps = {
  searchSelectRef: {},
  iconWrapperProps: {},
  iconComponent: undefined,
  title: undefined,
  description: undefined,
};

export default EmptyStateTemplate;
