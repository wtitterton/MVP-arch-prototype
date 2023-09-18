import { container } from "tsyringe";
import { observer } from 'mobx-react-lite';
import { useState } from "react";
import { CategoryList, ProductsList } from "../../components";
import { Messages } from "../../core/messages/messages";
import { ProductsPagePresenter } from "./presenter";



export const ProductsPage = observer(() => {
  const [isOrderDesc, setIsOrderDesc] = useState(true);
  const {vm, orderByTitle, getProductsByCategory, total, deleteProduct} = container.resolve(ProductsPagePresenter);
 
  const order = () => {
      setIsOrderDesc(!isOrderDesc);
      orderByTitle(isOrderDesc)
  }

  const filterProducts = (e) => {
      const category = e.target.innerText.toLowerCase();
      getProductsByCategory(category);
  }

  return (
      <>
        <h1>Products</h1>
          <Messages />
        {vm.isCategoriesLoading ? 'loading...' : <> <CategoryList onClick={filterProducts} categories={vm.categories} /> </>}

        {vm.isProductsLoading ? 
          <h4>'loading...'</h4> : 
          <>
          <h2>Total Products: {total}</h2>
            <button onClick={order}> Order Products </button>
            <ProductsList products={vm.products} onDelete={deleteProduct} />
          </>
        }
      </>
  )
})