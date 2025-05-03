import { Component, OnInit } from '@angular/core';
import { OrderProductService } from '@/app/services/orderProductService';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { OrderDetail } from '@/app/components/orderDetail/orderDetail.component';
@Component({
  selector: 'order-page',
  templateUrl: './order.component.html',
  imports: [OrderDetail],
})
export class OrderPage implements OnInit {
  constructor(
    private orderProductService: OrderProductService,
    private route: ActivatedRoute
  ) {}
  getDetailOrderSubscription = new Subscription();
  orderDetail = {
    name: '',
    phone: '',
    address: '',
    orderItems: [
      {
        product: {
          name: '',
          price: '',
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
  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      this.getDetailOrderSubscription = this.orderProductService
        .getDetailOrder(data['orderId'])
        .subscribe((data) => {
          this.orderDetail = data;
        });
    });
  }
}
