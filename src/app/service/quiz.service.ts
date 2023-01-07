import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Quiz } from '../model/Quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }

  base_url = "https://paperdonebackend-production.up.railway.app/quiz"

  getQuizzes(){
    return this.http.get(this.base_url);
  }

  deleteQuiz(id: any){
    return this.http.delete(`${this.base_url}/${id}`);
  }


  postQuiz(q: Quiz){
    return this.http.post(`${this.base_url}`, q);
  }


  updateQuiz(id: any, q:Quiz){
    return this.http.put(`${this.base_url}/${id}`, q);
  }

  getQuiz(id: any){
    return this.http.get(`${this.base_url}/${id}`);
  }

  getActiveQuizzes(){
    return this.http.get(`${this.base_url}/active`);
  }


  getQuizzesByCategory(id: any){
    return this.http.get(`${this.base_url}/category/active/${id}`);
  }
}
