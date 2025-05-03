import { ProductService } from '@/app/services/productService';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { formatCurrency } from '@/shared/pipes/formatCurrence';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'three-items',
  templateUrl: './threeItems.component.html',
  styleUrl: './threeItems.component.scss',
  imports: [CommonModule, formatCurrency, RouterModule],
})
export class ThreeItems implements OnInit, OnDestroy, AfterViewInit {
  constructor(private producService: ProductService) {}
  featureProductsSubScription = new Subscription();
  filter: {
    isFeatured: boolean;
  } = {
    isFeatured: true,
  };
  products: {
    id: string;
    imageUrl: string;
    name: string;
    thumnailUrl: string;
    price: number;
  }[] = [
    {
      id: '',
      imageUrl: '',
      name: '',
      thumnailUrl: '',
      price: 0,
    },
  ];
  scrollWidth: number = 0;
  ngOnInit(): void {
    this.featureProductsSubScription = this.producService
      .getProduct(this.filter)
      .pipe(
        map((data) =>
          data.map((item) => ({
            id: item.id,
            imageUrl: item.image[0].url,
            name: item.name,
            thumnailUrl: item.thumnailUrl,
            price: Number(item.price),
          }))
        )
      )
      .subscribe((data) => {
        this.products = [...data, ...data, ...data, ...data, ...data, ...data];
      });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const galleryElement = document.getElementById(
        'galleryElement'
      ) as HTMLElement;
      galleryElement.style.transform = `translateX(-${
        this.products.length * 250
      }px)`;
      galleryElement.style.transition = `transform ${
        this.products.length * 10
      }s linear`;
    }, 500);
  }
  ngOnDestroy(): void {
    return this.featureProductsSubScription.unsubscribe();
  }
}
