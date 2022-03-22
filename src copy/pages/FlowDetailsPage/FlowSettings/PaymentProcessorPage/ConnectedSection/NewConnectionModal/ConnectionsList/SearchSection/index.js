import React from 'react';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { P16 } from '../../../../../../../../components/atoms';
import AvailableItem from '../AvailableSection/AvailableItem';
import useSearch from '../../../../../../../../hooks/useSearch';
import { StyledWrapper } from './styled';

const SearchSection = ({ availableConnections }) => {
  const { t } = useTranslation();
  const [searchParams] = useSearch();

  return (
    <Box>
      <P16 fontWeight="500">
        {t('Search result for')}: {searchParams?.search && <>&quot;{searchParams?.search ?? ''}&quot;</>}
      </P16>
      <StyledWrapper>
        {availableConnections?.map((connection) => {
          return <AvailableItem key={connection?.id} connection={connection} />;
        })}
      </StyledWrapper>
    </Box>
  );
};

SearchSection.propTypes = {
  availableConnections: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      company: PropTypes.shape({
        name: PropTypes.string,
        logo: PropTypes.string,
      }),
    })
  ).isRequired,
};

export default SearchSection;
