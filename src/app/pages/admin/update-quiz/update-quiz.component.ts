import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/model/Category';
import { Quiz } from 'src/app/model/Quiz';
import { CategoryService } from 'src/app/service/category.service';
import { QuizService } from 'src/app/service/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  qId = 0;
  quiz: any;

  categories: any = [];

  constructor(private _route: ActivatedRoute, private route: Router, private service: QuizService, private cservice: CategoryService) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qId'];
    this.cservice.getCategories().subscribe((data)=> {
      this.categories=data;
    });
    this.service.getQuiz(this.qId).subscribe((data) => {
      this.quiz=data;
    })
  }


  updateQuiz(){
    this.service.updateQuiz(this.qId, this.quiz).subscribe((data)=> {
      Swal.fire("Success", "Quiz Successfully Updated!!!", "success").then((e) => {
        this.route.navigate(['/admin/quizzes']);
      });
      
      console.log("Quiz Updated !!!!");  
    }, (error) => {
      Swal.fire("Error !!!", error, "error");
    })
  }

}
