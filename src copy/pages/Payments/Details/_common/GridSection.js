import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';
import { Tooltip } from '@material-ui/core';
import Info from '@material-ui/icons/InfoOutlined';
import { useParams } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import { StyledButton, StyledDivider } from './styled';
import GridEmptyState from '../sections/GridEmptyState';

const GridSection = ({ header, data }) => {
  const { detailsId, intentId } = useParams();
  const { t } = useTranslation();

  const validData = useMemo(() => data?.value, [data]);
  return (
    <Box mb="64px">
      <Box component="section" mt="54px">
        <Box component="h3">{t(header)}</Box>
        <StyledDivider />
        {validData && !intentId && (
          <Grid container spacing={2} alignItems="flex-start">
            {data.value.map(({ key, value, label, isEditable }) => (
              <Grid key={key} container item xs={6}>
                <Grid item xs={4}>
                  {label && <Box color="#787F88">{label}</Box>}
                </Grid>

                <Grid item xs zeroMinWidth>
                  <Box width="100%" overflow="hidden" display="flex" alignItems="center" textOverflow="ellipsis">
                    {value && value !== 'N/A' ? value : null}

                    {detailsId && (!value || value === 'N/A') && (
                      <Box component="div" display="inline">
                        <span>N/A</span>
                      </Box>
                    )}
                    {!detailsId && (!value || value === 'N/A') && (
                      <Tooltip
                        title="Data will be populated when the payment has been attempted."
                        arrow
                        placement="top"
                      >
                        <Box component="div" display="flex" alignItems="center">
                          <Box component="span" marginTop="-3px">
                            N/A
                          </Box>
                          <Box component="span" color="#4E40EF">
                            <Info fontSize="small" />
                          </Box>
                        </Box>
                      </Tooltip>
                    )}
                  </Box>

                  {isEditable && (
                    <Box mt="16px">
                      <StyledButton type="button" variant="outlined" size="small">
                        {t('edit')}
                      </StyledButton>
                    </Box>
                  )}
                </Grid>
              </Grid>
            ))}
          </Grid>
        )}

        {intentId && <GridEmptyState title={header} />}
        {!validData && !intentId && <Alert severity="error">{header} data are corrupted.</Alert>}
      </Box>
    </Box>
  );
};

GridSection.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.shape({
    value: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['STRING', 'OBJECT', 'DATE', 'AMOUNT']).isRequired,
        label: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({}), PropTypes.arrayOf(PropTypes.shape({}))]),
        isEditable: PropTypes.bool.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default GridSection;
