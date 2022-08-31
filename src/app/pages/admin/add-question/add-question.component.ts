import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/model/Question';
import { QuestionService } from 'src/app/service/question.service';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  public Editor = ClassicEditorBuild;
  qTitle = "";

  question : Question = new Question();

  constructor(private _route: ActivatedRoute, private route: Router, private service: QuestionService) { }

  ngOnInit(): void {
    this.question.quiz.qId = this._route.snapshot.params['qId'];
    this.qTitle = this._route.snapshot.params['title'];

  }

  addQuestion(){
    this.service.addQuestion(this.question).subscribe((data) => {
      Swal.fire("Success", "The Question is added in " + this.qTitle +" successfully!!", "success").then((e) => {
        this.route.navigate(["/admin/quizzes"]);
      })
    })
  }

}
