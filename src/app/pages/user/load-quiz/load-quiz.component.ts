import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/service/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  cId=0;
  quizzes: any = [];

  constructor(private _route: ActivatedRoute, private qservice: QuizService) { }

  ngOnInit(): void {
   this._route.params.subscribe((params) => {
      this.cId = params['cid'];
      this.getQuizzes(this.cId);
   })
  }

  getQuizzes(id:number){
    if(id==0){
      this.qservice.getActiveQuizzes().subscribe((data)=> {
        this.quizzes = data;
        console.log(this.quizzes);
      })
    } else{
      this.qservice.getQuizzesByCategory(this.cId).subscribe((data)=> {
        this.quizzes = data;
      })
    }
  }

}
