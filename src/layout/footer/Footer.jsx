import React from 'react';
import styles from './Footer.module.css';
import { FaFacebook, FaInstagram, FaTwitter, FaPinterest, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <h2 className={styles.logo}>HTH.</h2>
          <ul className={styles.links}>
            <li>Careers</li>
            <li>Consumer Care</li>
            <li>HTH News</li>
            <li>HTH Canada</li>
            <li>HTH Mexico</li>
            <li>Our Café</li>
            <li>Alumni</li>
          </ul>
          <div className={styles.socials}>
            <FaFacebook />
            <FaInstagram />
            <FaTwitter />
            <FaPinterest />
            <FaYoutube />
          </div>
        </div>

        <div className={styles.right}>
          <p className={styles.newsTitle}>Donate a tree for enviroment</p>
          <div className={styles.subscribe}>
            <input type="email" placeholder="Your email here" />
            <button>Donate</button>
          </div>
          <label className={styles.checkbox}>
            <input type="checkbox" />
            <span>By checking the box, you agree that you are at least 16 years of age.</span>
          </label>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>Website Terms | Privacy Policy | Accessibility Statement | Do Not Sell My Info</p>
        <p>© {new Date().getFullYear()} HTH – Hand To Hand</p>
      </div>
    </footer>
  );
};

export default Footer;
