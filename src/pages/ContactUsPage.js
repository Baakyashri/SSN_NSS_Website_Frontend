import React, { useState } from 'react';
import './ContactUsPage.css';
import MainLayout from './MainLayout';

const ContactUsPage = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        'https://nss-website-backend.onrender.com/api/contact',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("Message sent successfully");
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus(result.error || 'Failed to send message.');
      }
    } catch (error) {
      setStatus('Error connecting to server.');
    }
  };

  return (
    <MainLayout>

      <div className="contact-container">
        <div className="contact-card">
          <h1>📬 Get in Touch with NSS</h1>
          <p className="contact-subtext">
            Have a question, suggestion, or want to collaborate with us? Fill out the form or reach us directly!
          </p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              name="name"
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              name="email"
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <textarea
              name="message"
              placeholder="Your Message"
              rows="6"
              value={formData.message}
              onChange={handleChange}
              required
            />

            <button type="submit">Send Message</button>
          </form>

          {status && <p className="status-message">{status}</p>}

          <div className="contact-details">
            <p><strong>Email:</strong> nss@ssn.edu.in</p>
            <p><strong>Phone:</strong> +91 98765 43210</p>
            <p><strong>Location:</strong> SSN College of Engineering, Kalavakkam – 603110</p>
          </div>

<div className="floating-social">

<a href="https://www.youtube.com/@nssofssn" target="_blank" rel="noreferrer">
<img src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" alt="YouTube"/>
</a>

<a href="https://instagram.com/nssofssn" target="_blank" rel="noreferrer">
<img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram"/>
</a>

<a href="https://www.facebook.com/nssofssn" target="_blank" rel="noreferrer">
<img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook"/>
</a>

<a href="https://x.com/SSNNSS579516641" target="_blank" rel="noreferrer">
<img src="https://cdn-icons-png.flaticon.com/512/5968/5968958.png" alt="Twitter"/>
</a>

<a href="https://www.linkedin.com/company/nssssn/" target="_blank" rel="noreferrer">
<img src="https://cdn-icons-png.flaticon.com/512/3536/3536505.png" alt="LinkedIn"/>
</a>

</div>
        </div>
      </div>

    </MainLayout>
  );
};

export default ContactUsPage;
