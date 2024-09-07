import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  base_url= "https://paperdonebackend.onrender.com/user";

  register(user: User){
    return this.http.post(`${this.base_url}`, user);
  }
}
