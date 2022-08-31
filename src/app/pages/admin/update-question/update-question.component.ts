import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/model/Question';
import { QuestionService } from 'src/app/service/question.service';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {
  public Editor = ClassicEditorBuild;

  quesId = 0;

  question : Question = new Question();

  constructor(private _route: ActivatedRoute, private service: QuestionService, private route: Router) { }

  ngOnInit(): void {
    this.quesId = this._route.snapshot.params['quesId'];
    this.service.getQuestion(this.quesId).subscribe((data)=> {
      this.question = <Question> data;
    })
  }

  updateQuestion(){
    this.service.updateQuestion(this.quesId, this.question).subscribe((data)=> {
      Swal.fire("Updation Succeeded!!!", "The Question is updated successully!!", "success").then((e)=> {
      this.route.navigate(["/admin/quizzes"]);
      })
    })
  }

}
