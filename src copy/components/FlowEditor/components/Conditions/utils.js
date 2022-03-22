export const deleteCondition = ({ elements, edgeId, stepId, targetId }) => {
  return elements
    .filter((element) => element.id !== edgeId)
    .map((element) => {
      if (element.id !== stepId) {
        return element;
      }
      const elseStepId = targetId === element?.data?.elseStepId ? null : element?.data?.elseStepId;
      const conditions = element?.data?.conditions?.filter((c) => c?.nextStepId !== targetId);
      return { ...element, data: { ...element.data, elseStepId, conditions } };
    });
};
