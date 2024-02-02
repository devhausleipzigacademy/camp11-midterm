import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { createContext, useState } from 'react';
import axios from 'axios';

type Props = {
  children: React.ReactNode;
};

type ContextType = {
  userIsLoggedIn: boolean;
  setUserIsLoggedIn: Dispatch<SetStateAction<boolean>>;
};

export const checkAuthContext = createContext<ContextType>({
  userIsLoggedIn: false,
  setUserIsLoggedIn: () => {},
});

function CheckAuthProvider({ children }: Props) {
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:8000/checkAuth', { withCredentials: true })
      .then(res => {
        setUserIsLoggedIn(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  console.log(userIsLoggedIn);

  return (
    <>
      <checkAuthContext.Provider value={{ userIsLoggedIn, setUserIsLoggedIn }}>
        {children}
      </checkAuthContext.Provider>
    </>
  );
}

export default CheckAuthProvider;
