import { Link } from "mobx-router";
import { routes } from "../config";
import { StoreContext } from "../core";
import { useContext } from "react";


interface Product {
  id: number;
  title: string;
  image: string;
}

interface ProductListProps  {
  products: Product[];
  deleteCallback: (id: number) => void;
}

export const ProductsList = ({products, deleteCallback} : ProductListProps) => {
   const store = useContext(StoreContext);
  const { router } = store;
  const list = products.map((product) => {
    return (
       <div className="product-list__item" key={product.id}>
          <img src={product.image} />
          <div className="product-info">
            <h2>{product.title}</h2>
            <Link router={router} route={routes.productDetail} params={{id: product.id}} title='View Product' />
            <button onClick={() => deleteCallback(product.id)}>Delete</button>
          </div>
       </div>
    )
  });
  return (
    <div className="product-list">
      {list}
    </div>
  );
};