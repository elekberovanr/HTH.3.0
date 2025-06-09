import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} HTH – Hand To Hand</p>
    </footer>
  );
}

export default Footer;
