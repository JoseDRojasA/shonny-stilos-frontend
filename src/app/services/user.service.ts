import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/user';
import { EncryptUtils } from '../shared/encrypt.utils';

import { environment } from 'src/environments/environment';
import { take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {

  }

  public authenticate(user: User): Observable<User> {
    return this.httpClient.post(`${environment.backend.user}/authentication`, user).pipe(take(1));
  }

  public get user(): User {
    try {
      let user = localStorage.getItem('user');
      user = EncryptUtils.decrypt(user);
      return JSON.parse(user);
    } catch (e) {
      return null;
    }
  }

  public set user(user: User) {
    const userEncrypted = EncryptUtils.encrypt(JSON.stringify(user));
    localStorage.setItem('user', userEncrypted);
  }
}
