import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/service/quiz.service';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes: any = [];

  constructor(private service: QuizService) { }

  ngOnInit(): void {
    this.getQuizzes();
  }

  getQuizzes(){
    this.service.getQuizzes().subscribe((data)=> {
      this.quizzes=data;
    })
  }

  delete(i: any){
    this.service.deleteQuiz(i).subscribe((data) => {
      this.getQuizzes();
    } )
  }

}
