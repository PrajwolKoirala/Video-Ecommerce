import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const ShopContext = createContext(null);
const ShopContextProvider = (props) => {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);

  const refetchCartItems = () => {
    if (user?.id) {
      axios
        .get(`http://localhost:4000/cartItems?userId=${user.id}`)
        .then((res) => res.data)
        .then((res) => {
          setCartItems(res);
        })
        .catch((error) => {});
    }
  };

  useEffect(() => {
    refetchCartItems();
  }, [user]);

  return (
    <ShopContext.Provider value={{ cartItems, setCartItems, refetchCartItems }}>
      {props.children}
    </ShopContext.Provider>
  );
};
export default ShopContextProvider;
