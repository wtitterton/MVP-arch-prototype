
import { container, singleton } from "tsyringe";
import { inject } from "tsyringe";
import { action, makeObservable, observable, runInAction } from "mobx";
import {Product, ProductRepository} from '../../repositories'
import { MessagesPresenter, MessagesRepository } from "../../core";

interface Vm {
    isLoading: boolean,
    product: Product,
}

@singleton()
export class ProductsDetailPagePresenter extends MessagesPresenter {

  public vm: Vm = {
    isLoading: true,
    product: {},
  } as Vm;
 
  constructor(
    @inject(ProductRepository) private productRepo: ProductRepository,
  ) {
    super(container.resolve(MessagesRepository));

    makeObservable(this, {
      vm: observable,
      load: action,
    });
  }

  load = async (id: string) => {
    const product = await this.productRepo.getById(id);

    if (product.error) {
       this.setNetworkErrors(["Couldn't load product detail. Please Try again."])
    }

    runInAction(() => {
        this.vm = {
          product: this.constructorProductVm(product.results), 
          isLoading: false,
        };
    })
  }

  constructorProductVm = (product: Product) => {
    return {
      id: product.id,
      title: product.title,
      price: `£ ${product.price}`,
      category: product.category,
      description: product.description,
      image: product.image,

    }
  }

  reset = () => {
    this.clearMessages();
  }
}
