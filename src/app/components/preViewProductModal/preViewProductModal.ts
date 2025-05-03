import { Component, Input } from '@angular/core';
import { GalleryDetailProduct } from '../galleryDetailProduct/galleryDetailProduct.component';
import { ProductInfo } from '../productInfo/productInfo.component';
@Component({
  selector: 'preview-product-modal',
  templateUrl: './preViewProductModal.html',
  imports: [GalleryDetailProduct, ProductInfo],
})
export class PreViewProductModal {
  @Input()
  productId: string = '';
}
