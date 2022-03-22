import React from 'react';
import Box from '@material-ui/core/Box';
import { useLocation } from 'react-router-dom';
import CallMadeIcon from '@material-ui/icons/CallMadeRounded';
import { SIDEBAR_WIDTH, ROUTES, NEW_TAB_LINKS, BORDER_COLOR } from '../constant';
import { StyledLinkList, StyledExternalLinkList, ExternalLink } from './styled';
import LinkItem from './LinkItem';
import { usePaymentFlowContext } from '../paymentFlowContext';

const Sidebar = () => {
  const { search } = useLocation();
  const { flowId } = usePaymentFlowContext();
  const generateLink = ({ route }) => ({
    pathname: `/flows/${flowId}/details${route?.path || ''}`,
    search,
  });

  return (
    <Box
      component="aside"
      position="fixed"
      display="block"
      height="calc(100vh - 72px)"
      width={SIDEBAR_WIDTH}
      bgcolor="#fff"
      padding="32px 14px 0 10px"
      boxSizing="border-box"
      borderRight={`0.5px solid ${BORDER_COLOR}`}
    >
      <StyledLinkList>
        {ROUTES.map((route) =>
          process.env.REACT_APP_HIDE_FLAG?.includes(route.label) ? null : (
            <LinkItem key={route.label} link={generateLink({ route })} label={route.label} isActive={route?.isActive} />
          )
        )}
      </StyledLinkList>

      <StyledExternalLinkList>
        {NEW_TAB_LINKS.map((route) =>
          route.external ? (
            <ExternalLink
              key={route.label}
              href={route.path}
              target="_blank"
              noUnderline
              padding="10px 16px"
              fontSize="14px"
              color="#545A61"
            >
              {route.label}
              <CallMadeIcon />
            </ExternalLink>
          ) : (
            <LinkItem key={route.label} link={route?.path} label={route.label} newTab />
          )
        )}
      </StyledExternalLinkList>
    </Box>
  );
};

export default Sidebar;
