import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IColor, ISize } from '../models/type';
import { environment } from '@/env/env';

@Injectable({ providedIn: 'root' })
export class FilterService {
  constructor(private http: HttpClient, private env: environment) {}
  getSize(): Observable<ISize[]> {
    return this.http.get<any>(
      `${this.env.baseUrl()}/size/findAllSize/${this.env.getStoreId()}`
    );
  }

  getColor(): Observable<IColor[]> {
    return this.http.get<any>(
      `${this.env.baseUrl()}/color/findAllColor/${this.env.getStoreId()}`
    );
  }
}
