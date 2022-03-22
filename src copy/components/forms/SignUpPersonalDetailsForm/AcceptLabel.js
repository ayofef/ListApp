import React from 'react';

import { UI_ROUTES } from '../../../constants/routes';
import { LinkWrapper, L12 } from '../../atoms';

const AcceptLabel = () => (
  <L12 display="inline-block" margin="-2px 0 0">
    I accept WhenThen&apos;s{' '}
    <LinkWrapper href={UI_ROUTES.pilotAgreement} target="_blank" display="inline">
      <span className="text-primary">Pilot Agreement</span>
    </LinkWrapper>
    ,{' '}
    <LinkWrapper href={UI_ROUTES.termsOfService} target="_blank" display="inline">
      <span className="text-primary">Terms of Service</span>
    </LinkWrapper>{' '}
    and{' '}
    <LinkWrapper href={UI_ROUTES.policyNotice} target="_blank" display="inline">
      <span className="text-primary">Privacy Statement</span>
    </LinkWrapper>
    .
  </L12>
);

export default AcceptLabel;
