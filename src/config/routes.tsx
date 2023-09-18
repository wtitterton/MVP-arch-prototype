
import 'reflect-metadata'
import {Route} from 'mobx-router';
import { container } from 'tsyringe';
import { ProductDetailPage, ProductsPage, ProductsPagePresenter, ProductsDetailPagePresenter, CreateProductPage, CreateProductPagePresenter } from '../pages'

const productsPagePresenter = container.resolve(ProductsPagePresenter);
const productDetailPagePresenter = container.resolve(ProductsDetailPagePresenter);
const createProductPagePresenter = container.resolve(CreateProductPagePresenter);

export const routes = {
  products: new Route({
    path: '/',
    component: <ProductsPage/>,
    onEnter: () => {
      productsPagePresenter.load();
    },
    beforeExit: () => {
      productsPagePresenter.reset();
    }
  }),
  CreateProduct: new Route({
    path: '/create-product',
    component: <CreateProductPage />,
     onEnter: () => {
      createProductPagePresenter.load();
    },
    beforeExit: () => {
      createProductPagePresenter.reset();
    }
  }),
  productDetail: new Route({
    path: '/product/:id',
    component: <ProductDetailPage />,
    onEnter: (route, params) => {
      if(params && params.id) {
         productDetailPagePresenter.load(params.id);
      }
    },
    beforeExit: () => {
      productDetailPagePresenter.reset();
    }
  }),
};