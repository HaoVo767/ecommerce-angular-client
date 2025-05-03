import { Component, inject, OnDestroy } from '@angular/core';
import { OrderProductProvider } from '@/providers/orderProduct';
import { formatCurrency } from '@/shared/pipes/formatCurrence';
import { UbButtonDirective } from '../../../components/ui/button';
import { UbDialogTriggerDirective } from '@/components/ui/dialog';
import { UbInputDirective } from '../../../components/ui/input';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrderProductService } from '@/app/services/orderProductService';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { RdxDialogCloseDirective } from '@radix-ng/primitives/dialog';

@Component({
  selector: 'order-summary',
  templateUrl: './orderSummary.component.html',
  imports: [
    formatCurrency,
    UbButtonDirective,
    UbDialogTriggerDirective,
    UbInputDirective,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RdxDialogCloseDirective,
  ],
})
export class OrderSummary implements OnDestroy {
  constructor(
    public orderProductProvider: OrderProductProvider,
    private orderProductService: OrderProductService,
    private router: Router
  ) {}
  isOpen = 'open';
  get totalPrice() {
    const totalPrice = this.orderProductProvider
      .orderList()
      .reduce((total, item) => {
        return (total = total + Number(item.price));
      }, 0);
    return totalPrice;
  }
  userInfoForm = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
  });
  createOrderProductSubscription = new Subscription();

  onSubmit() {
    if (this.orderProductProvider.orderList().length !== 0) {
      this.createOrderProductSubscription = this.orderProductService
        .createOrder({
          ...this.userInfoForm.value,
          productIds: this.orderProductProvider.orderList().map((item) => {
            return { productId: item.id };
          }),
        })
        .subscribe((data) => {
          if (data.id) {
            this.orderProductProvider.removeAll();
            this.router.navigate(['/order', data.id]);
          }
        });
    }
    this.userInfoForm.reset();
    const closeButton = document.getElementById('close_button');
    closeButton?.click();
  }

  ngOnDestroy(): void {
    if (this.createOrderProductSubscription) {
      return this.createOrderProductSubscription.unsubscribe();
    }
  }
}
