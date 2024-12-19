import { useEffect, useState } from 'react';
import './Dashboard.css';
import Item from '../../Components/Items/Item';
import AdminHeader from './AdminHeader';

const AdminDashboard = () => {
  const [loading, setLoading] = useState('');
  const [error, setError] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:4000/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Error fetching data');
        setLoading(false);
      });
  }, []);

  return (
    <div className="admin-dashboard">
      <AdminHeader />

      <div className="products">
        {products.map((item, i) => {
          return (
            <Item
              isEdit
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

export default AdminDashboard;
