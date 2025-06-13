import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';
import API from '../../services/api';
import styles from './Profile.module.css';

function Profile() {
    const user = useSelector((state) => state.user.user);
    const [myProducts, setMyProducts] = useState([]);

    useEffect(() => {
        const fetchMyProducts = async () => {
            try {
                const res = await API.get('/products/my/products');
                setMyProducts(res.data);
            } catch (err) {
                console.error('Məhsullar alınmadı:', err);
            }
        };

        fetchMyProducts();
    }, []);


    if (!user) return <p>Yüklənir...</p>;
    const handleDelete = async (id) => {
        if (!window.confirm('Silinsin?')) return;
        try {
            await API.delete(`/products/${id}`);
            setMyProducts((prev) => prev.filter((p) => p._id !== id));
        } catch (err) {
            alert('Silinmə zamanı xəta');
        }
    };


    return (
        <div className={styles.container}>
            <div className={styles.profileTop}>
                {user.profileImage && (
                    <img
                        src={`http://localhost:5555/uploads/${user.profileImage}`}
                        alt="Profil şəkli"
                        className={styles.profileImage}
                    />
                )}
                <div>
                    <h2>{user.username}</h2>
                    <p>{user.email}</p>
                    {user.birthday && <p>🎂 {new Date(user.birthday).toLocaleDateString()}</p>}
                    {user.gender && <p>🧍 {user.gender}</p>}
                    <Link to="/profile/edit" className={styles.editBtn}>Profili Dəyiş</Link>
                </div>
            </div>

            <hr />
            <h3>Mənim Məhsullarım</h3>
            {myProducts.length === 0 ? (
                <p>Məhsul yoxdur.</p>
            ) : (
                <div className={styles.productGrid}>
                    {myProducts.map((item) => (
                        <div key={item._id} className={styles.card}>
                            {item.image && (
                                <img
                                    src={`http://localhost:5555/uploads/${item.image}`}
                                    alt={item.title}
                                    className={styles.productImage}
                                />
                            )}
                            <p>{item.title}</p>
                            <Link to={`/edit-product/${item._id}`}>Redaktə</Link>
                            <button onClick={() => handleDelete(item._id)}>Sil</button>


                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Profile;
