import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext(null);

const AuthContextProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (email) {
      axios
        .get(`http://localhost:4000/users?email=${email}`)
        .then((res) => {
          setUser(res.data[0]);
          setLoggedIn(true);
          setRole(res.data[0].role);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, loggedIn, setLoggedIn, role, setRole }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
