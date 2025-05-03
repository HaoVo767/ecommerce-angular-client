import { IProduct } from '@/app/models/type';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@/env/env';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private http: HttpClient, private env: environment) {}
  getProduct(queryParams: {
    [key: string]: string | number | boolean | null;
  }): Observable<IProduct[]> {
    let params = new HttpParams();
    for (const key in queryParams) {
      if (queryParams.hasOwnProperty(key)) {
        if (queryParams[key] !== null) {
          params = params.set(
            key,
            queryParams[key] as string | number | boolean
          );
        }
      }
    }
    return this.http.get<any>(`${this.env.baseUrl()}/product/findByQuery`, {
      params,
    });
  }

  getProductBySearchKeyword({
    keyword,
  }: {
    keyword: string;
  }): Observable<IProduct[]> {
    let params = new HttpParams();
    params = params.set('keyword', keyword);
    return this.http.get<any>(
      `${this.env.baseUrl()}/product/findBySearchKeyword`,
      { params }
    );
  }

  getDetailProduct(id: string): Observable<IProduct> {
    return this.http.get<any>(`${this.env.baseUrl()}/product/${id}`);
  }
}
