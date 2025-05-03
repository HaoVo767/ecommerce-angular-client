import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: async () => {
      return import('./pages/home/home.component').then((m) => m.HomePage);
    },
  },
  {
    path: 'category/:categoryId',
    loadComponent: async () => {
      return import('./pages/category/category.component').then(
        (m) => m.CategoryPage
      );
    },
  },
  {
    path: 'cart',
    loadComponent: async () => {
      return import('./pages/cart/cart.component').then((m) => m.CartPage);
    },
  },
  {
    path: 'product',
    loadComponent: async () => {
      return import('./pages/searchProduct/searchProduct.component').then(
        (m) => m.SearchProduct
      );
    },
  },
  {
    path: 'detail-product/:productId',
    loadComponent: async () => {
      return import('./pages/detail-product/detailProduct.component').then(
        (m) => m.DetailProductPage
      );
    },
  },
  {
    path: 'order/:orderId',
    loadComponent: async () => {
      return import('./pages/order/order.component').then((m) => m.OrderPage);
    },
  },
];
