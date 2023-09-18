import { Link } from "mobx-router";
import { routes } from "../config";
import { StoreContext } from "../core";
import { useContext } from "react";

export const Navigation = () => {
     const store = useContext(StoreContext);
     const { router } = store;
    return (
        <nav>
            <Link style={{margin: '1rem'}} router={router} route={routes.products} title='Products' />
            <Link router={router} route={routes.CreateProduct} title='Create Product' />
        </nav>
    )
}