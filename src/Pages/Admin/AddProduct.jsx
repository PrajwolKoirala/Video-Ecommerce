import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './AddProduct.css';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('New');
  const [oldPrice, setOldPrice] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [newPrice, setNewPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:4000/products/${id}`)
        .then((res) => res.data)
        .then((res) => {
          setName(res.name);
          setType(res.type);
          setQuantity(res.quantity);
          setOldPrice(res.oldPrice);
          setNewPrice(res.newPrice);
          setImage(res.image);
          setDescription(res.description);
        })
        .catch((error) => {
          setError(error);
        });
    }
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    if (id) {
      axios
        .patch(`http://localhost:4000/products/${id}`, {
          name,
          type,
          oldPrice,
          newPrice,
          image,
          quantity,
          description,
        })
        .then((res) => res.data)
        .then((res) => {
          setLoading(false);
          navigate('/admin/dashboard');
        });
    } else {
      axios
        .post('http://localhost:4000/products', {
          name,
          type,
          quantity,
          oldPrice,
          description,
          newPrice,
          image,
        })
        .then((res) => res.data)
        .then((res) => {
          setLoading(false);
          navigate('/admin/dashboard');
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }
  };

  const handleDelete = () => {
    const yes = window.confirm('Are you sure you want to delete this product?');
    if (yes) {
      axios
        .delete(`http://localhost:4000/products/${id}`)
        .then(() => {
          navigate('/admin/dashboard');
        })
        .catch((error) => {
          toast.error('Unable to delete product');
        });
    }
  };

  return (
    <div className="add-product">
      <h1>{id ? 'Update' : 'Add'} Product</h1>
      <form onSubmit={handleSubmit}>
        <label>Product Name</label>
        <input
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="input"
          placeholder="Enter name"
        />
        <label>Product Type</label>
        <select
          required
          className="select"
          onChange={(event) => setType(event.target.value)}
          value={type}
        >
          <option value="New">New</option>
          <option value="Popular">Popular</option>
          <option value="Skin Care">Skin Care</option>
          <option value="Makeup Product">Makeup Product</option>
        </select>
        <label>Product Description</label> <br />
        <textarea
          rows={5}
          className="textarea"
          onChange={(event) => setDescription(event.target.value)}
        >
          {description}
        </textarea>{' '}
        <br />
        <label>Quantity</label>
        <input
          required
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
          type="number"
          className="input"
          placeholder="Quantity"
        />
        <label>Old Price</label>
        <input
          required
          value={oldPrice}
          onChange={(event) => setOldPrice(event.target.value)}
          type="number"
          className="input"
          placeholder="Old Price"
        />
        <label>New Price</label>
        <input
          required
          value={newPrice}
          onChange={(event) => setNewPrice(event.target.value)}
          type="number"
          className="input"
          placeholder="New Price"
        />
        <label>Upload Image</label>
        <input
          className="input-file"
          type="file"
          accept="image/*"
          onChange={(event) => {
            const reader = new FileReader();
            if (event.target.files?.[0])
              reader.readAsDataURL(event.target?.files[0]);
            reader.onload = function () {
              setImage(reader.result);
            };
            reader.onerror = function (error) {
              alert('error uploading image');
            };
          }}
        />
        {image && (
          <img src={image} alt="" style={{ height: 200, width: 200 }} />
        )}
        {error && <p className="form-error">{error}</p>}
        <button className="button button-full">
          {loading ? 'Loading...' : id ? 'Update Product' : 'Add Product'}
        </button>
        {id && (
          <button
            type="button"
            className="delete-button"
            onClick={handleDelete}
          >
            Delete Product
          </button>
        )}
      </form>
    </div>
  );
};

export default AddProduct;
