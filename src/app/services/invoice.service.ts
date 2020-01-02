import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Invoice } from '../models/invoice';
import { Pagination } from '../models/pagination';

import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  constructor(private httpClient: HttpClient) { }

  public findAllInvoices(sort: string, order: string, page: number, pageSize: number, search?:string): Observable<Pagination<Invoice>> {
    if (!sort) {
      sort = 'date';
    }
    let url = `${environment.backend.invoices}/?sort=${sort}&order=${order}&page=${page}&pageSize=${pageSize}`;
    if (search) {
      url +=`&search=${search}`;
    }
    return this.httpClient.get<Pagination<Invoice>>(url).pipe(take(1));
  }

  public findById(id: number): Observable<Invoice> {
    return this.httpClient.get<Invoice>(`${environment.backend.invoices}/${id}`).pipe(take(1));
  }

  public deleteInvoices(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${environment.backend.invoices}/${id}`).pipe(take(1));
  }

  public saveInvoice(invoice: Invoice): Observable<Invoice> {
    return this.httpClient.post<Invoice>(`${environment.backend.invoices}/`, invoice).pipe(take(1));
  }
}
