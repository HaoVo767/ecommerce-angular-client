import { IProduct } from '@/app/models/type';
import { Injectable, signal } from '@angular/core';
import { ToastProvider } from './toastProvider';

@Injectable({ providedIn: 'root' })
export class OrderProductProvider {
  orderProducts = signal<Partial<IProduct>[]>(
    JSON.parse(window.localStorage.getItem('listOrderProduct') || '[]')
  );
  constructor(private toastProvide: ToastProvider) {}
  addProduct(product: IProduct): string | void {
    if (this.orderProducts().some((item: any) => item.id === product.id)) {
      this.toastProvide.setStatus('Fail');
      this.toastProvide.showToast('Item already in cart');
    } else {
      this.orderProducts.update((products) => [...products, product]);
      window.localStorage.setItem(
        'listOrderProduct',
        JSON.stringify(this.orderList())
      );
      this.toastProvide.setStatus('Success');
      this.toastProvide.showToast('Add item to cart');
    }
    setTimeout(() => {
      this.toastProvide.closeToast();
    }, 2000);
  }
  removeProduct(product: IProduct) {
    this.orderProducts.update((products) => [
      ...products.filter((item) => item.id !== product.id),
    ]);
    window.localStorage.setItem(
      'listOrderProduct',
      JSON.stringify(this.orderList())
    );
    this.toastProvide.setStatus('Success');
    this.toastProvide.showToast('Removed item');
    setTimeout(() => {
      this.toastProvide.closeToast();
    }, 2000);
  }
  orderList() {
    return this.orderProducts();
  }

  removeAll() {
    this.orderProducts.set([]);
    window.localStorage.removeItem('listOrderProduct');
  }
}
