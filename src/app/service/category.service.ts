import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../model/Category';
import { Quiz } from '../model/Quiz';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  base_url = "http://localhost:8080/category"

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any>{
    return this.http.get(this.base_url);
  }

  deleteCategory(id: any){
    console.log(`${this.base_url}/${id}`);
    
    return this.http.delete(`${this.base_url}/${id}`);
  }

  getCategory(id: any){
    return this.http.get(`${this.base_url}/${id}`);
  }


  updateCategory(id: any, q: Category){
    return this.http.put(`${this.base_url}/${id}`, q);
  }


  addCategory(c : Category){
    return this.http.post(this.base_url, c);
  }
}
