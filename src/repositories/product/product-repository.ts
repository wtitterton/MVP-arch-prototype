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
    const productsDto = await this.httpGateway.get<Product[]>('products');

    return {
      ...productsDto,
      results: productsDto.results.map(this.constructProduct)
    }
  };

  getProductsByCategory = async (category: string) => {
    const productsDto = await this.httpGateway.get<Product[]>(`products/category/${category}`);
    // Merge in modified model
    return {
      ...productsDto,
      results: productsDto.results.map(this.constructProduct)
    }
  }

  delete = async (id: number) => {
     const productsDto = await this.httpGateway.delete<Product[]>(`products/${id}`);
     return {
        ...productsDto,
        results: productsDto.results.map(this.constructProduct)
     }
  }

  create = async (product: ProductDto) => {
    const productDto = await this.httpGateway.post<Product, ProductDto>('products', product);
    return productDto
  }

  getById = async (id: string) => {
    const productDTO = await this.httpGateway.get<Product>(`products/${id}`);
     // Merge in modified model
    return {
      ...productDTO,
      results: this.constructProduct(productDTO.results)
    };
  }

  private constructProduct = (product: Product): Product => {
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
