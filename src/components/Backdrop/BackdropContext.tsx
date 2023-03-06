import React, {
  ReactNode,
  useMemo,
  createContext,
  useState,
  useContext,
} from 'react';
import { Backdrop } from './Backdrop';

type BackdropContextType = {
  backdrop: boolean;
  setBackdrop: (value: boolean) => void;
};

const BackdropContext = createContext<BackdropContextType>({
  backdrop: false,
  setBackdrop: () => {},
});

interface BackdropProviderProps {
  children: ReactNode;
}

const BackdropProvider = (props: BackdropProviderProps) => {
  const [backdrop, setBackdrop] = useState(false);

  const value = useMemo(
    () => ({
      backdrop,
      setBackdrop,
    }),
    [backdrop],
  );

  return (
    <div>
      <BackdropContext.Provider value={value}>
        <Backdrop open={backdrop} />
        {props.children}
      </BackdropContext.Provider>
    </div>
  );
};

export { BackdropProvider };

export const useBackdrop = () => useContext(BackdropContext);
