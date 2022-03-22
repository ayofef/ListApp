import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import { func, bool } from 'prop-types';
import { HeaderWrapper, Wrap, ModalFromRightWrap } from './styled';
import { CloseIcon } from '../../../assets/icons';
import { groupApiRequest } from '../../../utils/helpers';
import NewRequestForm from '../../forms/GenerateForm';
import { useNewRequest } from '../../../hooks/appHooks';
import useSetCustomerMetadata from '../../../hooks/useSetCustomerMetadata';
import { useGlobalContext } from '../../../containers/App/context';
import { AUTOCOMPLETE_MERCHANT } from '../../../utils/queries/public/publicQueries';
import { H3, WrapModal } from '../../atoms';
import { FormWrapper } from '../../forms/FormWrapper';
import { FlexContainer } from '../../atoms/flex/FlexContainer';

const NewRequest = ({ open, setShowModal, loading, dashboardDataRefetch }) => {
  const [newRequest, { data }] = useNewRequest();
  const [activeTab] = useState(1);
  const dataRequest = groupApiRequest('newRequestFormData', activeTab);
  const [clicked, setClicked] = useState(false);
  const [merchant, setMerchant] = useState(false);
  const { IS_TABLET, stepsCheckListMeta } = useGlobalContext();
  const { t } = useTranslation();

  const { data: merchantData, loading: merchantLoading } = useQuery(AUTOCOMPLETE_MERCHANT, {
    skip: !merchant,
    variables: {
      query: merchant,
    },
  });
  const { setMetadata } = useSetCustomerMetadata();

  useEffect(() => {
    if (data) {
      dashboardDataRefetch();
      if (!stepsCheckListMeta.newRequest) {
        setMetadata({ checklist: { ...stepsCheckListMeta, newRequest: true } });
      }
    }
  }, [data, dashboardDataRefetch, setMetadata, stepsCheckListMeta]);

  useEffect(() => {
    if (!loading && data && clicked) {
      setShowModal();
      setClicked(false);
    }
  }, [loading, data, clicked, setShowModal]);

  const onSubmitHandler = (values) => {
    newRequest({ variables: { ...values } });
    setClicked(true);
  };

  const setMerchantHandler = (newData) => {
    setMerchant(newData);
  };

  return (
    <Wrap direction="left" in={open}>
      <div>
        <WrapModal onClick={setShowModal} />
        <ModalFromRightWrap maxWidth={IS_TABLET ? '100%' : '480px'}>
          <div className="modal-body">
            <HeaderWrapper>
              <H3>{t('app.settingsModal.title')}</H3>

              <span>
                <span className="modal-body__close">
                  <CloseIcon onClick={setShowModal} />
                </span>
              </span>
            </HeaderWrapper>

            <FlexContainer flexDirection="column" width="100%">
              <Formik
                validationSchema={dataRequest.validationSchema}
                initialValues={dataRequest.initialValues}
                enableReinitialize
                displayName={dataRequest.displayName}
                onSubmit={(values) => {
                  onSubmitHandler(values);
                }}
              >
                {(props) => {
                  return (
                    <FormWrapper fullWidth padding="0">
                      <NewRequestForm
                        {...props}
                        data={dataRequest}
                        setShowModal={setShowModal}
                        loading={clicked}
                        merchant={{ setMerchant: setMerchantHandler, merchantData, merchantLoading }}
                      />
                    </FormWrapper>
                  );
                }}
              </Formik>
            </FlexContainer>
          </div>
        </ModalFromRightWrap>
      </div>
    </Wrap>
  );
};

NewRequest.propTypes = {
  open: bool.isRequired,
  setShowModal: func.isRequired,
  handleSubmit: func,
  loading: bool.isRequired,
  dashboardDataRefetch: func,
};

NewRequest.defaultProps = {
  handleSubmit: () => false,
  dashboardDataRefetch: () => false,
};

export default NewRequest;
