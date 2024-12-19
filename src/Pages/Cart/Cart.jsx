import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import './Cart.css';
import { ShopContext } from '../../Context/ShopContext';
import { AuthContext } from '../../Context/AuthContext';

const shippingCharge = 100;

const Cart = () => {
  const { cartItems, setCartItems, refetchCartItems } = useContext(ShopContext);
  const { role, user } = useContext(AuthContext);
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const navigate = useNavigate();

  let subTotal = 0;

  cartItems.forEach((item) => {
    subTotal += item.product.newPrice * item.qty;
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (role !== 'user') {
      toast.error('Please login as user to continue');
    } else {
      axios
        .post('http://localhost:4000/orders', {
          address,
          cartItems,
          paymentMethod,
          userId: user.id,
        })
        .then((res) => res.data)
        .then(async () => {
          for await (let cartItem of cartItems) {
            await axios.delete(
              `http://localhost:4000/cartItems/${cartItem.id}`,
            );
            await axios.patch(
              `http://localhost:4000/products/${cartItem.product.id}`,
              {
                quantity: cartItem.product.quantity - cartItem.qty,
              },
            );
          }
          toast.success('Order placed successfully');
          refetchCartItems();
          navigate('/order-success');
        })
        .catch((error) => {
          toast.error('Unable to place order, please try again!');
        });
    }
  };

  if (cartItems.length < 1) {
    return <h1>No items in cart</h1>;
  }

  return (
    <div className="cart">
      <div className="cart-items">
        {cartItems.map((item, index) => {
          const handleDelete = () => {
            const newCartItems = cartItems.filter((_, i) => i !== index);
            setCartItems(newCartItems);
            axios
              .delete('http://localhost:4000/cartItems/' + item.id)
              .then((res) => res.data)
              .then(() => {
                refetchCartItems();
              });
          };

          return (
            <div className="cart-item" key={index}>
              <div className="cart-item-delete" onClick={handleDelete}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="20"
                  height="20"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#F44336"
                    d="M21.5 4.5H26.501V43.5H21.5z"
                    transform="rotate(45.001 24 24)"
                  ></path>
                  <path
                    fill="#F44336"
                    d="M21.5 4.5H26.5V43.501H21.5z"
                    transform="rotate(135.008 24 24)"
                  ></path>
                </svg>
              </div>
              <div className="cart-product-item">
                <img
                  alt={item.product.name}
                  src={item.product.image}
                  className="cart-item-image"
                />
                <div>
                  <h3 className="cart-item-name">{item.product.name}</h3>
                  <p className="cart-item-price">Rs. {item.product.newPrice}</p>
                </div>
              </div>
              <div>
                <p>Qty: {item.qty}</p>
              </div>
              <div>
                <p>Rs. {item.product.newPrice * item.qty}</p>
              </div>
            </div>
          );
        })}

        <div className="cart-total">
          <p>
            Sub Total: <strong>Rs. {subTotal}</strong>
          </p>
          <p>
            Shipping Charge: <strong>Rs. {shippingCharge}</strong>
          </p>
          <p>
            Grand Total: <strong>Rs. {subTotal + shippingCharge}</strong>
          </p>
        </div>
        <div className="cart-order">
          <form onSubmit={handleSubmit}>
            <div className="cart-shipping-address">
              <p>Shipping Address</p>
              <textarea
                required
                value={address}
                className="input"
                placeholder="Shipping Address"
                onChange={(event) => setAddress(event.target.value)}
              />
            </div>
            <div className="cart-shipping-payment-method">
              <p>Payment Method</p>
              <label htmlFor="cod">Cash on delivery:</label>
              <input
                required
                id="cod"
                type="radio"
                name="paymentMethod"
                value={paymentMethod}
                onChange={(event) =>
                  setPaymentMethod(event.target.checked ? 'COD' : null)
                }
              />
            </div>
            <button className="button checkout-button">Confirm Order</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cart;
