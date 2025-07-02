import React, { useEffect, useState } from 'react';
import axios from '../../services/api';
import styles from './Profile.module.css';
import { useNavigate } from 'react-router';
import { BiUserCircle, BiEdit, BiCake, BiLocationPlus } from 'react-icons/bi';
import MyProducts from './myProducts/MyProducts';
import { CiLocationArrow1 } from 'react-icons/ci';
import { BsGenderAmbiguous } from 'react-icons/bs';


const Profile = () => {
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get('/auth/me');
                setProfile(res.data);
            } catch (err) {
                console.error('Xəta:', err);
            }
        };

        fetchProfile();
    }, []);

    if (!profile) return <p className={styles.loading}>Yüklənir...</p>;

    return (
        <div className={styles.profileWrapper}>
            <div className={styles.bannerWrapper}>
                {profile.bannerImage && (
                    <img
                        src={
                            profile.bannerImage
                                ? `http://localhost:5555/uploads/${profile.bannerImage}`
                                : '/banner-default.jpg'
                        }
                        alt="Banner"
                        className={styles.bannerImage}
                    />
                )}
            </div>

            <div className={styles.profileBox}>
                <div className={styles.avatarWrapper}>
                    {profile.profileImage ? (
                        <img
                            src={`http://localhost:5555/uploads/${profile.profileImage}`}
                            alt="Profile"
                            className={styles.avatar}
                        />
                    ) : (
                        <BiUserCircle className={styles.defaultIcon} />
                    )}
                </div>

                <div className={styles.info}>
                    <h2>{profile.name}</h2>
                    <p className={styles.email}>{profile.email}</p>

                    <div className={styles.meta}>
                        {profile.city && <p><CiLocationArrow1 className={styles.icon} /> {profile.city}</p>}
                        {profile.gender && <p><BsGenderAmbiguous className={styles.icon} /> {profile.gender}</p>}
                        {profile.birthday && <p><BiCake className={styles.icon} /> {new Date(profile.birthday).toLocaleDateString()}</p>}
                    </div>

                    <button className={styles.editBtn} onClick={() => navigate('/profile/edit')}>
                        <BiEdit /> Edit Profile
                    </button>
                </div>
            </div>

            <div className={styles.productsSection}>
                <MyProducts />
            </div>
        </div>

    );

};

export default Profile;
