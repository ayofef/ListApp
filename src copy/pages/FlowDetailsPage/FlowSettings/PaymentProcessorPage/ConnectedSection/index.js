import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import StyledInPageSection from '../../components/StyledInPageSection';

import ConnectedConnectionItem from './ConnectedConnectionItem';
import NewConnectionModal from './NewConnectionModal';
import useSearch from '../../../../../hooks/useSearch';
import AddNewButton from '../../../Components/AddNewButton';

const ConnectedSection = ({ connectedProcessors, defaultProcessor }) => {
  const [searchParams, setSearchParams] = useSearch();
  const [isOpenConnectionModal, setIsOpenConnectionModal] = useState(false);

  const closeConnectionModal = useCallback(() => {
    setSearchParams(omit(searchParams, ['search', 'sort']));
    setIsOpenConnectionModal(false);
  }, [searchParams, setSearchParams]);

  return (
    <StyledInPageSection title="Connected">
      {connectedProcessors?.map((connection) => {
        return (
          <ConnectedConnectionItem connection={connection} key={connection.id} defaultProcessor={defaultProcessor} />
        );
      })}
      <AddNewButton onClick={() => setIsOpenConnectionModal(true)} label="New connection" />
      {isOpenConnectionModal && (
        <NewConnectionModal
          isOpen={isOpenConnectionModal}
          closeModal={closeConnectionModal}
          types={['PAYMENT_GATEWAY']}
        />
      )}
    </StyledInPageSection>
  );
};

ConnectedSection.propTypes = {
  connectedProcessors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      company: PropTypes.shape({
        name: PropTypes.string,
        logo: PropTypes.string,
      }),
    })
  ).isRequired,
  defaultProcessor: PropTypes.string.isRequired,
};

export default ConnectedSection;
