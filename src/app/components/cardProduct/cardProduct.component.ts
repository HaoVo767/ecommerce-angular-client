import { Component, Input, OnInit } from '@angular/core';
import { UbCardContentDirective, UbCardDirective } from '@/components/ui/card';
import { CommonModule } from '@angular/common';
import { formatCurrency } from '@/shared/pipes/formatCurrence';
import { faExpand, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PreViewProductModal } from '../preViewProductModal/preViewProductModal';
import { UbDialogTriggerDirective } from '@/components/ui/dialog';
import { OrderProductProvider } from '@/providers/orderProduct';
import { IProduct } from '@/app/models/type';

@Component({
  selector: 'card-product',
  templateUrl: './cardProduct.component.html',
  styleUrl: './cardProduct.component.scss',
  imports: [
    UbCardDirective,
    UbCardContentDirective,
    CommonModule,
    formatCurrency,
    FontAwesomeModule,
    UbDialogTriggerDirective,
    PreViewProductModal,
  ],
})
export class CardProduct implements OnInit {
  constructor(private orderProducts: OrderProductProvider) {}

  @Input()
  product: {
    id: string;
    image: {
      url: string;
    }[];
    name: string;
    price: string;
    thumnailUrl: string;
  } & Partial<IProduct> = {
    id: '',
    image: [{ url: '', id: '' }],
    name: '',
    price: '',
    thumnailUrl: '',
  };
  faExpand = faExpand;
  faCartShopping = faCartShopping;
  ngOnInit(): void {}
  handlePreViewProduct = (event: Event) => {
    event.stopPropagation();
  };

  handleAddOrderProduct(product: Partial<IProduct>, event: Event) {
    event.stopPropagation();
    if (product.id) {
      return this.orderProducts.addProduct(product as IProduct);
    }
    throw new Error('Product ID is required to add the product.');
  }
}
