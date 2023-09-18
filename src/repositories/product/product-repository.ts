import { inject, singleton } from 'tsyringe';
import { HttpGateway } from '../../core';
import { makeAutoObservable } from 'mobx';

export type ProductDto = Omit<Product, 'id'>;

export interface Product {
  id: number;
  title: string;
  price: string
  category: string;
  description: string;
  image: string;
}

@singleton()
export class ProductRepository {
  constructor(
    @inject(HttpGateway) private httpGateway: HttpGateway,
  ) {
    makeAutoObservable(this);
  }
  
  load = async () => {
    const productsResponse = await this.httpGateway.get<Product[]>('products');

    return {
      ...productsResponse,
      results: productsResponse.results.map(this.constructProductPm)
    }
  };

  getProductsByCategory = async (category: string) => {
    const productsResponse = await this.httpGateway.get<Product[]>(`products/category/${category}`);
    // Merge in Programmers model
    return {
      ...productsResponse,
      results: productsResponse.results.map(this.constructProductPm)
    }
  }

  delete = async (id: number) => {
     const productsResponse = await this.httpGateway.delete<Product[]>(`products/${id}`);
     // Merge in Programmers model
     return {
        ...productsResponse,
        results: productsResponse.results.map(this.constructProductPm)
     }
  }

  create = async (product: ProductDto) => {
    const productsResponse = await this.httpGateway.post<Product, ProductDto>('products', product);
     return {
        ...productsResponse,
        results: this.constructProductPm(productsResponse.results)
     }
  }

  getById = async (id: string) => {
    const productsResponse = await this.httpGateway.get<Product>(`products/${id}`);
     // Merge in programmersModel
    return {
      ...productsResponse,
      results: this.constructProductPm(productsResponse.results)
    };
  }

  private constructProductPm = (product: Product): Product => {
    return {
      id: product.id,
      title: product.title,
      image: product.image,
      price: product.price,
      category: product.category,
      description: product.description
    }
  }
}
