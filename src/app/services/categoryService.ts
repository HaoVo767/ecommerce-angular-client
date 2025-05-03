import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@/env/env';
import { ICategory } from '../models/type';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  constructor(private http: HttpClient, private env: environment) {}
  getAllCategory(): Observable<ICategory[]> {
    return this.http.get<any>(
      `${this.env.baseUrl()}/category/findAllCategory/${this.env.getStoreId()}`
    );
  }
}
