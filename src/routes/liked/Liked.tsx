import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Product } from "../../types/dataTypes";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggleLike as toggleLikeAction } from "../../redux/slices/liked-slice";
import { addToCart } from "../../redux/slices/cart-slice";
import "aos/dist/aos.css";

const Liked = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [likedProducts, setLikedProducts] = useState<Product[]>([]);
    const [cartProducts, setCartProducts] = useState<Product[]>([]);

    useEffect(() => {
        const savedLikedProducts = localStorage.getItem("likedProducts");
        const savedCartProducts = localStorage.getItem("cartProducts");
        if (savedLikedProducts) {
            setLikedProducts(JSON.parse(savedLikedProducts));
        }
        if (savedCartProducts) {
            setCartProducts(JSON.parse(savedCartProducts));
        }
    }, []);

    const moveToSingle = (product: Product) => {
        localStorage.setItem("product", JSON.stringify(product));
        navigate(`/single/${product.id}`);
        window.scrollTo(0, 0);
    };

    const isLiked = (product: Product) =>
        likedProducts.some((likedProduct) => likedProduct.id === product.id);

    const toggleLike = (product: Product) => {
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

        dispatch(toggleLikeAction(product));
    };

    const isAddedToCart = (product: Product) =>
        cartProducts.some((cartProduct) => cartProduct.id === product.id);

    const handleAddToCart = (product: Product) => {
        dispatch(addToCart(product));
        const updatedCartProducts = [...cartProducts, product];
        setCartProducts(updatedCartProducts);
        localStorage.setItem(
            "cartProducts",
            JSON.stringify(updatedCartProducts)
        );
    };

    return (
        <div className="max-w-[1400px] mx-auto flex flex-wrap gap-10 mt-[50px]">
            {likedProducts?.map((product) => (
                <div className="relative group" key={product.id}>
                    <div
                        className="w-[300px] min-h-[400px] bg-white rounded-[10px] mb-[20px] flex flex-col items-center shadow-lg p-[20px]"
                        data-aos="fade-up"
                        data-aos-anchor-placement="top-bottom"
                    >
                        <div className="flex items-center justify-center w-[250px] h-[300px]">
                            <img
                                src={product.api_featured_image}
                                alt=""
                                width={200}
                            />
                        </div>
                        <div className="w-full h-[120px] flex flex-col gap-1">
                            <h3>{product.name}</h3>
                            <p>
                                {product.price}
                                {product.price_sign}
                            </p>
                            <p>{product.brand}</p>
                        </div>
                    </div>
                    <div
                        onClick={(e) => {
                            if (
                                e.target instanceof HTMLElement &&
                                !e.target.closest("button")
                            ) {
                                moveToSingle(product);
                            }
                        }}
                        className="absolute cursor-pointer h-[460px] rounded-lg inset-0 bg-black bg-opacity-20 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <div className="flex gap-4">
                            <button className="text-white flex items-center">
                                {isLiked(product) ? (
                                    <AiFillHeart
                                        style={{
                                            color: "red",
                                            fontSize: "30px",
                                            cursor: "pointer",
                                            position: "absolute",
                                            top: "20px",
                                            left: "250px",
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleLike(product);
                                        }}
                                    />
                                ) : (
                                    <AiOutlineHeart
                                        style={{
                                            color: "red",
                                            fontSize: "30px",
                                            position: "absolute",
                                            top: "20px",
                                            left: "250px",
                                            cursor: "pointer",
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleLike(product);
                                        }}
                                    />
                                )}
                            </button>
                            <button
                                className={`mt-[400px] w-[220px] text-white py-2 px-6 rounded-[10px] transition-transform transform active:scale-[.97] ${
                                    isAddedToCart(product)
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500"
                                }`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (!isAddedToCart(product)) {
                                        handleAddToCart(product);
                                    }
                                }}
                            >
                                {isAddedToCart(product)
                                    ? "Added"
                                    : "Add to cart"}
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Liked;
