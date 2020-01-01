import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Provider } from '../models/provider';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  constructor(private httpClient: HttpClient) { }

  public findAllProviders(): Observable<Provider[]> {
    return this.httpClient.get<Provider[]>(`${environment.backend.providers}/`).pipe(take(1));
  }

  public findById(id: number): Observable<Provider> {
    return this.httpClient.get<Provider>(`${environment.backend.providers}/${id}`).pipe(take(1));
  }

  public deleteProvider(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${environment.backend.providers}/${id}`).pipe(take(1));
  }

  public saveProvider(provider: Provider): Observable<Provider> {
    return this.httpClient.post<Provider>(`${environment.backend.providers}/`, provider).pipe(take(1));
  }
}
