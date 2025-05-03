import { CardProduct } from '@/app/components/cardProduct/cardProduct.component';
import { NoResult } from '@/app/components/no-result/noResult.component';
import { IProduct } from '@/app/models/type';
import { ProductService } from '@/app/services/productService';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'searchProduct',
  templateUrl: './searchProduct.component.html',
  styleUrl: './searchProduct.component.scss',
  imports: [CardProduct, CommonModule, NoResult, RouterModule],
})
export class SearchProduct implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}
  products: IProduct[] = [];
  filter: {
    keyword: string;
  } = {
    keyword: '',
  };
  searchProductSubscription = new Subscription();
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.filter.keyword = params['keyword'];
      this.searchProductSubscription = this.productService
        .getProductBySearchKeyword(this.filter)
        .subscribe((data) => {
          this.products = data;
        });
    });
  }

  ngOnDestroy(): void {
    if (this.searchProductSubscription) {
      return this.searchProductSubscription.unsubscribe();
    }
  }
}
