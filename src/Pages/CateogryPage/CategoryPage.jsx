import React, { useEffect, useState } from 'react';
import './CategoryPage.css';
import axios from 'axios';
import Item from '../../Components/Items/Item';

const CategoryPage = ({ slug }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/products?type=${slug}`)
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [slug]);

  return (
    <div className="new-page">
      <img className="banner" src={`/${slug}.png`} alt="" />
      <h2>{slug} Products</h2>

      <div className="products">
        {products.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              type={item.type}
              name={item.name}
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

export default CategoryPage;
