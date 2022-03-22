import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { func, bool, shape } from 'prop-types';
import { HeaderWrapper } from './styled';
import { CloseIcon } from '../../../assets/icons';
import { groupApiRequest } from '../../../utils/helpers';
import GenerateForm from '../../forms/GenerateForm';
import { usePurchaseRequest } from '../../../hooks/appHooks';
import { AUTOCOMPLETE_MERCHANT } from '../../../utils/queries/public/publicQueries';
import { P16B } from '../../atoms';
import { FlexContainer } from '../../atoms/flex/FlexContainer';
import { FormWrapper } from '../../forms/FormWrapper';

const PurchaseRequest = ({ setShowModal, values, setContent, setComponentContent, dataRefetch }) => {
  const [purchaseRequest, { data, loading }] = usePurchaseRequest();
  const [activeTab] = useState(1);
  const dataRequest = groupApiRequest('editForm', activeTab);
  const [merchant, setMerchant] = useState(false);
  const { data: merchantData, loading: merchantLoading } = useQuery(AUTOCOMPLETE_MERCHANT, {
    skip: !merchant,
    variables: {
      query: merchant,
    },
  });

  useEffect(() => {
    if (data && !loading) {
      setContent();
      setComponentContent();
      dataRefetch();
    }
  }, [data, loading, setContent, setComponentContent, dataRefetch]);

  const onSubmitHandler = (_values, resetForm) => {
    purchaseRequest({ variables: { ..._values } }).then(() => {
      resetForm({});
      setShowModal();
    });
  };

  const setMerchantHandler = (_data) => {
    setMerchant(_data);
  };

  return (
    <>
      <HeaderWrapper>
        <P16B>One-Time Spend</P16B>
        <span>
          <span className="modal-body__close">
            <CloseIcon onClick={setShowModal} />
          </span>
        </span>
      </HeaderWrapper>

      <FlexContainer flexDirection="column" width="100%">
        <Formik
          validationSchema={dataRequest.validationSchema}
          initialValues={values}
          enableReinitialize
          displayName={dataRequest.displayName}
          onSubmit={(formikValues, { resetForm }) => {
            onSubmitHandler(formikValues, resetForm);
          }}
        >
          {(props) => {
            return (
              <FormWrapper fullWidth padding="0">
                <GenerateForm
                  {...props}
                  data={dataRequest}
                  setShowModal={setShowModal}
                  merchant={{ setMerchant: setMerchantHandler, merchantData, merchantLoading }}
                />
              </FormWrapper>
            );
          }}
        </Formik>
      </FlexContainer>
    </>
  );
};

PurchaseRequest.propTypes = {
  open: bool,
  values: shape({}),
  setShowModal: func.isRequired,
  handleSubmit: func,
  setContent: func,
  setComponentContent: func,
  dataRefetch: func,
};

PurchaseRequest.defaultProps = {
  handleSubmit: () => false,
  setContent: () => false,
  setComponentContent: () => false,
  values: {},
  open: false,
  dataRefetch: () => false,
};

export default PurchaseRequest;
