import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import capitalize from '@material-ui/core/utils/capitalize';
import { useTranslation } from 'react-i18next';
import { exampleDataValues, getDataObject, LABEL_DICTIONARY } from './exampleDataTypes';
import Status from './Components/Status';
import PaymentMethod from './Components/PaymentMethod';
import DefaultText from './Components/DefaultText';
import { P14 } from '../../atoms';
import { StyledSummaryItem } from './styled';
import DateComponent from './Components/DateComponent';

const COMPONENTS_MAP = {
  [LABEL_DICTIONARY.paymentMethod]: PaymentMethod,
  status: Status,
  date: DateComponent,
};

const TestSummary = ({ data, exampleDataType }) => {
  const { t } = useTranslation();
  if (!exampleDataValues[exampleDataType]) {
    return null;
  }
  return (
    <Box component="section" mt="2px" fontSize="14px" width="450px" mb="24px">
      {exampleDataValues[exampleDataType].map((el) => {
        const dataObject = getDataObject(data, el);
        const Component = COMPONENTS_MAP[dataObject?.label] ?? DefaultText;
        if (!dataObject?.value || dataObject?.value === 'N/A') {
          return null;
        }
        return (
          <StyledSummaryItem key={dataObject?.label}>
            <P14 color=" #787F88" width="170px">
              {capitalize(t(dataObject?.label))}
            </P14>
            <Component value={dataObject?.value} />
          </StyledSummaryItem>
        );
      })}
    </Box>
  );
};

TestSummary.propTypes = {
  exampleDataType: PropTypes.string.isRequired,
  data: PropTypes.shape({}).isRequired,
};

export default TestSummary;
