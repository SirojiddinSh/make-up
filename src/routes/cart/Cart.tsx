import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../redux/slices/cart-slice";
import { Product } from "../../types/dataTypes";
import { AiOutlineClose } from "react-icons/ai";

const Cart: React.FC = () => {
    const [cartProducts, setCartProducts] = React.useState<Product[]>([]);

    useEffect(() => {
        const addedProducts = localStorage.getItem("cartProducts");
        if (addedProducts) {
            setCartProducts(JSON.parse(addedProducts));
        }
    }, [cartProducts]);

    const dispatch = useDispatch();

    const handleRemoveFromCart = (id: number) => {
        dispatch(removeFromCart(id));
        const updatedCartProducts = cartProducts.filter(
            (item: Product) => item.id !== id
        );
        localStorage.setItem(
            "cartProducts",
            JSON.stringify(updatedCartProducts)
        );
    };

    const totalPrice = cartProducts.reduce(
        (total: number, item: Product) => total + parseFloat(item.price),
        0
    );

    return (
        <div className="container mx-auto py-10 px-4">
            {cartProducts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cartProducts?.map((item: Product) => (
                        <div
                            key={item.id}
                            className="bg-white shadow-lg rounded-lg p-5 relative flex flex-col items-center"
                        >
                            <button
                                className="absolute top-2 right-2 text-red-500"
                                onClick={() => handleRemoveFromCart(item.id)}
                            >
                                <AiOutlineClose size={20} />
                            </button>
                            <img
                                src={item.api_featured_image}
                                alt={item.name}
                                className="w-[150px] h-[150px] object-cover mb-4"
                            />
                            <h2 className="text-xl font-semibold mb-2">
                                {item.name}
                            </h2>
                            <p className="text-gray-500 mb-2">{item.brand}</p>
                            <p className="text-lg font-bold mb-4">
                                {item.price} {item.price_sign}
                            </p>
                        </div>
                    ))}
                </div>
            )}
            {cartProducts.length > 0 && (
                <div className="mt-10 flex flex-col items-center">
                    <p className="text-xl font-semibold mb-4">
                        Total: {totalPrice.toFixed(2)}{" "}
                        {cartProducts[0]?.price_sign}
                    </p>
                </div>
            )}
        </div>
    );
};

export default Cart;
