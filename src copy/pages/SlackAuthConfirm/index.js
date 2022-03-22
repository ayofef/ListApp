import useCodeToSlackAuth from '../../hooks/useCodeToSlackAuth';

const SlackAuthConfirm = () => {
  useCodeToSlackAuth();
  // TODO: should render any Spinner or Skeleton... Errors
  return null;
};

export default SlackAuthConfirm;
