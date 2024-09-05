import { useRoutes } from "react-router-dom";
import Home from "./home/Home";
import Dynamic from "./dynamic/Dynamic";
import Liked from "./liked/Liked";
import Cart from "./cart/Cart";

const RouteController = () => {
    return useRoutes([
        {
            path: "*",
            element: <Home />,
        },
        {
            path: "products/:id",
            element: <Dynamic />,
        },
        {
            path: "liked",
            element: <Liked />,
        },
        {
            path: "cart",
            element: <Cart />,
        },
    ]);
};

export default RouteController;
