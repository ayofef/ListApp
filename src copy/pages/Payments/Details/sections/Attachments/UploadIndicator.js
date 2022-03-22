import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uniqueId } from 'uuid';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import CheckIcon from '@material-ui/icons/Check';
import { StyledUploadIndicator, StyledProgress, StyledSpinner } from './styled';
import { P14B, P14 } from '../../../../../components/atoms';
import FORMAT_ICON from '../../../../../assets/file_formats';
import SPIN_IMG from '../../../../../assets/img/Spinner.png';
import { FlexContainer } from '../../../../../components/atoms/flex/FlexContainer';

const UploadIndicator = ({ uploadLoading, files, progress, circularLoader }) => {
  const { t } = useTranslation();

  return (
    <StyledUploadIndicator isLoading={uploadLoading}>
      <Box display="flex" justifyContent="space-between" borderBottom="1px solid #E6E9EC" pb="6px" mb="12px">
        <P14B>{t('Uploading')}</P14B>{' '}
        <StyledSpinner isLoading={circularLoader}>
          {circularLoader ? <img src={SPIN_IMG} alt="loading spinner" /> : <CheckIcon fontSize="inherit" />}
        </StyledSpinner>
      </Box>
      {files &&
        files?.map((el) => (
          <FlexContainer key={uniqueId()} justifyContent="flex-start" alignItems="center" width="300px">
            <Box mr="14px" pt="5px">
              <Box component="img" src={FORMAT_ICON[el.name.split('.')[1]]?.default} alt={el.name} width="22px" />
            </Box>
            <Box flex="2">
              <P14>{el.name}</P14>
              <Box>
                <StyledProgress value={progress[el.name] ?? 0} variant="determinate" />
              </Box>
            </Box>
          </FlexContainer>
        ))}
    </StyledUploadIndicator>
  );
};

UploadIndicator.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    })
  ).isRequired,
  progress: PropTypes.shape({
    name: PropTypes.number,
  }).isRequired,
  uploadLoading: PropTypes.bool.isRequired,
  circularLoader: PropTypes.bool.isRequired,
};

export default UploadIndicator;
