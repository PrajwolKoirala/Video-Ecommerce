import { Link } from 'react-router-dom';
import './OrderSuccess.css';

const OrderSuccess = () => {
  return (
    <div className="order-success">
      <img
        alt="order success"
        className="success-image"
        src="/order-success.jpeg"
      />
      <h2>Your order has been placed successfully!</h2>
      <Link to="/">
        <button className="button">Go To Home</button>
      </Link>
      <Link to="/orders" style={{ marginTop: 20 }}>
        <button className="button">View Orders</button>
      </Link>
    </div>
  );
};

export default OrderSuccess;
