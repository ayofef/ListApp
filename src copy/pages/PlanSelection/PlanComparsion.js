import React from 'react';
import { shape, string } from 'prop-types';

import { CheckmarkBlack } from '../../assets/icons';

import { Table, PlansComparison, StyledColumn } from './styled';

import { H3, P18B, L12 } from '../../components/atoms';

const PlansComparsion = ({ planBusinessTeam, planBusinessIndividual }) => {
  return (
    <PlansComparison>
      <H3>Plans comparison</H3>

      <Table>
        <tr>
          <td />
          <StyledColumn>
            <P18B>{planBusinessIndividual.name}</P18B>
            <L12>Ideal for individuals or small teams of 10 people or less</L12>
          </StyledColumn>
          <StyledColumn>
            <P18B>{planBusinessTeam.name}</P18B>
            <L12>Great for businessess and teams of 10 people or more</L12>
          </StyledColumn>
          <StyledColumn>
            <P18B>Enterprise</P18B>
            <L12>Perfect for big businessess with 100’s-to-10,000’s of people</L12>
          </StyledColumn>
        </tr>
        <tr>
          <td className="left">Virtual Cards</td>
          <td>10</td>
          <td>50</td>
          <td>Estimated based on needs</td>
        </tr>
        <tr>
          <td className="left">Card design</td>
          <td>Basic</td>
          <td>Advanced</td>
          <td>Custom</td>
        </tr>
        <tr>
          <td className="left">Card rules</td>
          <td>Basic</td>
          <td>Advanced</td>
          <td>Custom</td>
        </tr>
        <tr>
          <td className="left">Spend controls</td>
          <td>Basic</td>
          <td>Advanced</td>
          <td>Custom</td>
        </tr>
        <tr>
          <td className="left">Card programme templates</td>
          <td>Limited</td>
          <td>Unlimited</td>
          <td>Priorty access to new templates</td>
        </tr>
        <tr>
          <td className="left">Onboarding</td>
          <td>Self serve</td>
          <td>Concierege</td>
          <td>Red carpet style</td>
        </tr>
        <tr>
          <td className="left">Receipt collection</td>
          <td>
            <CheckmarkBlack />
          </td>
          <td>
            <CheckmarkBlack />
          </td>
          <td>
            <CheckmarkBlack />
          </td>
        </tr>
        <tr>
          <td className="left">Expense management</td>
          <td>
            <CheckmarkBlack />
          </td>
          <td>
            <CheckmarkBlack />
          </td>
          <td>
            <CheckmarkBlack />
          </td>
        </tr>
        <tr>
          <td className="left">Team card request workflows</td>
          <td />
          <td>
            <CheckmarkBlack />
          </td>
          <td>
            <CheckmarkBlack />
          </td>
        </tr>
        <tr>
          <td className="left">Automated approvals</td>
          <td />
          <td>
            <CheckmarkBlack />
          </td>
          <td>
            <CheckmarkBlack />
          </td>
        </tr>
        <tr>
          <td className="left">Slack integration (WhenThen Slackbot)</td>
          <td />
          <td>
            <CheckmarkBlack />
          </td>
          <td>
            <CheckmarkBlack />
          </td>
        </tr>
        <tr>
          <td className="left">Accountancy/ERP integration</td>
          <td />
          <td>
            <CheckmarkBlack />
          </td>
          <td>
            <CheckmarkBlack />
          </td>
        </tr>
        <tr>
          <td className="left">Reporting</td>
          <td />
          <td>Basic</td>
          <td>Advanced</td>
        </tr>
        <tr>
          <td className="left">SSO support</td>
          <td />
          <td />
          <td>
            <CheckmarkBlack />
          </td>
        </tr>
        <tr>
          <td className="left">WhenThen API access</td>
          <td />
          <td />
          <td>
            <CheckmarkBlack />
          </td>
        </tr>
        <tr>
          <td className="left">3rd party API driven virtual card creation</td>
          <td />
          <td />
          <td>
            <CheckmarkBlack />
          </td>
        </tr>
      </Table>
    </PlansComparison>
  );
};

PlansComparsion.propTypes = {
  planBusinessTeam: shape({ name: string }).isRequired,
  planBusinessIndividual: shape({ name: string }).isRequired,
};

export default PlansComparsion;
