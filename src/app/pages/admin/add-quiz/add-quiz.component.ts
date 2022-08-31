import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Quiz } from 'src/app/model/Quiz';
import { CategoryService } from 'src/app/service/category.service';
import { QuizService } from 'src/app/service/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {


  quiz: Quiz = new Quiz();

  categories: any = [];

  constructor(private route: Router, private cservice: CategoryService, private service: QuizService) { }

  ngOnInit(): void {
    this.cservice.getCategories().subscribe((data)=> {
      this.categories=data;
    })
  }

  addQuiz(){
    this.service.postQuiz(this.quiz).subscribe((data)=> {
      Swal.fire("Success", "Quiz Successfully Added!!!", "success");
      this.route.navigate(['/admin/quizzes']);
      console.log("Quiz Added !!!!");  
    }, (error) => {
      Swal.fire("Error!!!!", error , "error");
      console.log("Error there");  
    })
  }

}
