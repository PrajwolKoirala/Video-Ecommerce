import React, { useEffect, useState } from 'react';
import new_collection from '../Assets/new_collections';
import Item from '../Items/Item';
import axios from 'axios';
import './NewCollection.css';

const NewCollections = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:4000/products?type=New')
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
    <div className="new-collections">
      <h1>New Collection</h1>
      <div className="collections">
        {products.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              type={item.type}
              newPrice={item.newPrice}
              oldPrice={item.oldPrice}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NewCollections;
