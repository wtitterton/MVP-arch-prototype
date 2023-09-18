import { container } from "tsyringe";
import { observer } from 'mobx-react-lite';
import { ProductsDetailPagePresenter } from "./presenter";
import { Messages } from "../../core/messages/messages";

export const ProductDetailPage = observer(() => {
    const {vm} = container.resolve(ProductsDetailPagePresenter);
    const {title, image, price, description} = vm.product;
  
    return (
        <>
           <Messages />
            {vm.isLoading ? "loading..." : <>
                <h1>{title}</h1>
                <img src={image} alt={title}/>
                <p>{price}</p>
                <p>{description}</p>
            </>}
        </>
    )
})