import React, { useMemo } from 'react';
import { shape, string, bool, arrayOf } from 'prop-types';
import uniqBy from 'lodash/uniqBy';
import TabContent from './TabContent';
import StatusTab from './StatusTab';
import Tabs from '../../../../components/common/Tabs';
import { generateUserPilotLabel } from '../../../../constants/generateUserPilotLabel';
import { USER_PILOT_SECTION_ID } from '../../constant';
import { FlexContainer } from '../../../../components/atoms/flex/FlexContainer';

const DetailsContentBlock = ({ connection, linkedPaymentFlows, paymentFlowLoading }) => {
  const isPaymentConnection = useMemo(
    () => connection?.type === 'PAYMENT_GATEWAY' || connection?.company?.categories?.includes('Payment Gateway'),
    [connection]
  );
  const triggersArray = useMemo(
    () =>
      uniqBy(
        (connection?.supportedEventDetails || []).map((item) => ({
          name: item?.label,
        })),

        'name'
      ),
    [connection]
  );

  const actionsArray = useMemo(
    () =>
      uniqBy(
        (connection?.actionDetails?.actions || []).map((item) => ({
          name: item?.name,
        })),
        'name'
      ),
    [connection]
  );

  const tabs = useMemo(
    () =>
      [
        isPaymentConnection &&
          connection.status === 'CONNECTED' && {
            label: 'Status',
            id: generateUserPilotLabel(USER_PILOT_SECTION_ID, 'tabs', 'status'),
            node: (
              <StatusTab
                connection={connection}
                linkedPaymentFlows={linkedPaymentFlows}
                paymentFlowLoading={paymentFlowLoading}
              />
            ),
          },
        {
          label: 'Actions',
          id: generateUserPilotLabel(USER_PILOT_SECTION_ID, 'tabs', 'actions'),
          node: (
            <TabContent
              itemsArray={actionsArray}
              type="actions"
              connectionName={connection?.company?.name}
              connectionLogo={connection.company?.logo}
            />
          ),
        },
        {
          label: 'Triggers',
          id: generateUserPilotLabel(USER_PILOT_SECTION_ID, 'tabs', 'triggers'),
          node: (
            <TabContent
              itemsArray={triggersArray}
              type="triggers"
              connectionName={connection?.company?.name}
              connectionLogo={connection.company?.logo}
            />
          ),
        },
      ]?.filter(Boolean),
    [triggersArray, actionsArray, connection, isPaymentConnection, linkedPaymentFlows, paymentFlowLoading]
  );
  return (
    <FlexContainer
      width="100%"
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="flex-start"
      alignSelf="flex-start"
    >
      <FlexContainer width="100%">
        <Tabs tabs={tabs} />
      </FlexContainer>
    </FlexContainer>
  );
};

DetailsContentBlock.propTypes = {
  connection: shape({
    status: string,
    name: string,
    company: shape({
      name: string,
      logo: string,
      homepageUrl: string,
      supportUrl: string,
      longDescription: string,
    }),
  }).isRequired,
  linkedPaymentFlows: arrayOf(
    shape({
      id: string,
      name: string,
    })
  ).isRequired,
  paymentFlowLoading: bool.isRequired,
};

export default DetailsContentBlock;
