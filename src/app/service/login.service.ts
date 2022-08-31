import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoginData } from '../model/LoginData';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  base_url= "http://localhost:8080";

  public loginStatusSubject = new Subject<boolean>();

  public getUserFromBE(){
    return this.http.get(`${this.base_url}/current-user`);
  }

  public generateToken(ldata: LoginData){
    return this.http.post(`${this.base_url}/generate-token`, ldata);
  }


  public loginToken(token: string){
    localStorage.setItem("token", token);
    return true;
  }

  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user')
    return true;
  }

  public isLoggedIn(){
    let token = localStorage.getItem('token');
    if(token==''|| token==null || token==undefined){
      return false;
    }
    else{
      return true;
    }
  }

  public getToken(){
    return localStorage.getItem('token');
  }

  public getUser(){
    let user = localStorage.getItem('user');
    if(user!=null){
      return JSON.parse(user);
    }else{
      this.logout();
      return null;
    }
  }


  public getUsername(){
    let user = this.getUser();
    return user.username;
  }

  public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }

  public setUserDetails(user:any){
    localStorage.setItem('user', JSON.stringify(user));
    return true;
  }
}
