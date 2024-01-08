/*
 * Copyright 2023 Uppsala University Library
 *
 * This file is part of DiVA Client.
 *
 *     DiVA Client is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     DiVA Client is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 */

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
    [backdrop, setBackdrop],
  );

  return (
    <BackdropContext.Provider value={value}>
      <Backdrop open={backdrop} />
      {props.children}
    </BackdropContext.Provider>
  );
};

export { BackdropProvider };

export const useBackdrop = () => useContext(BackdropContext);
