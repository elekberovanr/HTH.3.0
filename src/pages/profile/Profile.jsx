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
        <div className={styles.container}>
            {/* Profil bölməsi */}
            <div className={styles.profileTop}>
                <div className={styles.profileImage}>
                    {profile.profileImage ? (
                        <img src={`http://localhost:5555/uploads/${profile.profileImage}`} alt="Profile" />
                    ) : (
                        <BiUserCircle className={styles.defaultIcon} />
                    )}
                </div>

                <div className={styles.profileInfo}>
                    <h2>{profile.name}</h2>
                    <p className={styles.email}>{profile.email}</p>

                    <div className={styles.meta}>
                        <p><strong><BiLocationPlus/></strong> {profile.city}</p>
                        <p><strong><BsGenderAmbiguous/></strong> {profile.gender}</p>
                        <p><strong><BiCake/></strong> {new Date(profile.birthday).toLocaleDateString()}</p>
                    </div>

                    <button className={styles.editBtn} onClick={() => navigate('/profile/edit')}>
                        <BiEdit /> Edit Profile
                    </button>
                </div>

            </div>
            <MyProducts />
        </div>
    );
};

export default Profile;
