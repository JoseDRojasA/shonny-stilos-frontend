import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private httpClient: HttpClient) { }

  public findAllBrands(): Observable<Brand[]> {
    return this.httpClient.get<Brand[]>(`${environment.backend.brands}/`).pipe(take(1));
  }

  public deleteBrand(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${environment.backend.brands}/${id}`).pipe(take(1));
  }
}
