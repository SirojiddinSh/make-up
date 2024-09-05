import React, { useState, useEffect } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { toggleLike as toggleLike2 } from "../../redux/slices/liked-slice";
import { addToCart } from "../../redux/slices/cart-slice";
import "aos/dist/aos.css";

const Dynamic: React.FC = () => {
    const product = JSON.parse(localStorage.getItem("product") || "{}");
    const [likedProducts, setLikedProducts] = useState<any[]>([]);
    const [cartProducts, setCartProducts] = useState<any[]>([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const savedLikedProducts = localStorage.getItem("likedProducts");
        if (savedLikedProducts) {
            setLikedProducts(JSON.parse(savedLikedProducts));
        }
        const savedCartProducts = localStorage.getItem("cartProducts");
        if (savedCartProducts) {
            setCartProducts(JSON.parse(savedCartProducts));
        }
    }, []);

    const isLiked = (product: any) =>
        likedProducts.some((likedProduct) => likedProduct.id === product.id);

    const toggleLike = (product: any) => {
        dispatch(toggleLike2(product));
        let updatedLikedProducts;
        if (isLiked(product)) {
            updatedLikedProducts = likedProducts.filter(
                (likedProduct) => likedProduct.id !== product.id
            );
        } else {
            updatedLikedProducts = [...likedProducts, product];
        }
        setLikedProducts(updatedLikedProducts);
        localStorage.setItem(
            "likedProducts",
            JSON.stringify(updatedLikedProducts)
        );
    };

    const isAddedToCart = (product: any) =>
        cartProducts.some((cartProduct) => cartProduct.id === product.id);

    const handleAddToCart = (product: any) => {
        dispatch(addToCart(product));
        const updatedCartProducts = [...cartProducts, product];
        setCartProducts(updatedCartProducts);
        localStorage.setItem(
            "cartProducts",
            JSON.stringify(updatedCartProducts)
        );
    };

    return (
        <div className="flex max-w-6xl mx-auto p-5 gap-10">
            <div className="w-1/2" data-aos="fade-right">
                <img
                    src={product.api_featured_image}
                    alt={product.name}
                    className="w-full rounded-lg"
                />
            </div>
            <div
                className="w-1/2 flex flex-col justify-center"
                data-aos="fade-left"
            >
                <h1 className="text-4xl mb-5">{product.name}</h1>
                <p className="text-xl mb-3">{product.brand}</p>
                <p className="text-xl mb-3">
                    {product.price} {product.price_sign}
                </p>
                <p className="text-lg leading-relaxed">{product.description}</p>

                <div className="flex gap-4 mt-5">
                    <button className="text-red-500">
                        {isLiked(product) ? (
                            <AiFillHeart
                                style={{ fontSize: "30px", cursor: "pointer" }}
                                onClick={() => toggleLike(product)}
                            />
                        ) : (
                            <AiOutlineHeart
                                style={{ fontSize: "30px", cursor: "pointer" }}
                                onClick={() => toggleLike(product)}
                            />
                        )}
                    </button>
                    <button
                        className={`px-4 py-2 text-white rounded-lg transition-transform transform active:scale-95 ${
                            isAddedToCart(product)
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500"
                        }`}
                        onClick={() => {
                            if (!isAddedToCart(product)) {
                                handleAddToCart(product);
                            }
                        }}
                    >
                        {isAddedToCart(product)
                            ? "Added to Cart"
                            : "Add to Cart"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dynamic;
