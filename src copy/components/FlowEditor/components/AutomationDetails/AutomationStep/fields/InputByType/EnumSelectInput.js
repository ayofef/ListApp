import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import Skeleton from '@material-ui/lab/Skeleton';
import Select, { NONE } from '../../../../../../forms/_common/Select';
import { StyledFormControl } from '../Condition/styled';
import { useNotificationManager } from '../../../../../../../hooks/useNotificationManager';
import { GET_POSSIBLE_ENUM_VALUES_FOR_DATA_TYPE } from '../../../../../../../utils/queries/flows/queries';

const EnumSelectInput = ({ name, value, propertyType, onChange }) => {
  const { loading, error, data } = useQuery(GET_POSSIBLE_ENUM_VALUES_FOR_DATA_TYPE, {
    variables: {
      type: propertyType,
    },
    skip: !propertyType,
  });
  useNotificationManager('error', error?.message, 'Fetch Possible Enum Values');

  const options = useMemo(() => {
    const values = data?.getPossibleEnumValuesForDataType;
    if (!Array.isArray(values)) {
      return [];
    }
    return values.map((item) => ({
      value: item?.key,
      title: item?.label,
    }));
  }, [data?.getPossibleEnumValuesForDataType]);

  return (
    <StyledFormControl fullWidth>
      {loading ? (
        <Skeleton height="30px" />
      ) : (
        <Select value={value || NONE} name={name} options={options} onChange={onChange} />
      )}
    </StyledFormControl>
  );
};

EnumSelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  propertyType: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default EnumSelectInput;
