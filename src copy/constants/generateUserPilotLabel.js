const generateUserPilotLabel = (block, element, modifier) => {
  if (typeof element !== 'string' || typeof block !== 'string') {
    throw new Error('generateUserPilotLabel: block and element must be strings');
  }
  const elements = [block, element];
  if (modifier) {
    elements.push(modifier.toLowerCase().replace(/-|\s/g, '_'));
  }

  return elements.join('-');
};

const generateUserPilotAttribute = (block, element, modifier) => {
  return {
    'data-userpilot': generateUserPilotLabel(block, element, modifier),
  };
};

export { generateUserPilotLabel, generateUserPilotAttribute };
