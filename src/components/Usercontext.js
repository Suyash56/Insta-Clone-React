import React, { useState } from "react";
import { createContext } from "react";

export const Usercontext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState(null);
  const [SignUp, setSignUp] = useState(false);
  return (
    <Usercontext.Provider
      value={{ user: [user, setUser], SignUp: [SignUp, setSignUp] }}
    >
      {props.children}
    </Usercontext.Provider>
  );
};
