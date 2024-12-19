import React from 'react';
import './Contactus.css'; 

const ContactUs = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    
  };

  return (
    <div className="contact-container">
      <div className="overlay"></div>
      <div className="form-container">
        <h2>Contact Us</h2>
        <div className="form-containersss">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="4" required></textarea>
          </div>
          <button type="submit">Send</button>
          
        </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
