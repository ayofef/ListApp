import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { StyledMenuItem, StyledSelect } from './styled';
import { LogicalOperator } from '../constants';
import { useElementDataToSave } from '../hooks/useElementDataToSave';

const options = [
  { value: LogicalOperator.AND, title: 'match all' },
  { value: LogicalOperator.OR, title: 'match any' },
];

const Logical = () => {
  const { t } = useTranslation();
  const [{ logicalOperator }, updateDataToSave] = useElementDataToSave();
  const operator = useMemo(() => logicalOperator || LogicalOperator.AND, [logicalOperator]);
  const onChange = ({ target: { value } }) => updateDataToSave({ logicalOperator: value });

  return (
    <StyledSelect value={operator} IconComponent={ExpandMoreIcon} onChange={onChange}>
      {options.map((option) => (
        <StyledMenuItem key={option.value} value={option.value}>
          {t(option.title)}
        </StyledMenuItem>
      ))}
    </StyledSelect>
  );
};

export default Logical;
