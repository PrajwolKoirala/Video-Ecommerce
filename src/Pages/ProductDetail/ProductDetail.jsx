import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import './ProductDetail.css';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ShopContext } from '../../Context/ShopContext';
import { AuthContext } from '../../Context/AuthContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const { refetchCartItems } = useContext(ShopContext);
  const { role, user } = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:4000/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (!user || role !== 'user') {
      toast.error('Please login as user to add to cart!');
    } else {
      axios
        .post('http://localhost:4000/cartItems', {
          qty,
          product,
          userId: user.id,
        })
        .then((res) => res.data)
        .then(() => {
          refetchCartItems();
          toast.success('🛒 Added to cart!');
        })
        .catch((error) => {
          toast.error('Unable to add to cart!');
        });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error fetching product detail...</div>;
  } else if (product) {
    return (
      <div className="product-detail">
        <img src={product.image} alt={product.name} />
        <div className="product-info">
          <h2 className="product-name">{product.name}</h2>
          <p className="product-description">{product.description}</p>
          <div className="product-type">
            <p>Type:</p>
            <p className="product-type-value">{product.type}</p>
          </div>
          <div className="product-price">
            <p className="old-price">Rs. {product.oldPrice}</p>
            <p className="new-price">Rs. {product.newPrice}</p>
          </div>
          <p className="product-qty-label">Select Quantity:</p>
          <input
            min={1}
            max={product.quantity}
            value={qty}
            onChange={(event) => setQty(event.target.value)}
            type="number"
            placeholder="Quantity"
            className="product-qty input"
          />
          {product.quantity === 0 && (
            <p className="out-of-stock">Out of stock!</p>
          )}
          {product.quantity <= 5 && (
            <p
              className="out-of-stock"
              style={{ color: 'orange', fontWeight: 'semibold' }}
            >
              Only {product.quantity} left!, Hurry up!!!
            </p>
          )}

          <button
            className="button product-cart-button"
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
        </div>
      </div>
    );
  }
};

export default ProductDetail;
