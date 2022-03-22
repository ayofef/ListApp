import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { string } from 'prop-types';
import { isEdge, isNode, ReactFlowProvider, removeElements } from 'react-flow-renderer';
import { useToggle } from 'react-use';
import intersectionWith from 'lodash/intersectionWith';
import Box from '@material-ui/core/Box';
import { NotificationManager } from 'react-notifications';
import isFunction from 'lodash/isFunction';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { AutomationDetails } from './components/AutomationDetails';
import { NodeLibrary } from './components/NodeLibrary';
import FlowEmpty from './components/FlowEmpty';
import { FlowEditorContextProvider } from './context';
import { CanvasContainer, nodeBaseStyles, StyledReactFlow } from './styled';
import { getLayoutedElements } from './utils/layout';
import { getNewElements } from './utils/getNewElements';
import { CircularLoader } from '../atoms';
import { SavingIndicator } from './components/SavingIndicator';
import { NODE_TYPE, nodeTypes } from './utils/nodeTypes';
import { edgeTypes } from './utils/edgeTypes';
import { mergeDeep } from '../../utils/mergeDeep';
import { useEditorData } from '../../hooks/flowEditor/useEditorData';
import { useSaveConfiguration } from '../../hooks/flowEditor/useSaveConfiguration';
import { useOnConnect } from '../../hooks/flowEditor/useOnConnect';
import { FlowHeader } from '../FlowHeader';
import { flowStepTypes } from './types';
import PremiumPreviewDialog from '../../pages/AutomationTemplatePage/PremiumPreviewDialog';
import { useGlobalContext } from '../../containers/App/context';
import { EXCEPTION_DICTIONARY } from '../../pages/AutomationTemplatePage/constant';
import NewConnectionModal from '../../pages/FlowDetailsPage/FlowSettings/PaymentProcessorPage/ConnectedSection/NewConnectionModal';
import { useFlowStepLibrary } from '../../hooks/flowEditor/useFlowStepLibrary';
import useIsDemo from '../../hooks/useIsDemo';
import SetupGuide from './components/SetupGuide';
import { StyledIconButton } from './components/SetupGuide/styled';
import THEME from '../../constants/theme';
import { useOnEdgeUpdate } from '../../hooks/flowEditor/useOnEdgeUpdate';

const onDragOver = (event) => {
  event.preventDefault();
  // eslint-disable-next-line no-param-reassign
  event.dataTransfer.dropEffect = 'move';
};

const PLAN_MAP = ['business_individual', 'business_team', 'enterprise'];

const FlowEditor = ({ flowId }) => {
  const [setupGuide, toggleSetupGuide] = useToggle(false);

  // FLOW LIBRARY BOILERPLATE
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  // DATA STORAGE
  const [elements, setElements] = useState([]);
  const [initialState, setInitialState] = useState([]);
  const [selectedElementId, setSelectedElementId] = useState(null);
  const [hoverElementId, setHoverElementId] = useState(null);
  const [isValidateOn, setIsValidateOn] = useState(false);
  const [elementDataToSave, setElementDataToSave] = useState(null);
  const [selectedInputs, setSelectedInputs] = useState(null);
  const [changesMade, setChangesMade] = useState(false);
  const [showUpgradeModal, toggleShowUpgradeModal] = useToggle(false);
  const [isOpenConnectionModal, setIsOpenConnectionModal] = useState(false);
  const [newConnectionTypes, setNewConnectionTypes] = useState(null);
  const preCommitFunction = useRef();

  //NODE LIST DRAWER
  const [drawerStatus, toggleDrawerStatus] = useToggle(true);

  const { getMeData } = useGlobalContext();

  const isDemo = useIsDemo();
  const activePlan = getMeData?.we?.activePlan?.plan?.uiCode;

  const selectedElement = elements.find(({ id }) => selectedElementId === id);
  const selectedElementData = selectedElement?.data;
  const findElementDataById = useCallback((stepId) => elements.find(({ id }) => stepId === id)?.data, [elements]);
  const setPreCommitFunction = useCallback((fn) => {
    preCommitFunction.current = fn;
  }, []);
  const {
    data,
    isInstruct,
    topFlowId,
    flowName,
    flowStatus,
    isDataReady,
    initialState: originalInitialState,
    publishedData,
    refetch,
    draftConfig,
    loading,
    minimumPlanRequired,
    errorCount,
    flowInstanceCount,
  } = useEditorData(flowId);

  const { stepLibraryData, stepLibraryError, stepLibraryLoading, stepLibraryRefetch } = useFlowStepLibrary(flowId);

  const openConnectionModal = useCallback(({ types }) => {
    setNewConnectionTypes(types);
    setIsOpenConnectionModal(true);
  }, []);

  const closeConnectionModal = async (e, shouldRefetch) => {
    setIsOpenConnectionModal(false);
    if (shouldRefetch) {
      await stepLibraryRefetch();
    }
  };

  useEffect(() => {
    if (PLAN_MAP.indexOf(minimumPlanRequired) > PLAN_MAP.indexOf(activePlan) && !loading) {
      toggleShowUpgradeModal();
    }
  }, [minimumPlanRequired, activePlan, loading, toggleShowUpgradeModal]);

  const { saveConfiguration, isDataSaving, saveConfigurationAsync } = useSaveConfiguration({
    flowId,
    initialState,
    setElements,
    setChangesMade,
    selectedElementData,
    elementDataToSave,
    setElementDataToSave,
  });
  const isEmpty = isDataReady && elements.length === 0;

  const setElementsAndSave = useCallback(
    (newState) => {
      if (typeof newState === 'function') {
        setElements((prevState) => {
          const _newState = newState(prevState);
          saveConfiguration(_newState);
          return _newState;
        });
      } else {
        setElements(newState);
        saveConfiguration(newState);
      }
    },
    [saveConfiguration]
  );

  const commitElementDataToSave = useCallback(async () => {
    const newElements = elements.map((element) => {
      if (element.id !== elementDataToSave?.id) {
        return element;
      }
      let elementData = {};
      if (isFunction(preCommitFunction.current)) {
        elementData = preCommitFunction.current(element.data);
        preCommitFunction.current = null;
      }
      if (elementDataToSave?.inputMappings?.length) {
        // filter inputMappings to match only current element's inputs
        const inputMappings = intersectionWith(
          elementDataToSave?.inputMappings,
          selectedInputs,
          (inputMap, input) => inputMap?.inputId === input?.id
        );
        return { ...element, data: { ...elementDataToSave, ...elementData, inputMappings } };
      }
      return { ...element, data: { ...elementDataToSave, ...elementData } };
    });
    setElements(newElements);
    await saveConfigurationAsync(newElements);
    setSelectedElementId(null);
  }, [elementDataToSave, elements, saveConfigurationAsync, selectedInputs]);

  useEffect(() => {
    if (isDataReady) {
      if (data.find((el) => isNode(el) && !el.position)) {
        setElements(getLayoutedElements(data));
      } else {
        setElements(data);
      }
      setInitialState(originalInitialState);
    }
  }, [data, isDataReady, originalInitialState]);

  //INTERACTIONS
  const [connectingNodeData, setConnectingNodeData] = useState(null);
  const [updatingEdgeNodeData, setUpdatingEdgeNodeData] = useState(null);

  const onDrop = async (event) => {
    event.preventDefault();
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const newNodeDataStr = event.dataTransfer.getData('application/new-node-data');
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left - 104,
      y: event.clientY - reactFlowBounds.top - 80,
    });
    const newNodeData = JSON.parse(newNodeDataStr);
    const newElements = getNewElements(newNodeData, position);
    if (newNodeData.trigger) {
      const alreadyHasTrigger = elements.some((el) => el?.data?.trigger);

      if (alreadyHasTrigger) {
        return NotificationManager.error(
          'You already have a trigger defined. Please delete the trigger and add your new trigger.',
          'Error!'
        );
      }
    }
    setElements([...elements, ...newElements]);
    return saveConfigurationAsync([...elements, ...newElements]);
  };

  const onConnect = useOnConnect(setElementsAndSave);
  const onEdgeUpdate = useOnEdgeUpdate(setElementsAndSave);

  const onConnectStart = (_, nodeData) => {
    setConnectingNodeData(nodeData);
  };
  const onConnectEnd = () => setConnectingNodeData(null);

  const onEdgeUpdateStart = (_, nodeData) => {
    setUpdatingEdgeNodeData(nodeData);
  };
  const onEdgeUpdateEnd = () => setUpdatingEdgeNodeData(null);

  const onElementsRemove = useCallback(
    (elementsToRemove) => {
      /* prevent removing locked elements */
      const lockedElement = elementsToRemove.find((el) => el?.data?.locked);
      if (lockedElement) {
        return;
      }
      const elementToRemoveIDs = elementsToRemove.map(({ id }) => id);
      /* close selected */
      if (elementToRemoveIDs.includes(selectedElementId)) {
        setSelectedElementId(null);
      }
      /* save configuration */
      setElementsAndSave((els) => {
        const res = removeElements(
          elementsToRemove.filter((removedElement) => isNode(removedElement)),
          els
        );
        return res.reduce((acc, element) => {
          const { data: elementData } = element;
          const typename = elementData?.__typename;
          let source;
          if (elementData) {
            ['nextStepId', 'trueStepId', 'falseStepId', 'elseStepId'].forEach((key) => {
              const stepIdValue = elementData[key];
              if (!stepIdValue || !elementToRemoveIDs.includes(stepIdValue)) {
                return;
              }
              source = source ?? { data: {} };
              source.data[key] = null;
            });
            if (elementData.valueToRoute?.length > 0) {
              const valueToRouteIndex = elementData.valueToRoute.findIndex(({ label }) =>
                elementToRemoveIDs.includes(label)
              );
              if (valueToRouteIndex > -1) {
                source = source ?? { data: {} };
                source.data.valueToRoute = [...elementData.valueToRoute];
                source.data.valueToRoute[valueToRouteIndex].label = '';
              }
            }
            // filter removed conditions from DataConditionStep
            if (
              (typename === flowStepTypes.DataConditionStep || typename === flowStepTypes.CountConditionStep) &&
              elementData?.conditions?.length
            ) {
              source = source ?? { data: {} };
              source.data.conditions = elementData?.conditions?.filter(
                (condition) => !elementToRemoveIDs.includes(condition.nextStepId)
              );
            }
          }
          const item = source
            ? mergeDeep(
                source?.data?.conditions ? { ...element, data: { ...element.data, conditions: null } } : element,
                source
              )
            : element;
          return [...acc, item];
        }, []);
      });
      /* fix connects */
      elementsToRemove.forEach((removedElement) => {
        if (!isEdge(removedElement)) {
          return;
        }
        onConnect({ ...removedElement, removeTarget: true });
      });
    },
    [onConnect, selectedElementId, setElementsAndSave]
  );

  const context = useMemo(
    () => ({
      flowId,
      isInstruct,
      flowName,
      flowStatus,
      topFlowId,
      loading,
      refetch,
      elements,
      draftConfig,
      changesMade,
      setChangesMade,
      initialState,
      selectedElementId,
      selectedElement,
      selectedElementData,
      setSelectedElementId,
      onElementsRemove,
      setElements,
      setElementsAndSave,
      setInitialState,
      setHoverElementId,
      hoverElementId,
      connectingNodeData,
      updatingEdgeNodeData,
      makeConnection: onConnect,
      drawerStatus,
      toggleDrawerStatus,
      isValidateOn,
      saveConfigurationAsync,
      elementDataToSave,
      setElementDataToSave,
      isDataSaving,
      commitElementDataToSave,
      findElementDataById,
      selectedInputs,
      setSelectedInputs,
      setPreCommitFunction,
      toggleShowUpgradeModal,
      errorCount,
      flowInstanceCount,
      isOpenConnectionModal,
      setIsOpenConnectionModal,
      openConnectionModal,
      stepLibraryData,
      stepLibraryError,
      stepLibraryLoading,
      stepLibraryRefetch,
    }),
    [
      draftConfig,
      flowId,
      isInstruct,
      flowName,
      flowStatus,
      topFlowId,
      loading,
      changesMade,
      setChangesMade,
      refetch,
      elements,
      initialState,
      selectedElementId,
      selectedElement,
      selectedElementData,
      onElementsRemove,
      setElements,
      setElementsAndSave,
      hoverElementId,
      connectingNodeData,
      updatingEdgeNodeData,
      onConnect,
      drawerStatus,
      toggleDrawerStatus,
      isValidateOn,
      saveConfigurationAsync,
      elementDataToSave,
      setElementDataToSave,
      isDataSaving,
      commitElementDataToSave,
      findElementDataById,
      selectedInputs,
      setSelectedInputs,
      setPreCommitFunction,
      toggleShowUpgradeModal,
      errorCount,
      flowInstanceCount,
      isOpenConnectionModal,
      setIsOpenConnectionModal,
      openConnectionModal,
      stepLibraryData,
      stepLibraryError,
      stepLibraryLoading,
      stepLibraryRefetch,
    ]
  );

  const onSelectionChange = (els) => {
    if (!Array.isArray(els)) {
      return setSelectedElementId(null);
    }
    const [el] = els;
    if (isEdge(el)) {
      setSelectedElementId(el?.id ?? null);
    }
    return null;
  };

  const onElementClick = (_, { id }) => {
    setSelectedElementId(id);
  };

  const onNodeDragStop = (_, node) => {
    const newElements = elements.map((el) => (el.id === node.id ? { ...el, position: node.position } : el));
    setElementsAndSave(newElements);
  };

  //ELEMENT PREPROCESSING
  const reactFlowElements = useMemo(
    () =>
      elements.map((element) => {
        if (isEdge(element)) {
          return { ...element, arrowHeadType: 'arrow' };
        }
        return {
          ...element,
          ...nodeBaseStyles,
          type: NODE_TYPE.basic,
        };
      }),
    [elements]
  );

  return (
    <FlowEditorContextProvider value={context}>
      <ReactFlowProvider>
        <CanvasContainer ref={reactFlowWrapper}>
          <NodeLibrary />

          <AutomationDetails />

          <FlowHeader flowId={flowId} publishedData={publishedData} onValidate={() => setIsValidateOn(true)} />
          {!isDataReady && (
            <Box position="absolute" left="50%" top="45%">
              <CircularLoader />
            </Box>
          )}
          <SavingIndicator isDataSaving={isDataSaving} />
          <StyledReactFlow
            elements={reactFlowElements}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onConnect={isDemo ? null : onConnect}
            onConnectStart={onConnectStart}
            onConnectEnd={onConnectEnd}
            onEdgeUpdate={isDemo ? null : onEdgeUpdate}
            onEdgeUpdateStart={onEdgeUpdateStart}
            onEdgeUpdateEnd={onEdgeUpdateEnd}
            nodesDraggable={!isDemo}
            onElementClick={onElementClick}
            onSelectionChange={onSelectionChange}
            onElementsRemove={isDemo ? null : onElementsRemove}
            onLoad={setReactFlowInstance}
            onNodeDragStart={(e) => e.stopPropagation()}
            onNodeDragStop={onNodeDragStop}
            onDragOver={isDemo ? null : onDragOver}
            onDrop={isDemo ? null : onDrop}
            minZoom={0.5}
            maxZoom={2}
          />
        </CanvasContainer>
        <Box
          borderRadius="8px"
          boxShadow="0px 0px 16px rgba(0, 0, 0, 0.04)"
          bgcolor={THEME.primaryColors.white}
          p="8px"
          position="absolute"
          right={24}
          bottom={24}
          zIndex={10}
        >
          <StyledIconButton
            backgroundColor={setupGuide && THEME.greyColors.greyButton}
            $activeColor={THEME.greyColors.greyButton}
            onClick={toggleSetupGuide}
          >
            <InfoOutlinedIcon />
          </StyledIconButton>
        </Box>
        {setupGuide && <SetupGuide />}
      </ReactFlowProvider>

      {showUpgradeModal && (
        <PremiumPreviewDialog contentType={EXCEPTION_DICTIONARY.upgradePlan} toggleIsOpen={toggleShowUpgradeModal} />
      )}

      {isOpenConnectionModal && (
        <NewConnectionModal
          isOpen={isOpenConnectionModal}
          closeModal={closeConnectionModal}
          types={newConnectionTypes}
        />
      )}

      {isEmpty && <FlowEmpty />}
    </FlowEditorContextProvider>
  );
};

FlowEditor.propTypes = {
  flowId: string,
};
FlowEditor.defaultProps = {
  flowId: null,
};

export { FlowEditor };
