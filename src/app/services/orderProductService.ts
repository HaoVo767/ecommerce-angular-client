import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@/env/env';
import { IOrder } from '../models/type';

@Injectable({ providedIn: 'root' })
export class OrderProductService {
  constructor(private http: HttpClient, private env: environment) {}
  createOrder(data: {
    productIds: { productId: string | undefined }[];
    name?: string | null | undefined;
    phone?: string | null | undefined;
    address?: string | null | undefined;
  }): Observable<any> {
    return this.http.post(
      `${this.env.baseUrl()}/order/${this.env.getStoreId()}`,
      JSON.stringify(data),
      {
        headers: { 'Content-type': 'application/json' },
      }
    );
  }

  getDetailOrder(orderId: string): Observable<any> {
    return this.http.get<any>(`${this.env.baseUrl()}/order/${orderId}`);
  }
}
