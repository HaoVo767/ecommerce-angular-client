import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardProduct } from '@/app/components/cardProduct/cardProduct.component';
import { ProductService } from '@/app/services/productService';
import { Subscription } from 'rxjs';
import { IProduct, IQuery } from '@/app/models/type';
import { Filter } from '@/app/components/filter/filter.component';
import { FilterService } from '@/app/services/filterService';

@Component({
  selector: 'category-page',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
  imports: [CardProduct, CommonModule, RouterModule, Filter],
})
export class CategoryPage implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private productsService: ProductService,
    private filterService: FilterService
  ) {}
  filter: IQuery = {
    category: '',
    color: null,
    size: null,
  };

  filterColorData: {
    name: string;
    key: string;
    data: {
      id: string;
      name: string;
    }[];
  } = {
    name: 'Color',
    key: 'color',
    data: [
      {
        id: '',
        name: '',
      },
    ],
  };

  filterSizeData: {
    name: string;
    key: string;
    data: {
      id: string;
      name: string;
    }[];
  } = {
    name: 'Size',
    key: 'size',
    data: [
      {
        id: '',
        name: '',
      },
    ],
  };

  products: IProduct[] = [];
  productsSubscription = new Subscription();
  filterColorSubscription = new Subscription();
  filterSizeSubscription = new Subscription();
  categoryFilterId = '';
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const categoryId = params['categoryId'];
      this.filter['category'] = categoryId;
      // this.categoryFilterId = params['categoryId'];
      this.productsSubscription = this.productsService
        .getProduct(this.filter)
        .subscribe((data) => (this.products = data));
    });

    this.filterColorSubscription = this.filterService
      .getColor()
      .subscribe((data) => {
        this.filterColorData.data = data;
      });
    this.filterSizeSubscription = this.filterService
      .getSize()
      .subscribe((data) => {
        this.filterSizeData.data = data;
      });

    this.route.queryParams.subscribe((queryParams) => {
      this.productsSubscription = this.productsService
        .getProduct({ ...this.filter, ...queryParams })
        .subscribe((data) => {
          this.products = data;
        });
    });
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) {
      return this.productsSubscription.unsubscribe();
    }
    if (this.filterColorSubscription) {
      return this.filterColorSubscription.unsubscribe();
    }
  }
}
