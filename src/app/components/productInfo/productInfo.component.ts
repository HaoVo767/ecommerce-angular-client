import { ProductService } from '@/app/services/productService';
import { formatCurrency } from '@/shared/pipes/formatCurrence';
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { UbButtonDirective } from '@/components/ui/button';
import { OrderProductProvider } from '@/providers/orderProduct';

@Component({
  selector: 'product-info',
  templateUrl: './productInfo.component.html',
  styleUrl: './productInfo.component.scss',
  imports: [formatCurrency, UbButtonDirective],
})
export class ProductInfo implements OnChanges, OnDestroy {
  constructor(
    private productService: ProductService,
    private orderProductProvider: OrderProductProvider
  ) {}
  @Input()
  productId: string = '';

  product: {
    name: string;
    price: number;
    size: {
      name: string;
    };
    color: {
      name: string;
      value: string;
    };
  } = {
    name: '',
    price: 0,
    size: {
      name: '',
    },
    color: {
      name: '',
      value: '',
    },
  };
  getProductInfoSubscription = new Subscription();
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productId']) {
      this.getProductInfoSubscription = this.productService
        .getDetailProduct(this.productId)
        .subscribe((data) => {
          this.product = {
            ...data,
            price: Number(data.price),
          };
        });
    }
  }

  handleAddToCart(product: any) {
    this.orderProductProvider.addProduct(product);
  }
  ngOnDestroy(): void {
    if (this.getProductInfoSubscription) {
      return this.getProductInfoSubscription.unsubscribe();
    }
  }
}
