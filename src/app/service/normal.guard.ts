import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class NormalGuard implements CanActivate {
  constructor(private route: Router, private login: LoginService){
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.login.isLoggedIn() && this.login.getUserRole()=="NORMAL"){
        return true;
      }
      this.login.logout();
      this.route.navigate(['login']);
      return false;
  }
  
}
