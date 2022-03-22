import { useMutation } from '@apollo/client';
import React from 'react';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import isEmpty from 'lodash/isEmpty';
import { loadStripe } from '@stripe/stripe-js';
import { bool, func, string, arrayOf, shape } from 'prop-types';
import THEME from '../../constants/theme';

import { PlanTile, Price } from './styled';

import { SETUP_PLAN } from '../../utils/queries/customer/customerMutations';
import { Button, H3, P14, L11U } from '../../components/atoms';
import { FlexContainer } from '../../components/atoms/flex/FlexContainer';

const stripePromise = loadStripe(
  'pk_test_51HxiMaFSbmYNhITjJN0olD5clLBnk3Mp9LRV2p0SqhPAD6A75tGHu6dF5Gyj7uTtWVNNHKAOFDvezCPY2ZO5L6tx00TRfEhBUM'
);

const PlanItem = ({ period, plans, planConst, onClose, loading, setLoading, billing, refetchData }) => {
  const [setupPlan] = useMutation(SETUP_PLAN);
  const { planKey, prevPlanKey, options } = planConst;
  const plan = plans.find((item) => item.uiCode === planKey);
  const prevPlanData = plans.find((item) => item.uiCode === prevPlanKey);
  const planOptions = options(prevPlanData?.name || '');

  const handleSubmit = async (newPlan) => {
    setLoading(planConst.planKey);
    setupPlan({
      variables: {
        planId: newPlan.id,
        period: period.toUpperCase(),
      },
    }).then(async (res) => {
      if (res && isEmpty(res.errors)) {
        if (billing) {
          refetchData();
          onClose();
        } else {
          const token = res.data?.setupPlan?.token;
          if (token) {
            const stripe = await stripePromise;
            const { error } = await stripe.redirectToCheckout({
              sessionId: token,
            });
            // eslint-disable-next-line no-console
            console.error(error);
            setLoading(false);
          }
        }
      }
    });
  };

  if (plans.length === 0) {
    return null;
  }

  return (
    <FlexContainer
      flexDirection="column"
      maxWidth="540px"
      width="32%"
      padding={planKey !== 'business_team' ? '38px 0 0' : '0'}
    >
      {planKey === 'business_team' && <L11U color={THEME.secondaryColors.blue}>Most popular</L11U>}

      <PlanTile active={planKey === 'business_team'}>
        <div>
          <FlexContainer justifyContent="space-between" alignItems="flex-start">
            <H3 margin={plan?.name ? '0' : '0 0 33px'}>{plan?.name || 'Enterprise'}</H3>
            <Price>
              {plan ? (
                <>
                  <H3>
                    ${period === 'monthly' ? (plan.monthlyPrice / 100).toFixed(2) : (plan.annualPrice / 100).toFixed(2)}
                  </H3>
                  <P14>/mo</P14>
                </>
              ) : (
                <P14>Custom pricing</P14>
              )}
            </Price>
          </FlexContainer>
          {plan && (
            <P14 textAlign="right" margin="0 0 33px" color="#2346F2">
              {period === 'annual' && (
                <>Save ${(((plan.monthlyPrice - plan.annualPrice) / 100) * 12).toFixed(2)} per year</>
              )}
            </P14>
          )}
          <ul>
            {planOptions.map((item) => (
              <li>
                <P14>{item}</P14>
              </li>
            ))}
          </ul>
        </div>

        <div>
          {plan ? (
            <Button
              onClick={() => handleSubmit(plan)}
              loading={loading}
              className="blue"
              likeDisabled={loading}
              disabled={loading}
            >
              Continue {!loading && <ArrowForwardIcon />}
            </Button>
          ) : (
            <a href="mailto:support@whenthen.com">
              <Button disabled={loading} className="blue" loading={loading} likeDisabled={loading}>
                Let’s Talk {!loading && <ArrowForwardIcon />}
              </Button>
            </a>
          )}
        </div>
      </PlanTile>
    </FlexContainer>
  );
};

PlanItem.propTypes = {
  billing: bool,
  onClose: func,
  refetchData: func,
  period: string.isRequired,
  plans: arrayOf(shape({ uiCode: string })).isRequired,
  planConst: shape({ planKey: string, prevPlanKey: string, options: func }).isRequired,
  loading: bool.isRequired,
  setLoading: func.isRequired,
};

PlanItem.defaultProps = {
  billing: false,
  onClose: () => null,
  refetchData: () => null,
};

export default PlanItem;
