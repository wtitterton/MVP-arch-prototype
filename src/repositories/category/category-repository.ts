import { inject, singleton } from 'tsyringe';
import { HttpGateway } from '../../core';
import { makeAutoObservable } from 'mobx';

export interface Category {
  id: number;
  name: string;
}

@singleton()
export class CategoryRepository {
  constructor(
    @inject(HttpGateway) private httpGateway: HttpGateway,
  ) {
    makeAutoObservable(this);
  }
  
  load = async () => {
    const categoryResponse = await this.httpGateway.get<string[]>('products/categories');
    return {
      ...categoryResponse,
      results: categoryResponse.results.map(this.constructCategoryPm)
    }
  };

  private constructCategoryPm = (categoryName: string , id: number): Category => {
    return {
      id,
      name: categoryName,
    }
  }
}
