import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, deleteProduct } from '../../redux/reducers/productSlice';
import { Link } from 'react-router';
import styles from './Profile.module.css';

function Profile() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const products = useSelector((state) => state.products.items);
    const myProducts = products.filter(p => p.user?._id === user?._id);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm('Silmək istədiyinizə əminsiniz?')) {
            dispatch(deleteProduct(id));
        }
    };

    if (!user) return <p>Yüklənir...</p>;

    return (
        <div className={styles.container}>
            <div className={styles.profileInfo}>
                <h2>Profil</h2>
                {user.profileImage && (
                    <img
                        className={styles.profileImage}
                        src={`http://localhost:5555/uploads/${user.profileImage}`}
                        alt="Profil"
                    />
                )}
                <p><strong>Ad:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Gender:</strong> {user.gender}</p>
                <p><strong>Birthday:</strong> {user.birthday?.slice(0, 10)}</p>
                <p><strong>Style Preference:</strong> {user.stylePreference}</p>
                <Link to="/profile/edit">Profili redaktə et</Link>
            </div>

            {myProducts.map(product => (
                <div key={product._id}>
                    {product.image && (
                        <img
                            src={`http://localhost:5555/uploads/${product.image}`}
                            alt={product.title}
                            style={{ width: '150px', borderRadius: '8px' }}
                        />
                    )}
                    <h4>{product.title}</h4>
                    <button onClick={() => handleDelete(product._id)}>Sil</button>
                    <Link to={`/profile/edit/${product._id}`}>Redaktə et</Link>
                </div>
            ))}

        </div>
    );
}

export default Profile;
