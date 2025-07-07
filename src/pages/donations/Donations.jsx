import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import styles from './Donations.module.css';
import { FaDonate } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';

const Donations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await API.get('/donations/my');
        setDonations(res.data);
      } catch (err) {
        console.error('Failed to fetch donations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  if (loading) {
    return <p className={styles.loading}>Loading donations...</p>;
  }

  if (donations.length === 0) {
    return <p className={styles.empty}>You haven't donated yet.</p>;
  }

  return (
    <div className={styles.donationList}>
      {donations.map((donation) => (
        <div key={donation._id} className={styles.donationCard}>
          <FaDonate className={styles.icon} />
          <div className={styles.info}>
            <h4>Amount: €{donation.amount}</h4>
            {donation.message && <p>Note: {donation.message}</p>}
            <small>{formatDistanceToNow(new Date(donation.date))} ago</small>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Donations;
