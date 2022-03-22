import PropTypes from 'prop-types';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';
import { StyledDrawer } from './styled';
import { ButtonRounded } from '../../../components/atoms';
import DrawerActions from './DrawerActions';

const BottomDrawer = ({ selected, setSelected, drawerOpen }) => {
  const { t } = useTranslation();

  const isOpen = selected.length > 0;

  return (
    <StyledDrawer open={isOpen} drawerOpen={drawerOpen}>
      {isOpen && (
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <DrawerActions selected={selected} />
          </Grid>

          <Grid item>
            <ButtonRounded type="button" variant="text" color="primary" onClick={() => setSelected([])}>
              {t('Deselect all')}
            </ButtonRounded>
          </Grid>
        </Grid>
      )}
    </StyledDrawer>
  );
};

BottomDrawer.propTypes = {
  drawerOpen: PropTypes.bool.isRequired,
  selected: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  setSelected: PropTypes.func.isRequired,
};

export default BottomDrawer;
