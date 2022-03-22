const ContentLoading = ({ loading, data, children }) => {
  if (loading || !data) return null;
  return children(data);
};

export default ContentLoading;
