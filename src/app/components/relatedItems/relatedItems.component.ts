import { IProduct } from '@/app/models/type';
import { ProductService } from '@/app/services/productService';
import { ViewportScroller } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { CardProduct } from '../cardProduct/cardProduct.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'related-items',
  templateUrl: './relatedItems.component.html',
  styleUrl: './relatedItems.component.scss',
  imports: [CardProduct, RouterModule, CommonModule],
})
export class RelatedItems implements OnDestroy, OnChanges {
  constructor(
    private productsService: ProductService,
    private viewportScroller: ViewportScroller
  ) {}
  @Input()
  categoryId: string = '';

  filter: {
    category: string;
  } = {
    category: '',
  };

  products: IProduct[] = [];
  productsSubscription = new Subscription();
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categoryId']) {
      this.filter.category = this.categoryId;
      this.productsSubscription = this.productsService
        .getProduct(this.filter)
        .subscribe((data) => {
          this.products = data;
        });
    }
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) {
      return this.productsSubscription.unsubscribe();
    }
  }
}
