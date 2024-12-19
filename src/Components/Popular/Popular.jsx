import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './Popular.css';
import Item from '../Items/Item';
import Populara from './popback';

const Popular = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:4000/products')
      .then((res) => res.data)
      .then((res) => {
        setProducts(res);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  return (
    <div className="popular">
      <h1> POPULAR IN WOMEN </h1>
      <hr />
      <div className="popular-item">
        {products.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              type={item.type}
              image={item.image}
              newPrice={item.newPrice}
              oldPrice={item.oldPrice}
            />
          );
        })}
      </div>
      
    </div>
  );
};

export default Popular;


