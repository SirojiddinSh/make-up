import { BsHouseDoorFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { Select } from "antd";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { setCurrency } from "../../redux/slices/currency-slice";
import { useDispatch } from "react-redux";

const Cars = () => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartItems = useSelector((state: any) => state.cart.items);

    const likedProducts = useSelector(
        (state: any) => state.liked.likedProducts
    );

    const handleChange = (value: string) => {
        localStorage.setItem("currency", value);
        dispatch(setCurrency(value));
    };

    const handleSearch = () => {
        navigate(`/search?query=${search}`);
    };
    return (
        <div className="max-w-[1400px] mx-auto h-[100px] flex items-center justify-between mb-10">
            <div>
                <h1 className="text-4xl font-bold drop-shadow-md">MAKEUP</h1>
            </div>
            <div className="flex items-center w-[600px] h-[40px] px-2 rounded-full bg-white border-[1px] shadow-md">
                <CiSearch
                    style={{
                        fontSize: "23px",
                        marginLeft: "5px",
                        marginRight: "5px",
                    }}
                />
                <input
                    className="w-[600px] h-[38px] px-2 rounded-full outline-none "
                    type="text"
                    placeholder="Search products, brands and names"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSearch();
                        }
                    }}
                />
            </div>
            <div className="flex items-center gap-3">
                <Select
                    className="shadow-md rounded-[7px]"
                    defaultValue={localStorage.getItem("currency") || "USD"}
                    style={{ width: 70 }}
                    onChange={handleChange}
                    options={[
                        { value: "USD", label: "USD" },
                        { value: "UZS", label: "UZS" },
                    ]}
                />
                <div
                    onClick={() => navigate("/liked")}
                    className="relative cursor-pointer shadow-md border-white border-[1px] rounded-full p-[10px] flex items-center justify-center"
                >
                    <FaHeart style={{ fontSize: "25px" }} />
                    <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-[15px] h-[15px] text-xs flex items-center justify-center">
                        {likedProducts.length}
                    </span>
                </div>
                <div
                    onClick={() => navigate("/cart")}
                    className="relative cursor-pointer shadow-md border-white border-[1px] rounded-full p-[10px] flex items-center justify-center"
                >
                    <BsCart3 style={{ fontSize: "25px" }} />
                    <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-[15px] h-[15px] text-xs flex items-center justify-center">
                        {cartItems.length}
                    </span>
                </div>
                <div
                    onClick={() => navigate("/")}
                    className="relative cursor-pointer shadow-md border-white border-[1px] rounded-full p-[10px] flex items-center justify-center"
                >
                    <BsHouseDoorFill style={{ fontSize: "25px" }} />
                </div>
            </div>
        </div>
    );
};

export default Cars;
