import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../../components/product/ProductCard';

const SearchResults = () => {
    const allProducts = useSelector(state => state.products.items);
    const searchTerm = useSelector(state => state.filters.searchTerm);
    const selectedCategory = useSelector(state => state.filters.selectedCategory);


    if (!allProducts || !Array.isArray(allProducts)) {
        return <p>Products are not available</p>;
    }

    const filtered = allProducts.filter(product => {
        const matchesCategory = selectedCategory
            ? product.category?.name?.toLowerCase() === selectedCategory.toLowerCase()
            : true;

        const matchesSearch = searchTerm
            ? product.title?.toLowerCase().includes(searchTerm.toLowerCase())
            : true;

        return matchesCategory && matchesSearch;
    });

    return (
        <div style={{ padding: '1rem' }}>
            <h2>Search Results</h2>
            {filtered.length === 0 ? (
                <p>No results found</p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                    {filtered.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchResults;
