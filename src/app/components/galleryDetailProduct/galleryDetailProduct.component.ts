import { ProductService } from '@/app/services/productService';
import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'gallery-detail-product',
  templateUrl: './galleryDetailProduct.component.html',
  styleUrl: './galleryDetailProduct.component.scss',
  imports: [CommonModule],
})
export class GalleryDetailProduct implements OnChanges, OnDestroy {
  constructor(private productService: ProductService) {}
  @Input()
  productId: string = '';

  product: {
    image: {
      url: string;
    }[];
  } = {
    image: [{ url: '' }],
  };
  detailProductImage: string = '';
  getDetailProductSubscription = new Subscription();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productId']) {
      this.getDetailProductSubscription = this.productService
        .getDetailProduct(this.productId)
        .subscribe((data) => {
          this.product = {
            ...data,
            image: data.image.map((item) => {
              return {
                url: item.url.replace('/upload', '/upload/w_70,h_900,c_fit'),
              };
            }),
          };
          this.detailProductImage = data?.image[0]?.url;
        });
    }
  }

  handleChangeImage(url: string) {
    return (this.detailProductImage = url.replace(
      '/upload/w_70,h_900,c_fit',
      '/upload'
    ));
  }
  ngOnDestroy(): void {
    if (this.getDetailProductSubscription) {
      return this.getDetailProductSubscription.unsubscribe();
    }
  }
}
