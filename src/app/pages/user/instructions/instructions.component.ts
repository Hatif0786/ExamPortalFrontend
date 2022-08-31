import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/service/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {
  qId =0;
  quiz: any;

  constructor(private _route: ActivatedRoute, private qservice: QuizService, private route: Router) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qId'];
    this.qservice.getQuiz(this.qId).subscribe((data)=> {
      this.quiz = data;
    })
  }


  elem = document.documentElement;

  fullscreen(){
    if(this.elem.requestFullscreen){
      this.elem.requestFullscreen();
    }
  }

  startQuiz(){
    Swal.fire({
      title: 'Do you want to start the quiz?',
      showCancelButton: true,
      confirmButtonText: 'Start',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.route.navigate(['/start/'+this.qId]);
        this.fullscreen();
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }
}
