import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './Orders.css';
import { AuthContext } from '../../Context/AuthContext';

const shippingCharge = 100;

const Orders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user?.id) {
      axios
        .get(`http://localhost:4000/orders?userId=${user.id}`)
        .then((res) => res.data)
        .then((res) => {
          setOrders(res);
        });
    }
  }, [user?.id]);

  return (
    <div className="orders">
      <h2>My Orders</h2>

      {orders.length === 0 && <h5>No orders found!</h5>}

      <div style={{ marginTop: 16 }}>
        {orders.map((order) => {
          let subTotal = 0;

          order.cartItems.forEach((item) => {
            subTotal += item.product.newPrice * item.qty;
          });

          return (
            <div className="cart-items" style={{ marginTop: 16 }}>
              {order.cartItems.map((item, index) => {
                return (
                  <div className="cart-item" key={index}>
                    <div className="cart-product-item">
                      <img
                        alt={item.product.name}
                        src={item.product.image}
                        className="cart-item-image"
                      />
                      <div>
                        <h3 className="cart-item-name">{item.product.name}</h3>
                        <p className="cart-item-price">
                          Rs. {item.product.newPrice}
                        </p>
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
                <p>
                  Payment Method: <strong>{order.paymentMethod}</strong>
                </p>
                <p>
                  Delivery Address: <strong>{order.address}</strong>
                </p>
                <p>
                  Estimated Delivery: <strong>4-6 business days</strong>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
