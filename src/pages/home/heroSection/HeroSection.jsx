import React, { useEffect, useState } from 'react';
import styles from './HeroSection.module.css';
import img1 from '../../../assets/eco1.jpg';
import img2 from '../../../assets/eco2.jpg';
import img3 from '../../../assets/eco3.jpg';
import img4 from '../../../assets/eco4.jpg';
import SearchAndCategories from '../searchAndCategories/SearchAndCategories';
import SearchBar from '../../../components/search/SearchBar'

const images = [img1, img2, img3, img4];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.carousel}>
        {images.map((img, i) => (
          <div
            key={i}
            className={`${styles.slide} ${i === current ? styles.active : ''}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
      </div>

      <div className={styles.overlay}>
        <h1 className={styles.title}>Give Items a Second Life</h1>
        <p className={styles.subtitle}>Reduce waste, save money — swap what you no longer use.</p>
        <div className={styles.searchBox}>
          <SearchBar />
        </div>
      </div>

      <div className={styles.indicators}>
        {images.map((_, i) => (
          <span
            key={i}
            className={`${styles.dot} ${i === current ? styles.activeDot : ''}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
