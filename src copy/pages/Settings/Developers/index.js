import React, { useMemo } from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/client';
import isEmpty from 'lodash/isEmpty';
import { ButtonRounded, H3, H4, P14 } from '../../../components/atoms';
import ListSkeleton from '../../../components/ListSkeleton';
import { useGetAPIKeyList, API_KEY_MUTATION_OPTION } from './apiKeyHooks';
import Table from './components/Table';
import DocumentationBlock from './components/DocumentationBlock';
import { headCells, transformNodeToRow } from './tableData';
import { GENERATE_API_KEY } from '../../../utils/queries/apiKey/apiKeysMutations';
import { globalLoadingConst } from '../../../constants/globalLoadingConsts';
import { useGlobalContext } from '../../../containers/App/context';
import DeveloperBlurbs from './DeveloperBlurbs';
import EmptyState from './EmptyState';
import FlowIdBlock from './FlowIdBlock';
import useGetPaymentFlow from '../../../hooks/useGetPaymentFlow';

const DevelopersPage = () => {
  const { t } = useTranslation();
  const { apiKeyList, loading } = useGetAPIKeyList();
  const [generateApiKey] = useMutation(GENERATE_API_KEY, API_KEY_MUTATION_OPTION);
  const { setGlobalLoading } = useGlobalContext();

  const { flow: flowData, loading: getPaymentFlowLoading } = useGetPaymentFlow();
  const automationList = flowData?.automations?.filter((automation) => automation.instruct === true) ?? [];
  const transformedAutomationList = automationList.map((automation) => ({
    instruct: automation.instruct,
    id: automation.id,
    name: automation.name,
  }));

  const rows = useMemo(() => apiKeyList.map(transformNodeToRow), [apiKeyList]);

  const handleGenerate = () => {
    setGlobalLoading(globalLoadingConst.apiKeysUpdate, true);

    generateApiKey().then(() => {
      setGlobalLoading(globalLoadingConst.apiKeysUpdate, false);
    });
  };

  return (
    <Box>
      <H3 fontWeight="600" margin="0 0 16px 0">
        {t('Developers')}
      </H3>

      <Box pt="32px">
        <DeveloperBlurbs />

        <FlowIdBlock automationList={transformedAutomationList} loading={getPaymentFlowLoading} />

        <Box mt="48px" display="flex" justifyContent="space-between">
          <Box flex="1" mr="20px">
            <H4>{t('Developer API keys')}</H4>
            <P14 color="#787F88" margin="8px 0 0 0">
              {t(
                'Manage the ways you setup your API keys to initiate WhenThen SDK, Server use only, should not be shared.'
              )}
            </P14>
          </Box>

          <ButtonRounded variant="contained" color="primary" height="32px" onClick={handleGenerate}>
            {t('Generate key')}
          </ButtonRounded>
        </Box>
      </Box>
      <Box mt="40px">
        <Table headCells={headCells} rows={rows} />
        {loading && <ListSkeleton rowNumber={5} height={38} p={0.2} />}
        {!loading && isEmpty(rows) && <EmptyState handleGenerate={handleGenerate} />}
      </Box>

      <Box>
        <DocumentationBlock />
      </Box>
    </Box>
  );
};

export default DevelopersPage;
