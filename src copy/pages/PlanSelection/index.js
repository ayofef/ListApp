import { useQuery } from '@apollo/client';
import React, { useEffect, useMemo, useState } from 'react';
import qs from 'qs';
import { bool, func } from 'prop-types';
import { animateScroll as scroll } from 'react-scroll';
import { useHistory } from 'react-router-dom';
import CustomLayout from '../../components/layouts/CustomLayout';
import THEME from '../../constants/theme';
import PlanComparsion from './PlanComparsion';
import SignupStepIndicator from '../../components/common/SignupStepIndicator';
import { GET_PLANS } from '../../utils/queries/public/publicQueries';
import PlanItem from './PlanItem';
import { RadioCircle, RadioWrapper, HeroControls, LogoutButtonCover } from './styled';
import { useGlobalContext } from '../../containers/App/context';
import { Button, PaddedPageWrapper, P14 } from '../../components/atoms';
import { planConsts } from './planConsts';
import { FlexContainer } from '../../components/atoms/flex/FlexContainer';

export const stepsData = [
  {
    label: 'Account',
  },
  {
    label: 'Select plan',
  },
  {
    label: 'Billing',
  },
];

const PlanSelection = ({ billing, onClose, refetchData }) => {
  const { getMeRefetch, logOut } = useGlobalContext();
  const history = useHistory();

  const { data: plansData } = useQuery(GET_PLANS);

  const [period, setPeriod] = useState('annual');
  const [loading, setLoading] = useState(null);

  const {
    location: { search },
  } = history;

  const [tableOpen, setTableOpen] = useState(false);

  const plans = useMemo(() => plansData?.plans || [], [plansData]);

  useEffect(() => {
    const params = qs.parse(search, { ignoreQueryPrefix: true });
    if (params.checkoutSuccess) {
      getMeRefetch();
    }
  }, [search, getMeRefetch]);

  const planBusinessIndividual = plans.find((plan) => plan.uiCode === 'business_individual');
  const planBusinessTeam = plans.find((plan) => plan.uiCode === 'business_team');

  const openTable = () => {
    setTableOpen(true);
    scroll.scrollMore(500);
  };

  return (
    <CustomLayout fullPage>
      <PaddedPageWrapper>
        <LogoutButtonCover>
          <Button onClick={logOut} smaller className="ghost" white>
            Logout
          </Button>
        </LogoutButtonCover>
        {!billing && <SignupStepIndicator steps={stepsData} currentStep={1} />}
        <div>
          <h3>Select the right plan for you business</h3>
          <HeroControls>
            <P14>You can downgrade or request your money back within 30 days. T&Cs apply.</P14>
            <FlexContainer>
              <RadioWrapper onClick={() => setPeriod('annual')}>
                <RadioCircle active={period === 'annual'} />
                <P14>Billed Annually</P14>
              </RadioWrapper>
              <RadioWrapper onClick={() => setPeriod('monthly')}>
                <RadioCircle active={period === 'monthly'} />
                <P14>Billed Monthly</P14>
              </RadioWrapper>
            </FlexContainer>
          </HeroControls>

          <FlexContainer justifyContent="space-between" alignItems="stretch" margin="24px 0 0">
            {planConsts.map((planConst) => (
              <PlanItem
                period={period}
                plans={plans}
                planConst={planConst}
                onClose={onClose}
                loading={loading === planConst.planKey}
                setLoading={setLoading}
                billing={billing}
                refetchData={refetchData}
              />
            ))}
          </FlexContainer>

          <P14 margin="20px 0 0">* Additional virtual cards available at $100 per pack of 50</P14>

          {!tableOpen && (
            <P14
              color={THEME.secondaryColors.blue}
              margin="20px 0 0"
              onClick={() => {
                openTable();
              }}
              cursor="pointer"
            >
              View full plans comparison
            </P14>
          )}

          {tableOpen && (
            <PlanComparsion planBusinessTeam={planBusinessTeam} planBusinessIndividual={planBusinessIndividual} />
          )}
        </div>
      </PaddedPageWrapper>
    </CustomLayout>
  );
};

PlanSelection.propTypes = {
  billing: bool,
  onClose: func,
  refetchData: func,
};

PlanSelection.defaultProps = {
  billing: false,
  onClose: () => null,
  refetchData: () => null,
};

export default PlanSelection;
