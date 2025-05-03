import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { formatCurrency } from '@/shared/pipes/formatCurrence';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'order-detail',
  templateUrl: './orderDetail.component.html',
  imports: [formatCurrency, FontAwesomeModule, CommonModule],
})
export class OrderDetail implements OnChanges {
  @Input()
  orderDetail = {
    name: '',
    phone: '',
    address: '',
    orderItems: [
      {
        product: {
          price: '',
          name: '',
          color: {
            name: '',
          },
          size: {
            name: '',
          },
          thumnailUrl: '',
        },
      },
    ],
  };

  faCircleCheck = faCircleCheck;
  totalPrice = 0;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['orderDetail']) {
      this.totalPrice = this.orderDetail.orderItems.reduce((total, current) => {
        return (total = total + Number(current.product.price));
      }, 0);
    }
  }
}
