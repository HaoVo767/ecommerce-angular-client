import { GalleryDetailProduct } from '@/app/components/galleryDetailProduct/galleryDetailProduct.component';
import { ProductInfo } from '@/app/components/productInfo/productInfo.component';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryPage } from '../category/category.component';
import { ProductService } from '@/app/services/productService';
import { Subscription } from 'rxjs';
import { RelatedItems } from '@/app/components/relatedItems/relatedItems.component';

@Component({
  selector: 'detail-product-page',
  templateUrl: './detailProduct.component.html',
  styleUrl: './detailProduct.component.scss',
  imports: [CommonModule, GalleryDetailProduct, ProductInfo, RelatedItems],
})
export class DetailProductPage implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}
  productId: string = '';
  categoryId: string = '';
  productSubscription = new Subscription();
  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      this.productId = data['productId'];
      this.productSubscription = this.productService
        .getDetailProduct(data['productId'])
        .subscribe((data) => {
          this.categoryId = data.category.id;
        });
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }

  ngOnDestroy(): void {
    if (this.productSubscription) {
      return this.productSubscription.unsubscribe();
    }
  }
}
