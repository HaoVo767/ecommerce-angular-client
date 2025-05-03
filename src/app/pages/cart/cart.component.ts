import { Component } from '@angular/core';
import { OrderProductProvider } from '@/providers/orderProduct';
import { CartItem } from '@/app/components/cartItem/cartItem.component';
import { CommonModule } from '@angular/common';
import { OrderSummary } from '@/app/components/orderSummary/orderSummary.component';

@Component({
  selector: 'cart-page',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  imports: [CartItem, CommonModule, OrderSummary],
})
export class CartPage {
  constructor(public orderProductProvider: OrderProductProvider) {}
}
