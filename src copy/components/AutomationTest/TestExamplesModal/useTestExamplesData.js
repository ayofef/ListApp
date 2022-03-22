import { useMemo, useState } from 'react';
import { useCurrentTestStep } from '../../FlowEditor/components/Node/hooks/useCurrentTestStep';
import { useFlowEditorContext } from '../../FlowEditor/context';

export const useTestExamplesData = () => {
  const { testExamples, currentTestStepId } = useFlowEditorContext();
  const [selectValue, setSelectValue] = useState(null);
  const { currentTestStep } = useCurrentTestStep({ stepId: currentTestStepId });

  const examples = useMemo(() => {
    return testExamples?.map(({ asInput, described, description }) => ({
      ...described?.reduce(
        (acc, { key, ...rest }) => ({
          ...acc,
          [key]: rest,
        }),
        {}
      ),
      asInput,
      description,
    }));
  }, [testExamples]);

  const examplesOptions = useMemo(() => {
    return examples?.map((example, index) => {
      return {
        value: String(index),
        title: example.description,
      };
    });
  }, [examples]);

  const exampleDataType = useMemo(() => {
    return currentTestStep?.dataType || currentTestStep?.searchForType || currentTestStep?.__typename;
  }, [currentTestStep?.dataType, currentTestStep?.searchForType, currentTestStep?.__typename]);

  return {
    examples,
    examplesOptions,
    selectValue,
    setSelectValue,
    exampleDataType,
  };
};
