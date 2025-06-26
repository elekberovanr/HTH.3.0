import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import styles from './ProductDetail.module.css';
import { useSelector } from 'react-redux';
import API, { addFavorite, removeFavorite, getFavorites } from '../../services/api';


const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [isFavorited, setIsFavorited] = useState(false);
  const user = useSelector(state => state.user.user);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
        setSelectedImage(res.data.images?.[0]);
      } catch (err) {
        console.error('Məhsul yüklənmədi:', err.message);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    const checkFavorite = async () => {
      if (!user) return;
      try {
        const favorites = await getFavorites();
        const exists = favorites.some(f => f.product?._id === id);
        setIsFavorited(exists);
      } catch (err) {
        console.error('Favorit yoxlanmadı:', err.message);
      }
    };
    checkFavorite();
  }, [id, user]);

  const handleFavorite = async () => {
    try {
      if (!user) return;
      if (isFavorited) {
        await removeFavorite(id);
        setIsFavorited(false);
      } else {
        await addFavorite(id);
        setIsFavorited(true);
      }
    } catch (err) {
      console.error('Favorit xətası:', err.message);
    }
  };

  if (!product) return <p>Yüklənir...</p>;

  return (
    <div className={styles.container}>
      <div className={styles.imagesSection}>
        <img
          src={`http://localhost:5555/uploads/${selectedImage}`}
          alt="Seçilmiş"
          className={styles.mainImage}
        />
        <div className={styles.thumbnails}>
          {product.images?.map((img, i) => (
            <img
              key={i}
              src={`http://localhost:5555/uploads/${img}`}
              alt=""
              className={styles.thumbnail}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
      </div>

      <div className={styles.infoSection}>
        <Link to={`/user/${product.user._id}`}>
          <div className={styles.owner}>
            {product.user?.profileImage ? (
              <img
                src={`http://localhost:5555/uploads/${product.user.profileImage}`}
                alt="Profil"
                className={styles.profileImage}
              />
            ) : (
              <div className={styles.profileImage}>❓</div>
            )}
            <span>{product.user?.name}</span>
          </div></Link>

        <h2 className={styles.title}>{product.title}</h2>
        <p className={styles.category}>Kateqoriya: {product.category?.name}</p>
        <p className={styles.description}>{product.description}</p>

        <div className={styles.actions}>
          <button className={styles.favBtn} onClick={handleFavorite}>
            {isFavorited ? <FaHeart color="red" /> : <FaRegHeart />}
          </button>
          <Link to={`/chat/${product.user?._id}`} className={styles.chatBtn}>
            Söhbət et 💬
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;