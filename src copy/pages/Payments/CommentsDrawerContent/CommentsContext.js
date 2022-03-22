import React, { createContext, useContext, useMemo, useState } from 'react';

const initCommentsData = {};
const initNewCommentsCount = 0;

const Context = createContext({
  commentsData: initCommentsData,
  newCommentsCount: initNewCommentsCount,
  setCommentsData: () => {},
  setNewCommentsCount: () => {},
});

const CommentsProvider = ({ children }) => {
  const [commentsData, setCommentsData] = useState(initCommentsData);
  const [newCommentsCount, setNewCommentsCount] = useState(initNewCommentsCount);

  const commentsValue = useMemo(() => ({ commentsData, setCommentsData, newCommentsCount, setNewCommentsCount }), [
    commentsData,
    newCommentsCount,
  ]);

  return <Context.Provider value={commentsValue}>{children}</Context.Provider>;
};

const useCommentsContext = () => useContext(Context);

export { CommentsProvider, useCommentsContext };
