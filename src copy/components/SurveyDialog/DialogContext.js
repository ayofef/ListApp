import { createContext, useContext } from 'react';

const DialogContext = createContext({ handleClose: () => {} });

const DialogContextProvider = DialogContext.Provider;
const useDialogContext = () => useContext(DialogContext);

export { DialogContextProvider, useDialogContext };
