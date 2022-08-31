import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from '../model/Question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  base_url = "http://localhost:8080/question"

  constructor(private http: HttpClient) { }

  getQuestions(id : any){
    return this.http.get(`${this.base_url}/quiz/${id}`);
  }

  getQuestionsByQuizIdForTest(id: any){
    return this.http.get(`${this.base_url}/quiz/${id}`);
  }


  addQuestion(q : Question){
    return this.http.post(`${this.base_url}`, q);
  }

  evaluateQuiz(quesls: Question[]){
   return this.http.post(`${this.base_url}/eval-quiz`, quesls);
  }


  getQuestion(id: any){
    return this.http.get(`${this.base_url}/${id}`);
  }

  deleteQuestion(id : any){
    return this.http.delete(`${this.base_url}/${id}`);
  }


  updateQuestion(id: any, question: Question){
    return this.http.put(`${this.base_url}/${id}`, question);
  }
}
