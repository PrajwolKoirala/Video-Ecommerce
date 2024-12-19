// import { toast } from 'react-toastify';
// import React, { useContext } from 'react';
// import axios from 'axios';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import './LoginSignup.css';
// import { AuthContext } from '../Context/AuthContext';
// const LoginSignup = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const { setLoggedIn, setRole, setUser } = useContext(AuthContext);

//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios
//       .get(`http://localhost:4000/users?email=${email}`)
//       .then((res) => res.data)
//       .then((res) => {
//         if (res.length === 0) {
//           toast.error('User does not exist');
//         } else {
//           if (res[0].password === password) {
//             toast.success('Login successful');
//             setLoggedIn(true);
//             setUser(res[0]);
//             setRole(res[0].role);
//             localStorage.setItem('email', email);
//             localStorage.setItem('role', res[0].role);
//             navigate('/');
//           } else {
//             toast.error('Incorrect password');
//           }
//         }
//       })
//       .catch((error) => {
//         toast('Error in login');
//       });
//   };

//   return (
//     <div className="LoginSignup">
//       <h2>Login Here</h2>
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
//         <div className="submitted">
//           <input className="button button-full" type="submit" />

//           <p>
//             Don't have an account ?{' '}
//             <Link style={{ textDecoration: 'none' }} to="/signup">
//               {' '}
//               Sign Up{' '}
//             </Link>
//           </p>
//         </div>
//         <Link style={{ textDecoration: 'none' }} to="/admin-login">
//           Login as Admin
//         </Link>
//       </form>
//     </div>
//   );
// };

// export default LoginSignup;

import { toast } from 'react-toastify';
import React, { useContext } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './LoginSignup.css';
import { AuthContext } from '../Context/AuthContext';

const LoginSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setLoggedIn, setRole, setUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password,
      });

      const data = response.data;
      console.log("🚀 ~ file: LoginPage.jsx:110 ~ handleSubmit ~ data:", data);
      console.log("🚀 ~ file: LoginPage.jsx:110 ~ handleSubmit ~ data:", data.data.email);

      if (data) {
        toast.success('Login successful');
        setLoggedIn(true);
        setUser(data.name);
        setRole(data.role);
        localStorage.setItem('email', data.data.email);
        localStorage.setItem('role', data.data.role);
        navigate('/');
      } else {
        toast.error(data.message || 'Login failed');
        console.log("🚀 ~ file: LoginPage.jsx:122 ~ handleSubmit ~ data.message :", data.message );
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error(error.response?.data?.message || 'Error in login');
    }
  };

  return (
    <div className="LoginSignup">
      <h2>Login Here</h2>
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
        <div className="submitted">
          <input className="button button-full" type="submit" />

          <p>
            Don't have an account ?{' '}
            <Link style={{ textDecoration: 'none' }} to="/signup">
              {' '}
              Sign Up{' '}
            </Link>
          </p>
        </div>
        <Link style={{ textDecoration: 'none' }} to="/admin-login">
          Login as Admin
        </Link>
      </form>
    </div>
  );
};

export default LoginSignup;
