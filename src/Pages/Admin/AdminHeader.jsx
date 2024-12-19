import { Link } from 'react-router-dom';

const AdminHeader = () => {
  return (
    <div className="admin-header">
      <div>
        <h1>Admin Dashboard</h1>
        <p>Welcome to the admin dashboard</p>
      </div>

      <div>
        <Link style={{ marginRight: 10 }} className="button" to="/admin/orders">
          View Orders
        </Link>

        <Link className="button" to="/admin/add-product">
          Add Product
        </Link>
      </div>
    </div>
  );
};

export default AdminHeader;
