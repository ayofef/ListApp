import React, { useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import { Check } from '@material-ui/icons';
import noop from 'lodash/noop';
import { P16B, P14, H3, ButtonRounded } from '../../components/atoms';
import THEME from '../../constants/theme';
import PeopleModal from '../../components/modals/PeopleModal';
import { StyledPageWrapper, StyledStepsWrapper } from './styled';
import Step from './Step';
import { SECTIONS } from './constant';
import IntroSection from './IntroSection';
import { useGetEntryData } from './useGetEntryData';
import { useGlobalContext } from '../../containers/App/context';
import useSetCustomerMetadata from '../../hooks/useSetCustomerMetadata';
import usePermissionChecker from '../../permissions/hooks/usePermissionChecker';
import { isDefined } from '../../utils/helpers';
import ConfirmationModal from '../../components/modals/ConfirmationModal';
import { useSwitchDemo } from '../../hooks/useSwitchDemo';
import { useUserSelector } from '../../providers/User/UserContext';
import { selectIsDemo } from '../../providers/User/state/selectors';
import { useIntercom } from '../../hooks/useIntercom';

const GettingStarted = () => {
  const { t } = useTranslation();
  const { checkPermission } = usePermissionChecker();

  const { getMeData, getMeLoading, toggleDrawer, sidebarCollapsed } = useGlobalContext();
  const { gettingStartedChecklist, loading } = useGetEntryData();
  const [addPeopleModalOpen, setAddPeopleModalOpen] = useState(false);
  const [markCompleteModalOpened, setMarkCompleteModalOpened] = useState(false);
  const showIntroSection = !getMeLoading && getMeData?.we?.activePlan?.remainingTrialDays > 0;

  const { setMetadata } = useSetCustomerMetadata();
  const switchDemo = useSwitchDemo();
  const isDemoMode = useUserSelector(selectIsDemo);
  const { startDemoTour } = useIntercom();

  const handleFTEMarkedAsCompleted = () => {
    setMarkCompleteModalOpened(false);
    setMetadata({
      firstTimeEntry: {
        ...getMeData?.we?.metadata?.firstTimeEntry,
        markedAsCompleted: true,
      },
    });
  };

  useLayoutEffect(() => {
    if (!sidebarCollapsed) {
      toggleDrawer();
    }
    return () => {
      if (sidebarCollapsed) {
        toggleDrawer();
      }
    };
  }, [toggleDrawer, sidebarCollapsed]);

  const permittedSections = SECTIONS.filter(({ permission }) =>
    isDefined(permission) ? checkPermission(permission) : true
  );

  const getOnClickFn = (dataKey) => {
    switch (dataKey) {
      case 'inviteColleagues':
        return () => setAddPeopleModalOpen(true);
      case 'takeTour':
        return isDemoMode ? startDemoTour : () => switchDemo(true);
      default:
        return noop;
    }
  };

  return (
    <>
      <PeopleModal
        open={addPeopleModalOpen}
        setShowModal={() => setAddPeopleModalOpen(false)}
        userRefetch={() => {}}
        modalType="add"
        userContent={{}}
        updateUser={() => {}}
      />
      <H3 fontWeight="600" margin="0 0 16px 0">
        {t('Getting Started')}
      </H3>
      <StyledPageWrapper>
        <Box maxWidth="688px" width="100%">
          {showIntroSection && <IntroSection remainingTrialDays={getMeData?.we?.activePlan?.remainingTrialDays} />}

          {permittedSections.map(({ title, desc, steps }) => (
            <Box key={title} marginBottom="40px" width="100%">
              <Box marginBottom="24px">
                <P16B>{t(title)}</P16B>
                <P14 color={THEME.greyColors.grey1}>{t(desc)}</P14>
              </Box>

              <StyledStepsWrapper>
                {steps
                  .filter(({ permission }) => (isDefined(permission) ? checkPermission(permission) : true))
                  .map((step) => {
                    const isCompleted = gettingStartedChecklist?.[step?.dataKey] || false;

                    const onClickFunction = getOnClickFn(step.dataKey);
                    return (
                      <Step
                        key={step.dataKey}
                        dataKey={step.dataKey}
                        url={step.url}
                        title={step.title}
                        desc={step.desc}
                        icon={step.Icon}
                        completed={isCompleted}
                        loading={loading}
                        isStrokeSvg={step?.isStrokeSvg}
                        isExternalUrl={step?.isExternalUrl}
                        onClickFunction={onClickFunction}
                      />
                    );
                  })}
              </StyledStepsWrapper>
            </Box>
          ))}
          <Box display="flex" justifyContent="space-around">
            <ButtonRounded variant="contained" color="secondary" onClick={() => setMarkCompleteModalOpened(true)}>
              <Check fontSize="small" />
              &nbsp;{t('Mark as completed')}
            </ButtonRounded>
          </Box>
        </Box>
      </StyledPageWrapper>
      <ConfirmationModal
        open={markCompleteModalOpened}
        text={{
          title: 'Are you sure you want to mark as completed?',
          description: 'You won’t be able to see this section again after',
          submit: 'Mark complete',
        }}
        onConfirm={() => {
          handleFTEMarkedAsCompleted();
        }}
        onClose={() => {
          setMarkCompleteModalOpened(false);
        }}
        onCancel={() => {
          setMarkCompleteModalOpened(false);
        }}
      />
    </>
  );
};

export default GettingStarted;
