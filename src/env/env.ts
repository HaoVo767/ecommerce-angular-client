import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class environment {
  production = true;
  // apiUrl = 'http://localhost:3001/api';
  apiUrl = 'https://ecommerce-nestjs-deploy-to-vercel.onrender.com/api';
  storeId = '3cd54769-7e3f-4b8b-8847-b6b6f8e6b618';
  baseUrl() {
    return this.apiUrl;
  }
  getStoreId() {
    return this.storeId;
  }
}
