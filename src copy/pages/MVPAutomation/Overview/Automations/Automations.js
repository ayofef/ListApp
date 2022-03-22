import React from 'react';
import Box from '@material-ui/core/Box';
import isEmpty from 'lodash/isEmpty';
import { useHistory } from 'react-router-dom';
import { L16B } from '../../../../components/atoms/Typography/L16B';
import { UI_ROUTES } from '../../../../constants/routes';
import { usePaymentFlowContext } from '../../../FlowDetailsPage/paymentFlowContext';
import AutomationsEmptyState from '../AutomationsEmptyState';
import { getRows } from './tableData';
import LoadingState from './LoadingState';
import { StyledWrapper } from './styled';
import AutomationRow from './AutomationRow';
import { getComparator, stableSort } from '../../../../utils/helpers';
import useSearchSort from '../../../../hooks/useSearchSort';
import { getOrderDataFromSearchParamsSort } from '../../../../components/SortTable/helpers';
import DropDownMenu from '../../../../components/menus/DropDownMenu';
import { P14M } from '../../../../components/atoms';
import THEME from '../../../../constants/theme';
import Switch from '../../../../assets/icons/Switch';

const templateId = 'template.freeform-automation';

const options = [
  { label: 'alphabetical', value: 'name', selectedLabel: 'name' },
  { label: 'newest', value: 'systemCreated', selectedLabel: 'date created', reverse: true },
  { label: 'Last updated', value: 'systemUpdated', selectedLabel: 'date updated' },
  { label: 'Running', value: 'running', selectedLabel: 'status', reverse: true },
  { label: 'Draft', value: 'draft', selectedLabel: 'draft', reverse: true },
  { label: 'Advanced', value: 'instruct', selectedLabel: 'advanced', reverse: true },
  { label: 'Errors', value: 'errors', selectedLabel: 'errors count', reverse: true },
];

const Automations = () => {
  const { push } = useHistory();
  const { flow, flowId, loading } = usePaymentFlowContext();
  const automationsList = flow?.automations ?? [];
  const automationsRows = getRows(automationsList, push);

  const handleExploreAutomations = () => {
    push(UI_ROUTES.automationsDirectory);
  };

  const handleAddTemplate = () => {
    push(`${UI_ROUTES.automationsTemplatesBasic}/${templateId}/${flowId}`);
  };

  const handleAutomationClick = (automationId) => {
    push({
      pathname: `/automations/${automationId}/editor`,
      state: { prevRoute: 'flow' },
    });
  };

  const [order, setOrder] = useSearchSort(true);

  const { order: orderKey, orderBy } = getOrderDataFromSearchParamsSort(order);

  const currentSort = options.find((item) => item.value === orderBy);

  const isReverse = currentSort?.reverse;

  const _rows = isReverse
    ? stableSort(automationsRows, getComparator(orderKey, orderBy))?.reverse()
    : stableSort(automationsRows, getComparator(orderKey, orderBy));

  const optionsWithFunc = options.map(({ label, value }) => ({ [label]: () => setOrder(value) }));

  const label = currentSort?.selectedLabel || 'status';

  return (
    <Box border="1px">
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <L16B>Automations</L16B>
        <DropDownMenu
          id="sort"
          button={
            <P14M color={THEME.primaryColors.primary} cursor="pointer" display="flex" alignItems="center">
              Sort by {label}
              <Switch />
            </P14M>
          }
          options={optionsWithFunc}
        />
      </Box>
      <Box component="section" mt="16px">
        <StyledWrapper $hideSeparator>
          {loading && <LoadingState />}
          {!loading && isEmpty(automationsList) && (
            <AutomationsEmptyState
              handleAddTemplate={handleAddTemplate}
              handleExploreAutomations={handleExploreAutomations}
            />
          )}
          {!loading &&
            !isEmpty(automationsList) &&
            _rows?.map((row) => <AutomationRow data={row} handleClick={handleAutomationClick} key={row?.id} />)}
        </StyledWrapper>
      </Box>
    </Box>
  );
};

export default Automations;
