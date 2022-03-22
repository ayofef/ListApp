import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
// import isEmpty from 'lodash/isEmpty';
import reduceValue from '../_utils/reduceValue';
// import { Button, P } from '../../../../components/atoms';
import GridEmptyState from './GridEmptyState';

const TITLE = 'Issues';
const Issues = ({ data, intentId }) => {
  const { t } = useTranslation();
  const { issues } = useMemo(() => reduceValue(data?.value || []), [data]);

  const validData = useMemo(() => issues && issues !== '{}', [issues]);

  return (
    <Box component="section" mt="54px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box component="h3" m="0">
          {t(TITLE)}
        </Box>

        {/* seems to be base for some future functionality */}
        {/* {!isEmpty(data) && (
          <Button small transparent minHeight="auto" onClick={() => null} fontSize="14px">
            <P color="#4E40EF">Edit</P>
          </Button>
        )} */}
      </Box>

      {validData && (
        <Box fontWeight={400} fontSize="14px">
          {issues}
        </Box>
      )}

      {!validData && intentId && (
        <Box marginTop="24px">
          <GridEmptyState title={TITLE} />
        </Box>
      )}

      {!validData && !intentId && (
        <Box display="flex" marginTop="24px" justifyContent="center">
          <Box color="#787F88">{t('No issues')}</Box>
        </Box>
      )}
    </Box>
  );
};

Issues.propTypes = {
  data: PropTypes.shape({
    value: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
  intentId: PropTypes.string.isRequired,
};

export default Issues;
