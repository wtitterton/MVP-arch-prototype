
import { container, singleton } from "tsyringe";
import { inject } from "tsyringe";
import { action, makeObservable, observable, runInAction } from "mobx";
import { CategoryRepository, Category, ProductDto, ProductRepository} from '../../repositories'
import { MessagesPresenter, MessagesRepository } from "../../core";

interface ViewModel {
    isCategoriesLoading: boolean
    isSubmittingForm: boolean
    categories: Category[],
}

@singleton()
export class CreateProductPagePresenter extends MessagesPresenter {

  public vm: ViewModel = {
    isCategoriesLoading: true,
    isSubmittingForm: false,
    categories: []
  };
 
  constructor(
    @inject(CategoryRepository) private categoryRepo: CategoryRepository,
    @inject(ProductRepository) private productRepo: ProductRepository,
  ) {
    super(container.resolve(MessagesRepository));

    makeObservable(this, {
      vm: observable,
      load: action,
    });
  }

  load = async () => {
    const categoriesPm = await this.categoryRepo.load();

    if (!categoriesPm.success) {
       this.setNetworkErrors(["Couldn't load categories. Please Try again."]);
    }

    runInAction(() => {
        this.vm = {
          categories: categoriesPm.results, 
          isCategoriesLoading: false, 
          isSubmittingForm: false
        };
    })
  }

  create = async (product: ProductDto) => {
   this.vm.isSubmittingForm = true;
   const productDto = await this.productRepo.create(product);
   this.vm.isSubmittingForm = false;

   productDto.success ? this.setUserMessages(['Product created successfully.']) : 
   this.setNetworkErrors(['Could not create product. Please try again.']);

    return productDto
  }

  reset() {
    this.clearMessages()
  }
}