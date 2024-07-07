import React, { ReactNode, useState } from "react";
import Logincontext from "./Context";

interface LoginContextProviderProps {
  children: ReactNode;
}

const ContextProvider: React.FC<LoginContextProviderProps> = ({ children }) => {
  const [open, setopen] = useState(true);
  return (
    <Logincontext.Provider value={{ open, setopen }}>
      {children}
    </Logincontext.Provider>
  );
};

export default ContextProvider;
