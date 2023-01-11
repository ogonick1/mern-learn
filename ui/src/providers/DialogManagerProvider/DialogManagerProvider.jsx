import {
  createContext,
  useCallback,
  useMemo,
  useState,
} from 'react';

const DialogManagerContext = createContext(
  {},
);

const DialogManagerProvider = ({ children }) => {
  const [dialogs, setDialogs] = useState([]);

  const openDialog = useCallback((Component) => {
    const newDialog = {
      Component,
      key: Date.now(),
      closeDialog: () => {
        setDialogs((prevDialogs) => prevDialogs.filter((item) => item !== newDialog));
      },
    };

    setDialogs([...dialogs, newDialog]);
  }, [dialogs, setDialogs]);

  const value = useMemo(() => {
    return { openDialog };
  }, [openDialog]);

  return (
    <DialogManagerContext.Provider value={value}>
      {dialogs.map(({ Component, closeDialog, key }) => (
        <Component
          key={key}
          closeDialog={closeDialog}
        />
      ))}
      {children}
    </DialogManagerContext.Provider>
  );
};

export {
  DialogManagerProvider,
  DialogManagerContext,
};
