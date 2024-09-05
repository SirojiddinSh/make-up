import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Header from "./components/header/Header";
import RouteController from "./routes";
import Footer from "./components/footer/Footer";
import { fetchProducts } from "./redux/slices/products-slice";

function App() {
    const dispatch = useDispatch<any>();
    const status = useSelector((state: any) => state.products.status);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchProducts());
        }
    }, [status, dispatch]);

    if (status === "loading") {
        return (
            <div id="load">
                <div>G</div>
                <div>N</div>
                <div>I</div>
                <div>D</div>
                <div>A</div>
                <div>O</div>
                <div>L</div>
            </div>
        );
    }

    if (status === "failed") {
        return <div>Failed to load products.</div>;
    }

    return (
        <>
            <div className="w-full h-[30px] bg-black"></div>
            <Header />
            <RouteController />
            <Footer />
        </>
    );
}

export default App;
