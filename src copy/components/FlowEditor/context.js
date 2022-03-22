import { createContext, useContext } from 'react';

const FlowEditorContext = createContext({});
const FlowEditorContextProvider = FlowEditorContext.Provider;

/**
 * @typedef FlowState
 *
 * @property {string} key
 * */

/**
 * @typedef FlowEditorContext
 * @property {string} [flowId]
 * @property {Object[]} [elements]
 * @property {FlowState[]} [initialState]
 * @property {object} [selectedElementData]
 * @property {string} [selectedElementId]
 * @property {array} [setSelectedElementId]
 * @property {Function} [onElementsRemove]
 * @property {Function} [setElementsAndSave]
 * @property {Function} [setHoverElementId]
 * @property {string} [hoverElementId]
 * @property {object} [connectingNodeData]
 * @property {Function} [setSelectedElementId]
 * */

/**
 * @return {FlowEditorContext} context
 * */
const useFlowEditorContext = () => useContext(FlowEditorContext);

export { FlowEditorContextProvider, useFlowEditorContext };
