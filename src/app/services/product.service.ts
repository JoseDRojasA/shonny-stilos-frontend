import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private httpClient: HttpClient) { }

  public findAllProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${environment.backend.products}/`).pipe(take(1));
  }

  public findById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${environment.backend.products}/${id}`).pipe(take(1));
  }

  public deleteProduct(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${environment.backend.products}/${id}`).pipe(take(1));
  }

  public saveProduct(Product: Product): Observable<Product> {
    return this.httpClient.post<Product>(`${environment.backend.products}/`, Product).pipe(take(1));
  }
}
