import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Search = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const query = params.get("query");

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `http://makeup-api.herokuapp.com/api/v1/products.json?product_type=${query}`
                );
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        if (query) {
            fetchProducts();
        }
    }, [query]);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {products.length > 0 ? (
                        <ul>
                            {products.map((product: any) => (
                                <li key={product.id}>
                                    <h3>{product.name}</h3>
                                    <p>{product.brand}</p>
                                    <img
                                        src={product.image_link}
                                        alt={product.name}
                                    />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No products found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Search;
