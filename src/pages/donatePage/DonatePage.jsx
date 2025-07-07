import React, { useState } from 'react';
import styles from './DonatePage.module.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from '../../services/api';

const DonatePage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
    amount: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.amount || isNaN(form.amount)) {
      toast.error('Please enter a valid amount.');
      return;
    }

    try {
      setLoading(true);
      await API.post('/donations', {
        amount: Number(form.amount),
        message: form.message,
        method: 'card',
      });

      toast.success('Thank you for your donation!');
      setForm({
        name: '',
        email: '',
        cardNumber: '',
        expiry: '',
        cvc: '',
        amount: '',
        message: '',
      });
    } catch (err) {
      toast.error('Donation failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.donateContainer}>
      <ToastContainer />
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Your Donation</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <input
          type="text"
          name="cardNumber"
          placeholder="Credit Card Number"
          value={form.cardNumber}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <div className={styles.cardRow}>
          <input
            type="text"
            name="expiry"
            placeholder="MM/YY"
            value={form.expiry}
            onChange={handleChange}
            className={styles.inputSmall}
            required
          />
          <input
            type="text"
            name="cvc"
            placeholder="CVC"
            value={form.cvc}
            onChange={handleChange}
            className={styles.inputSmall}
            required
          />
        </div>
        <input
          type="number"
          name="amount"
          placeholder="Amount (€)"
          value={form.amount}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <textarea
          name="message"
          placeholder="Message (optional)"
          value={form.message}
          onChange={handleChange}
          className={styles.textarea}
        />

        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? 'Processing...' : 'PAY NOW'}
        </button>

        <div className={styles.cardLogos}>
          <img src="/visa.png" alt="Visa" />
          <img src="/mastercard.jpeg" alt="MasterCard" />
        </div>
      </form>

      <div className={styles.summary}>
        <h3>TO PAY</h3>
        <p className={styles.amount}>€{form.amount || '0.00'}</p>
        <p className={styles.note}>Fake donation for demo purposes.</p>
      </div>
    </div>
  );
};

export default DonatePage;
