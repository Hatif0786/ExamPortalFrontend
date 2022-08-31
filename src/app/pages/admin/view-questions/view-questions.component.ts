import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/service/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css']
})
export class ViewQuestionsComponent implements OnInit {
  qId = 0;
  qTitle = '';
  index=0;
  questions: any = [];

  constructor(private _route: ActivatedRoute, private service: QuestionService, private route:Router) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qId'];
    this.qTitle = this._route.snapshot.params['title'];
    this.getQuestions();
  }

  getQuestions(){
    this.service.getQuestions(this.qId).subscribe((data) => {
      this.questions = data;
    })
  }

  deleteQues(id: any){
    this.service.deleteQuestion(id).subscribe((data) => {
      this.getQuestions();
    })
  }

}
