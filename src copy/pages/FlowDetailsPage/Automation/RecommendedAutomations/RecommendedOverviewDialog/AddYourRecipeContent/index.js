import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@material-ui/core';
import { func } from 'prop-types';
import { StyledDialogContent } from '../../../../../../components/Dialog/styled';
import { templatePropTypes } from '../Content/constant';
import { usePaymentFlowContext } from '../../../../paymentFlowContext';
import { StyledAutomationBox, StyledContentBox, StyledContentWrapper } from './styled';
import { ButtonRounded, L14M, P16 } from '../../../../../../components/atoms';
import ArrowRight from '../../../../../../assets/arrows/arrowRight';
import { useCreateFlowFromTemplate } from '../../../../../../hooks/flowActions/useCreateFlow';
import RoundedIconButton from '../../../../../../components/atoms/Buttons/RoundedIconButton';
import ChevronLeft from '../../../../../../assets/icons/Elements/ChevronLeft';
import THEME from '../../../../../../constants/theme';
import { ACTIVE_STATUSES } from '../../../AutomationBar/constant';
import { L10BU } from '../../../../../../components/atoms/Typography/L10BU';
import { TempH2 } from '../../../../../../components/atoms/Typography/TempH2';

const AddYourRecipeContent = ({ template, setIsShowAddYourRecipeContent }) => {
  const { t } = useTranslation();
  const { flow } = usePaymentFlowContext();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [createFlowFromTemplatePromise] = useCreateFlowFromTemplate();

  const automations =
    template?.plan === 'PREMIUM'
      ? flow?.automations?.filter((automation) => !!automation?.instruct)
      : flow?.automations;

  const customHandleAction = (automationId) => {
    createFlowFromTemplatePromise(null, template?.template?.id, automationId, false);
  };

  return (
    <>
      <Box mt="16px" pl="32px" pb="16px" borderBottom={`1px solid ${THEME.greyColors.grey16}`}>
        <RoundedIconButton onClick={() => setIsShowAddYourRecipeContent(false)} Icon={ChevronLeft} />
      </Box>
      <StyledDialogContent px="0 0 32px">
        <StyledContentWrapper>
          <StyledContentBox>
            <Box
              display="flex"
              alignItems="center"
              width="50%"
              pr="32px"
              height="100%"
              borderRight={`1px solid ${THEME.greyColors.grey16}`}
            >
              <Box>
                <TempH2 margin="0 0 24px 0">Where would you like to add your recipe?</TempH2>
                <P16 color={THEME.greyColors.grey18}>
                  You’ve chosen to add your recipe to an existing Automation. Please choose which Automation you would
                  like to use your Recipe?
                </P16>
              </Box>
            </Box>
            <Box width="50%" maxHeight="630px" overflow="scroll" display="flex" flexDirection="column" p="8px">
              {automations?.map((automation, i) => (
                <StyledAutomationBox onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)}>
                  <Box>
                    <Box
                      width="8px"
                      height="8px"
                      mr="12px"
                      bgcolor={
                        ACTIVE_STATUSES.includes(automation.status) ? THEME.statusColors.succeeded : 'transparent'
                      }
                      borderRadius="50%"
                    />
                  </Box>

                  <L14M overflow="hidden" textOverflow="ellipsis" noWrap>
                    {automation?.name}
                  </L14M>
                  {automation.instruct && (
                    <Box bgcolor={THEME.primaryColors.primaryLight} borderRadius="4px" ml="8px" mr="8px" p="6px 8px">
                      <L10BU margin="0px" color={THEME.primaryColors.primary}>
                        {t('INSTRUCT')}
                      </L10BU>
                    </Box>
                  )}
                  <Box ml="auto">
                    <ButtonRounded
                      type="button"
                      padding="0 16px"
                      variant={hoveredIndex === i ? 'contained' : ''}
                      color={hoveredIndex === i ? 'primary' : 'secondary'}
                      onClick={() => customHandleAction(automation?.id)}
                      endIcon={<ArrowRight size={24} color={hoveredIndex === i ? '#fff' : '#8F92F9'} />}
                      width="121px"
                    >
                      <L14M color={hoveredIndex === i ? '#fff' : '#8F92F9'}>{t('Add here')}</L14M>
                    </ButtonRounded>
                  </Box>
                </StyledAutomationBox>
              ))}
            </Box>
          </StyledContentBox>
        </StyledContentWrapper>
      </StyledDialogContent>
    </>
  );
};
AddYourRecipeContent.propTypes = {
  template: templatePropTypes.isRequired,
  setIsShowAddYourRecipeContent: func.isRequired,
};

export default AddYourRecipeContent;
