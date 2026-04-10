
// "Service" class that handles data and API calls.
// this is the part that gets the json data from backend and gives it to the components to display on the webpage.
// Instead of fetch(), Angular uses HttpClient which returns "Observables".
// Observables are similar to Promises — they represent a future value.
// You use .subscribe() to get the result when it arrives.
//
// @Injectable({ providedIn: 'root' }) means Angular creates ONE shared
// instance of this service and makes it available to any component that needs it. just like singelton

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, ProductForm, StockUpdate, HistoryEntry } from '../models/inventory.models';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {


private API = window.location.origin.replace('4200', '5059');  private API = 'http://localhost:5059';

  constructor(private http: HttpClient) {} // dependency injection of HttpClient.

 
  getProducts(search: string = ''): Observable<Product[]> {
    let params = new HttpParams();
    if (search) params = params.set('search', search);
    return this.http.get<Product[]>(`${this.API}/api/products`, { params });
  }

  
  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.API}/api/products/${id}`);
  }

 
  createProduct(product: ProductForm): Observable<Product> {
    return this.http.post<Product>(`${this.API}/api/products`, product);
  }

  
  updateProduct(id: number, product: ProductForm): Observable<Product> {
    return this.http.put<Product>(`${this.API}/api/products/${id}`, product);
  }

 
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/api/products/${id}`);
  }

 

  updateStock(productId: number, update: StockUpdate): Observable<void> {
    return this.http.post<void>(
      `${this.API}/api/products/${productId}/stock`, update
    );
  }

  
  getAlerts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.API}/api/alerts`);
  }

 

  getHistory(): Observable<HistoryEntry[]> {
    return this.http.get<HistoryEntry[]>(`${this.API}/api/history`);
  }

  clearHistory(): Observable<void> {
    return this.http.post<void>(`${this.API}/api/history/hide`, {});
  }
}
