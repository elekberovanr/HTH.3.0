import React, { useEffect, useState } from 'react';
import styles from './AdminPayments.module.css';
import API from '../../../services/api';

const AdminPayments = () => {
  const [donations, setDonations] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await API.get('/admin/payments');
        setDonations(res.data?.donations || []);
        setTotal(res.data?.total || 0);
      } catch (err) {
        console.error('Error fetching donations:', err);
        setDonations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className={styles.payments}>
      <h2 className={styles.title}>All Donations</h2>
      <div className={styles.total}>Total: €{total}</div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {donations.length > 0 ? (
            donations.map((d) => (
              <tr key={d._id}>
                <td>{d.user?.name || '—'}</td>
                <td>{d.user?.email || '—'}</td>
                <td>€{d.amount}</td>
                <td>{new Date(d.date).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>No donations found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPayments;
