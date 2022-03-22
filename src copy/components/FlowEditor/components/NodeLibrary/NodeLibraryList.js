import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import capitalize from '@material-ui/core/utils/capitalize';
import Skeleton from '@material-ui/lab/Skeleton';
import range from 'lodash/range';
import { useNotificationManager } from '../../../../hooks/useNotificationManager';
import { P14 } from '../../../atoms';
import { useNodesModalContext } from '../Node/context';
import { NodeLibraryGroup } from './NodeLibraryGroup';
import { NodeLibraryContainer } from './styled';
import { useFlowEditorContext } from '../../context';

const RANGE = range(12);
/*
 * define flex order
 * https://developer.mozilla.org/en-US/docs/Web/CSS/order
 *  */
const ORDER = {
  Triggers: 0,
  Actions: 1,
  Conditions: 2,
  Services: 3,
};

const MAX = Object.values(ORDER).reduce((acc, order) => (acc > order ? acc : order));

const NodeLibraryList = ({ search, open }) => {
  const { t } = useTranslation();
  const { isModal } = useNodesModalContext();
  const { stepLibraryData, stepLibraryError, stepLibraryLoading } = useFlowEditorContext();
  const isLoading = stepLibraryLoading || !stepLibraryData;
  const entries = useMemo(() => {
    const steps = Object.entries(stepLibraryData?.getFlowStepLibrary || {});
    return steps?.filter(([name]) => !name.includes('extra') && name !== '__typename') || [];
  }, [stepLibraryData?.getFlowStepLibrary]);

  const filteredEntries = useMemo(() => {
    return entries?.map(([name, items]) => {
      const matches =
        items?.filter(({ name: itemName }) => itemName?.toLowerCase().includes(search?.toLowerCase()?.trim())) || [];
      return [name, matches];
    });
  }, [entries, search]);

  useNotificationManager('error', stepLibraryError?.message, 'Fetch Node Library', 5000);

  return (
    <NodeLibraryContainer open={open} isModal={isModal} $searchActive={!!search}>
      {isLoading && (
        <Box
          mt="12px"
          display="flex"
          flexWrap="wrap"
          alignItems="flex-start"
          height="500px"
          width="100%"
          justifyContent="center"
        >
          {RANGE.map((i) => (
            <Box width="90%" height={48} mb={1} key={i}>
              <Skeleton height="48px" />
            </Box>
          ))}
        </Box>
      )}
      {filteredEntries?.length > 0 &&
        !stepLibraryLoading &&
        filteredEntries.map(
          ([name, items]) =>
            items?.length > 0 && (
              <Box component="section" key={`${name}+${isModal}`} order={ORDER[name] ?? MAX}>
                <NodeLibraryGroup
                  name={name}
                  items={items}
                  extraItems={stepLibraryData?.getFlowStepLibrary[`extra${capitalize(name)}`]}
                />
              </Box>
            )
        )}
      {filteredEntries?.length === 0 && !isLoading && (
        <Box flexGrow={1} marginTop="32px">
          <P14 color="#787F88" textAlign="center">
            {t('flowEditor.left.nodeNotFound', { search })}
          </P14>
        </Box>
      )}
    </NodeLibraryContainer>
  );
};

NodeLibraryList.propTypes = {
  search: PropTypes.string,
  open: PropTypes.bool.isRequired,
};

NodeLibraryList.defaultProps = {
  search: '',
};

export { NodeLibraryList };
