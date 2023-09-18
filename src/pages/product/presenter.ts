
import { container, singleton } from "tsyringe";
import { inject } from "tsyringe";
import { action, makeObservable, observable, runInAction } from "mobx";
import {Product, ProductRepository, CategoryRepository, Category} from '../../repositories'
import { MessagesPresenter, MessagesRepository } from "../../core";

interface ViewModel {
    isProductsLoading: boolean,
    isCategoriesLoading: boolean
    products: Product[],
    categories: Category[],
}

@singleton()
export class ProductsPagePresenter extends MessagesPresenter {

  public vm: ViewModel = {
    isProductsLoading: true,
    isCategoriesLoading: true,
    products: [],
    categories: []
  };
 
  constructor(
    @inject(ProductRepository) private productRepo: ProductRepository,
    @inject(CategoryRepository) private categoryRepo: CategoryRepository,
  ) {
    super(container.resolve(MessagesRepository));

    makeObservable(this, {
      vm: observable,
      load: action,
      orderByTitle: action
    });
  }

  load = async () => {
    const productsPm = await this.productRepo.load();
    const categoriesPm = await this.categoryRepo.load();

    const errors = [
      !productsPm.success ? "Couldn't load products. Please Try again." : null,
      !categoriesPm.success ? "Couldn't load categories. Please Try again." : null,
    ].filter(e => e !== null) as string[];

    if(errors.length > 0) {
       this.setNetworkErrors(errors);
    }

    runInAction(() => {
        this.vm = {
          products: productsPm.results, 
          categories: categoriesPm.results, 
          isCategoriesLoading: false, 
          isProductsLoading: false
        };
    })
  }

  getProductsByCategory = async (category: string) => {
    this.vm.isProductsLoading = true;
    const productsResponse = await this.productRepo.getProductsByCategory(category);

    if(productsResponse.error) {
      this.setNetworkErrors(["Couldn't Filter products. Please Try again."]);
    }
    
    runInAction(async () => {
      this.vm.products = productsResponse.results;
      this.vm.isProductsLoading = false;
    })
  }

  deleteProduct = async (id: number) => {
    const productPm = await this.productRepo.delete(id);
    
    if (productPm.success) {
      this.setUserMessages(['Product was deleted successfully!']);
      // Reload products won't make a difference as the api doesn't actually remove 
      // the product from the database, but in normal circumstances this would return all products 
      //bar the deleted one
      this.vm.isProductsLoading = true;
      await this.productRepo.load();
      this.vm.isProductsLoading = false;
      return;
    }

    if(!productPm.success) {
      this.setNetworkErrors(["Couldn't delete product. Please Try again."]);
    }
  }

  get total () {
    return this.vm.products.length;
  }

  orderByTitle = (isDesc = false) => {
    this.setUserMessages(['Products were ordered by title, nice job!'])
    if (isDesc) {
      this.vm.products = this.vm.products.sort((a, b) => {
        return b.title.localeCompare(a.title);
      })
      return;
    }

    this.vm.products = this.vm.products.sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
    
  }

  reset() {
    this.clearMessages()
  }
}
