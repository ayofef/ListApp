import React, { useCallback, useState } from 'react';
import { Box, capitalize } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useTranslation } from 'react-i18next';
import LinesEllipsis from 'react-lines-ellipsis';
import isEmpty from 'lodash/isEmpty';
import { SavedViews } from '../../../../../assets/icons';
import { useGetViewLinks } from '../../../../../hooks/useGetView';
import { List, NavSubLink } from '../../StyledAside';
import ListSkeleton from '../../../../ListSkeleton';
import DialogDeleteView from './DialogDeleteView';
import { ErrorText } from './styled';
import { P14, P14B } from '../../../../atoms';
import THEME from '../../../../../constants/theme';
import { generateUserPilotAttribute } from '../../../../../constants/generateUserPilotLabel';

const USER_PILOT_SECTION_ID = 'saved-views';

const getViewName = (links, id) => links?.find((link) => link.id === id)?.title ?? 'this view';
const PaymentViews = () => {
  const { t } = useTranslation();
  const { loading, error, links } = useGetViewLinks();
  const [deleteViewId, setDeleteViewId] = useState(null);

  const handleDeleteView = useCallback((event) => setDeleteViewId(event.currentTarget.dataset.linkid), []);
  const handleOnClose = useCallback(() => setDeleteViewId(null), []);

  const listIsEmpty = isEmpty(links);
  return (
    <Box mt="30px" {...generateUserPilotAttribute(USER_PILOT_SECTION_ID, 'section')}>
      <Box m="0 16px 11px">
        <P14B>{capitalize(t('Saved Views'))}</P14B>
      </Box>

      {error && <ErrorText>{error?.message}</ErrorText>}
      {!loading && listIsEmpty && (
        <Box m="0 16px 11px" width="70%">
          <P14 color={THEME.greyColors.grey1}>{capitalize(t("You don't have any saved payment views"))}</P14>
        </Box>
      )}

      {links && !listIsEmpty && (
        <List>
          {links.map(({ id, title, to }) => {
            return (
              <li key={id}>
                <NavSubLink to={to} activeClassName="active">
                  <Box mb="-4px" mr="12px">
                    <SavedViews />
                  </Box>
                  <LinesEllipsis text={title} maxLine="1" ellipsis=".." trimRight basedOn="letters" />

                  <button type="button" data-linkid={id} onClick={handleDeleteView}>
                    <CloseIcon fontSize="small" color="inherit" />
                  </button>
                </NavSubLink>
              </li>
            );
          })}
        </List>
      )}

      {loading && <ListSkeleton height={32} p="2px 0" rowNumber={3} />}

      {deleteViewId && (
        <DialogDeleteView
          viewId={deleteViewId}
          viewName={getViewName(links, deleteViewId)}
          handleOnClose={handleOnClose}
        />
      )}
    </Box>
  );
};

export default PaymentViews;
