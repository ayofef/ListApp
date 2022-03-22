import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { useParams, matchPath, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import { useToggle } from 'react-use';
import Badge from '@material-ui/core/Badge';
import styled from 'styled-components';
import { IconButton } from '../styled';
import RefundIcon from '../../../assets/icons/Refund';
import Title from '../Header/Title';
import { ButtonRounded } from '../../../components/atoms';
import { useCommentsContext } from '../CommentsDrawerContent/CommentsContext';
import { UI_ROUTES } from '../../../constants/routes';
import RefundDialog from './RefundDialog';
import { isDefined } from '../../../utils/helpers';
import { useGetViews } from '../../../hooks/useGetView';
import usePermission from '../../../permissions/hooks/usePermission';
import { PAYMENTS_PERMISSIONS_IDS } from '../permissions';
import OptionsMenu from '../../../components/atoms/OptionsMenu';
import { usePaymentsDetailsContext } from '../../DataTables/PaymentDetails/PaymentDetailsContext';
import CommentIcon from '../../../assets/icons/Comment';

const PAYMENT_ISSUES_ROUTE_MATCH = '/payments/payment-issues/details/:issuesId/payments/:detailsId';

const StyledBadge = styled(({ active, ...props }) => <Badge {...props} />)`
  color: ${({ active }) => (active ? 'white' : 'rgb(120, 127, 136)')};
`;

const Header = ({ toggleDrawer, isIntent }) => {
  const { t } = useTranslation();
  const { toggleCreateIssuesModal } = usePaymentsDetailsContext();

  const location = useLocation();
  const { detailsId, issueId, viewsId } = useParams();
  const [hasPaymentManagementPermission] = usePermission(PAYMENTS_PERMISSIONS_IDS.paymentsManagement);

  const matchIssuesPage = matchPath(location?.pathname, PAYMENT_ISSUES_ROUTE_MATCH);
  const isIssuesDetails = issueId && isDefined(matchIssuesPage);

  const savedViews = useGetViews();
  const currentSavedViewName = savedViews?.[viewsId]?.name;

  const primary = useMemo(() => {
    const searchParams = location?.search || '';
    switch (true) {
      case isIssuesDetails:
        return {
          title: 'Issues',
          route: `${UI_ROUTES.payments}/payment-issues${searchParams}`,
        };
      case !!viewsId:
        return {
          title: currentSavedViewName || 'Saved View',
          route: `${UI_ROUTES.payments}/views/${viewsId}${searchParams}`,
        };
      default:
        return {
          title: 'All',
          route: UI_ROUTES.payments,
        };
    }
  }, [isIssuesDetails, currentSavedViewName, viewsId, location?.search]);

  const { newCommentsCount } = useCommentsContext();
  const [modalShown, toggleShowModal] = useToggle(false);

  return (
    <Box display="flex" minHeight="40px">
      <Box display="flex" alignItems="center" flexGrow="1" width="auto" overflow="hidden">
        <Title primary={primary} secondary={detailsId || issueId} />
      </Box>

      <Box display="flex" alignItems="center">
        {!isIntent && hasPaymentManagementPermission && (
          <Box>
            <ButtonRounded
              onClick={toggleShowModal}
              type="button"
              variant="contained"
              color="secondary"
              startIcon={<RefundIcon />}
            >
              <Box component="span" color="#000">
                {t('payments.refund')}
              </Box>
            </ButtonRounded>
          </Box>
        )}

        {detailsId && hasPaymentManagementPermission && (
          <>
            <Box pl={2}>
              <IconButton
                bgcolor={newCommentsCount > 0 ? '#3023C8' : '#F5F6F7'}
                type="button"
                onClick={toggleDrawer}
                height="40px"
                width="40px"
              >
                <StyledBadge color="secondary" active={newCommentsCount > 0} badgeContent={newCommentsCount}>
                  <CommentIcon color="inherit" />
                </StyledBadge>
              </IconButton>
            </Box>

            {!isIntent && (
              <Box pl={2}>
                <OptionsMenu
                  color="#000"
                  options={[
                    {
                      label: 'Create issue',
                      onClick: toggleCreateIssuesModal,
                      disabled: issueId,
                    },
                  ]}
                />
              </Box>
            )}
          </>
        )}
      </Box>

      <RefundDialog isOpen={modalShown} toggleIsOpen={toggleShowModal} />
    </Box>
  );
};

Header.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
  isIntent: PropTypes.bool.isRequired,
};

export default Header;
