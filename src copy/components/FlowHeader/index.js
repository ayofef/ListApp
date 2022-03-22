import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import dropRight from 'lodash/dropRight';
import { ArrowBackRounded, ErrorRounded } from '@material-ui/icons';
import { isNode } from 'react-flow-renderer';
import { stringify } from 'qs';
import { StyledErrorsButton, StyledRunsBox, TopButtonGroupContainer, VerticalLine } from './styled';
import { RenameFlow } from './RenameFlow';
import { UI_ROUTES } from '../../constants/routes';
import { useFlowEditorContext } from '../FlowEditor/context';
import { StyledIconButton } from '../../pages/FlowDetailsPage/Header/styled';
import THEME from '../../constants/theme';
import { L14M } from '../atoms';
import ActionButtons from './ActionButtons';
import { FLOW_INSTANCE_STATUSES } from '../FlowEditor/utils/flowInstanceStatus';
import { transformSortToSearchParams } from '../../utils/transformSortToSearchParams';
import { STRINGIFY_OPTIONS } from '../../hooks/useSearch';
import StyledTooltip from '../styled/StyledTooltip';
import useIsDemo from '../../hooks/useIsDemo';
import { generateUserPilotAttribute, generateUserPilotLabel } from '../../constants/generateUserPilotLabel';
import { USER_PILOT_SECTION_ID } from '../FlowEditor/components/constant';

const FlowHeader = ({ onValidate }) => {
  const { push, location } = useHistory();
  const isDemo = useIsDemo();
  const { loading, topFlowId, elements, flowId, flowName, errorCount, flowInstanceCount } = useFlowEditorContext();

  const errorsNumber = elements?.filter(isNode)?.filter((n) => n?.data?.validationErrors?.length > 0).length;

  const onClickBack = () => {
    const pathnameArray = location?.pathname?.split('/');
    if (pathnameArray[pathnameArray.length - 1] === 'test') {
      const path = dropRight(pathnameArray, 1)?.join('/');
      return push(`${path}/editor`);
    }
    if (pathnameArray[pathnameArray.length - 1] === 'monitor') {
      const path = dropRight(pathnameArray, 1)?.join('/');
      return push(`${path}/editor`);
    }
    if (pathnameArray[pathnameArray.length - 1]) {
      const path = dropRight(pathnameArray, 1)?.join('/');
      return push(path);
    }
    if (location?.state?.prevRoute === 'flow' && !!topFlowId) {
      return push(`/flows/${topFlowId}/details/automations`);
    }
    /**If no  history stack  */
    return push(`/${UI_ROUTES.automations}`);
  };

  const openMonitor = () => {
    const sort = transformSortToSearchParams([{ fieldName: 'date', order: 'desc' }]);
    const filter = errorCount
      ? { inStatus: [FLOW_INSTANCE_STATUSES.IN_ERROR] }
      : { inStatus: FLOW_INSTANCE_STATUSES.ALL };
    push({
      pathname: `/automations/${flowId}/monitor`,
      search: `?${stringify({ ...(filter && { filter }), ...(sort && { sort: sort }) }, STRINGIFY_OPTIONS)}`,
    });
  };

  return (
    <Box>
      <Box
        position="fixed"
        top={24}
        left={24}
        bgcolor={THEME.primaryColors.white}
        zIndex={5}
        borderRadius={8}
        boxShadow="0 0 8px rgba(0, 0, 0, 0.05)"
        p="8px"
      >
        <TopButtonGroupContainer>
          <Box
            borderRadius="8px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            mr={flowName ? '8px' : 0}
            data-userpilot={generateUserPilotLabel(USER_PILOT_SECTION_ID, 'back-button')}
          >
            <StyledIconButton
              type="button"
              onClick={onClickBack}
              $width="40px"
              $height="40px"
              $strokeWidth="0"
              $color={THEME.greyColors.grey17}
              $fontSize="20px"
            >
              <ArrowBackRounded fontSize="large" />
            </StyledIconButton>
          </Box>
          {flowName && <VerticalLine />}
          {loading ? (
            <Box borderRadius="6px" mx="24px" overflow="hidden">
              <Skeleton variant="rect" height="20px" width="215px" animation="wave" />
            </Box>
          ) : (
            flowName && (
              <>
                <Box
                  px="24px"
                  maxWidth={215}
                  data-userpilot={generateUserPilotLabel(USER_PILOT_SECTION_ID, 'flow-name')}
                >
                  <RenameFlow fontSize="14px" />
                </Box>
                {!!errorsNumber && (
                  <StyledTooltip
                    title="Click here to see connection or configuration errors in your automation"
                    placement="bottom"
                  >
                    <StyledErrorsButton display="flex" alignItems="center" onClick={onValidate}>
                      <Box display="flex" alignItems="center" mr="6px" color={THEME.secondaryColors.nodeError}>
                        <ErrorRounded color="inherit" />
                      </Box>
                      <L14M color={THEME.secondaryColors.nodeError} margin="0 24px 0 0">
                        Configuration Error
                      </L14M>
                    </StyledErrorsButton>
                  </StyledTooltip>
                )}
                <VerticalLine />
              </>
            )
          )}
          {flowName && (
            <Box marginLeft="8px">
              <StyledTooltip title="Click here to monitor the runs of your automation" placement="bottom">
                <StyledRunsBox
                  $errorCount={errorCount}
                  onClick={openMonitor}
                  py="8px"
                  {...generateUserPilotAttribute(USER_PILOT_SECTION_ID, 'automation_runs')}
                >
                  <L14M color={THEME.greyColors.grey17}>
                    {flowInstanceCount} {flowInstanceCount === 1 ? 'run' : 'runs'}
                  </L14M>
                  {!!errorCount && (
                    <L14M color={THEME.statusColors.failed} margin="0 0 0 4px">
                      with {errorCount} errors
                    </L14M>
                  )}
                </StyledRunsBox>
              </StyledTooltip>
            </Box>
          )}
        </TopButtonGroupContainer>
      </Box>
      {isDemo ? null : (
        <Box
          position="fixed"
          top={24}
          right={24}
          p="8px"
          bgcolor={THEME.primaryColors.white}
          zIndex={5}
          borderRadius={8}
          boxShadow="0 0 8px rgba(0, 0, 0, 0.05)"
          minHeight="56px"
          boxSizing="border-box"
          display="flex"
          alignItems="center"
        >
          <TopButtonGroupContainer>
            {loading ? (
              <Box borderRadius="6px" overflow="hidden">
                <Skeleton variant="rect" height="40px" width="250px" animation="wave" />
              </Box>
            ) : (
              <ActionButtons onValidate={onValidate} topFlowId={topFlowId} />
            )}
          </TopButtonGroupContainer>
        </Box>
      )}
    </Box>
  );
};

FlowHeader.propTypes = {
  onValidate: PropTypes.func.isRequired,
};

export { FlowHeader };
