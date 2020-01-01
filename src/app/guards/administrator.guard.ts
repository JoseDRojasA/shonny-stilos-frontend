import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdministratorGuard implements CanActivate, CanActivateChild {


  constructor(private userService: UserService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userService.user != null ? true: this.router.parseUrl('/login');
  }

  canActivateChild(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.userService.user != null ? true: this.router.parseUrl('/login');
  }
}
