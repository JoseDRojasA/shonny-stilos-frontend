import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pagination } from '../models/pagination';
import { take } from 'rxjs/operators';
import { Sale } from '../models/sale';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  constructor(private httpClient: HttpClient) { }

  public findAllSales(sort: string, order: string, page: number, pageSize: number, search?:string): Observable<Pagination<Sale>> {
    if (!sort) {
      sort = 'date';
    }
    let url = `${environment.backend.sales}/?sort=${sort}&order=${order}&page=${page}&pageSize=${pageSize}`;
    if (search) {
      url +=`&search=${search}`;
    }
    return this.httpClient.get<Pagination<Sale>>(url).pipe(take(1));
  }

  public findById(id: number): Observable<Sale> {
    return this.httpClient.get<Sale>(`${environment.backend.sales}/${id}`).pipe(take(1));
  }

  public deleteSale(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${environment.backend.sales}/${id}`).pipe(take(1));
  }

  public saveSale(invoice: Sale): Observable<Sale> {
    return this.httpClient.post<Sale>(`${environment.backend.sales}/`, invoice).pipe(take(1));
  }
}
