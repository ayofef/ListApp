import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import has from 'lodash/has';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ReactMarkdown from 'react-markdown';
import { useQuery } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  StyledAccordion,
  StyledAccordionSummary,
  StyledContentBox,
  StyledHelperBox,
  StyledLinkBox,
  StyledSpinnerBox,
} from './styled';
import { L14M } from '../../../../../../atoms';
import THEME from '../../../../../../../constants/theme';
import { ExternalLink } from '../../../../../../../pages/FlowDetailsPage/Sidebar/styled';
import ArrowUpRight from '../../../../../../../assets/icons/ArrowUpRight';
import { useElementDataToSave } from '../hooks/useElementDataToSave';
import { localStorageService } from '../../../../../../../utils/localStorageService';
import { STORAGE_KEYS } from '../../../../../../../constants/storage';
import { GET_NODE_HELPER } from '../../../../../../../utils/queries/flows/queries';

const NodeHelper = () => {
  const { t } = useTranslation();
  const [elementDataToSave] = useElementDataToSave();
  const typename = elementDataToSave?.selectedDataType
    ? `${elementDataToSave?.__typename}.${elementDataToSave.selectedDataType}`
    : elementDataToSave?.__typename;
  const { loading, data } = useQuery(GET_NODE_HELPER, {
    variables: {
      nodeId: typename,
    },
    skip: !typename,
  });
  const nodeHelperData = data?.getNodeHelper;
  const [expanded, setExpanded] = useState(false);
  const [helperObj, setHelperObj] = useState({});

  useEffect(() => {
    const helper = localStorageService.getItem(STORAGE_KEYS.noCodeEditorHelper);
    setHelperObj(helper);
    if (has(helper, typename)) {
      setExpanded(!!helper[typename]);
    } else {
      setExpanded(false);
    }
  }, [typename]);

  const onChangeExpanded = () => {
    localStorageService.setItem('noCodeEditorHelper', { ...helperObj, [typename]: !expanded });
    setExpanded(!expanded);
  };

  return (
    <StyledAccordion expanded={expanded} onChange={onChangeExpanded} $expanded={expanded}>
      <StyledAccordionSummary
        $expanded={expanded}
        expandIcon={<ExpandMoreIcon color={expanded ? 'action' : 'primary'} />}
        aria-controls="helper-field-content"
        id="helper-field-content"
      >
        {t('Help')}
      </StyledAccordionSummary>
      <StyledHelperBox>
        {loading ? (
          <StyledSpinnerBox>
            <CircularProgress size={24} color="inherit" />
          </StyledSpinnerBox>
        ) : (
          <>
            <L14M color={THEME.greyColors.grey17} margin="0 0 10px 0">
              {nodeHelperData?.title}
            </L14M>
            <StyledContentBox>
              <ReactMarkdown>{nodeHelperData?.content}</ReactMarkdown>
            </StyledContentBox>
            {nodeHelperData?.docsUrls?.map(({ url, label }) => (
              <StyledLinkBox>
                <ExternalLink href={url} target="_blank" noUnderline fontSize="14px" color={THEME.greyColors.grey11}>
                  {label}
                  <ArrowUpRight />
                </ExternalLink>
              </StyledLinkBox>
            ))}
          </>
        )}
      </StyledHelperBox>
    </StyledAccordion>
  );
};

export default NodeHelper;
