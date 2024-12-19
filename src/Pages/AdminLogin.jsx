// import { useContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Admin.css';
// import { AuthContext } from '../Context/AuthContext';

// const AdminLogin = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const { setLoggedIn, setRole } = useContext(AuthContext);

//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError('');
//     if (email === 'admin' && password === 'admin') {
//       setLoggedIn(true);
//       setRole('admin');
//       localStorage.setItem('email', email);
//       localStorage.setItem('role', email);
//       navigate('/admin/dashboard');
//     } else {
//       setError('Invalid email or password!');
//     }
//   };

//   return (
//     <div className="admin-login">
//       <h2>Admin Login Here</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="inputGroup">
//           <label className="Enter"> Enter your Email</label>
//           <input
//             className="input"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Email"
//           />
//           <label> Enter your Password</label>
//           <input
//             className="input"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Password"
//             type="password"
//           />
//         </div>
//         <p className="admin-error">{error}</p>
//         <input className="button button-full" type="submit" />
//       </form>
//     </div>
//   );
// };

// export default AdminLogin;


import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Admin.css';
import { AuthContext } from '../Context/AuthContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setLoggedIn, setRole } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password,
      });

      const data = response.data;

      if (data.success && data.user.email === 'seller@seller.com') {
        setLoggedIn(true);
        setRole('admin');
        localStorage.setItem('email', data.user.email);
        localStorage.setItem('role', 'admin');
        navigate('/admin/dashboard');
      } else {
        setError(data.message || 'Invalid email or password!');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError(error.response?.data?.message || 'Error in login');
    }
  };

  return (
    <div className="admin-login">
      <h2>Admin Login Here</h2>
      <form onSubmit={handleSubmit}>
        <div className="inputGroup">
          <label className="Enter"> Enter your Email</label>
          <input
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <label> Enter your Password</label>
          <input
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
          />
        </div>
        <p className="admin-error">{error}</p>
        <input className="button button-full" type="submit" />
      </form>
    </div>
  );
};

export default AdminLogin;
