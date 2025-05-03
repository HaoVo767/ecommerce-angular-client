import { OrderProductProvider } from '@/providers/orderProduct';
import { Component, Input } from '@angular/core';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IProduct } from '@/app/models/type';

@Component({
  selector: 'cart-item',
  templateUrl: './cartItem.component.html',
  imports: [FontAwesomeModule],
})
export class CartItem {
  constructor(private orderProductProvider: OrderProductProvider) {}
  @Input()
  product: Partial<IProduct> = {
    name: '',
    color: {
      name: '',
      id: '',
      value: '',
    },
    size: {
      name: '',
      id: '',
      value: '',
    },
    thumnailUrl: '',
  };

  facircleXmark = faCircleXmark;

  handleRemoveItem(product: any) {
    this.orderProductProvider.removeProduct(product);
  }
}
