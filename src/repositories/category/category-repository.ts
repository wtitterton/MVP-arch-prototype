import { inject, singleton } from 'tsyringe';
import { HttpGateway } from '../../core';
import { makeAutoObservable } from 'mobx';


type categoryDto = string[]

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
    const categoryDto = await this.httpGateway.get<categoryDto>('products/categories');
    return {
      ...categoryDto,
      results: categoryDto.results.map(this.constructCategory)
    }
  };

  private constructCategory = (categoryName: string , id: number): Category => {
    return {
      id,
      name: categoryName,
    }
  }
}
