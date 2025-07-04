import React, { useEffect, useRef, useState } from 'react';
import API from '../../../services/api';
import styles from './WhatsNew.module.css';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import ProductCard from '../../../components/product/ProductCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const WhatsNew = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const scrollContainerRef = useRef(null);

    const fetchLatest = async () => {
        try {
            const res = await API.get('/products/latest');
            setProducts(res.data);
        } catch (err) {
            console.error('Latest products could not be loaded:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLatest();
    }, []);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft -= 300;
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft += 300;
        }
    };
    {
        !loading && products.length === 0 && (
            <p className={styles.empty}>Yeni məhsul yoxdur</p>
        )
    }


    return (
        <section className={styles.section}>
            <h2 className={styles.heading}>What's New</h2>
            {loading ? (
                <div className={styles.spinnerWrapper}>
                    <LoadingSpinner />
                </div>
            ) : (
                <div className={styles.wrapper}>
                    <button className={`${styles.arrow} ${styles['arrow-left']}`} onClick={scrollLeft}>
                        <FaChevronLeft />
                    </button>

                    <div className={styles.scrollContainer} ref={scrollContainerRef}>
                        {products.map((product) => (
                            <div className={styles.cardWrapper} key={product._id}>
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>

                    <button className={`${styles.arrow} ${styles['arrow-right']}`} onClick={scrollRight}>
                        <FaChevronRight />
                    </button>
                </div>
            )}
        </section>
    );
};

export default WhatsNew;
