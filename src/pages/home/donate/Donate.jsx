import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Donate.module.css';
import { FaLeaf, FaTree } from 'react-icons/fa';

const Donate = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.section}>
      <div className={styles.overlay}>
        <div className={styles.iconFloating}><FaLeaf /></div>
        <div className={styles.iconFloating2}><FaTree /></div>

        <div className={styles.content}>
          <h2 className={styles.title}>Plant a Tree. Grow a Future.</h2>
          <p className={styles.text}>
            Every tree you plant is a gift to future generations. Let’s make the Earth greener together.
          </p>
          <button className={styles.button} onClick={() => navigate('/donation')}>
            Start Planting
          </button>
        </div>
      </div>
    </section>
  );
};

export default Donate;
