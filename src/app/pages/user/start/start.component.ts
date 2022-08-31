import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/service/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  qId = 0;
  quizQues: any = [];
  ans = ""

  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;

  isSubmitted = false;

  timer: any;

  singleQuesMarks = 0;

  constructor(private locationSt : LocationStrategy, private _route: ActivatedRoute, private service: QuestionService) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qId = this._route.snapshot.params['qId'];
    this.getQuestions();
  }


  getQuestions(){
    this.service.getQuestionsByQuizIdForTest(this.qId).subscribe((data)=> {
      this.quizQues = data;
      this.timer = this.quizQues.length * 1 * 60;
      console.log(data);
      this.startTimer();
    })
  }

  exitFullScreen(){
    if(document.exitFullscreen){
      document.exitFullscreen();
    }
  }

  submitQuiz(){
    Swal.fire({
      title: 'Do you want to submit the quiz?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      denyButtonText: `Don't save`,
      icon: "info"
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.eval();
        
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }


  preventBackButton(){
    history.pushState(null, '', location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, "", location.href);
    });
  }

  startTimer(){
    let t = window.setInterval(()=> {
      if(this.timer<=0){
        this.eval();
        clearInterval(t);
      }
      else{
        this.timer--;
      }
    }, 1000);
  }

  getFormattedTime(){
    let mm = Math.floor(this.timer/60);
    let ss = this.timer-mm*60;
    return `${mm} min : ${ss} sec`;
  }

  eval(){
    this.isSubmitted=true;
        this.exitFullScreen();

        

        this.service.evaluateQuiz(this.quizQues).subscribe((data: any)=> {
          this.marksGot = data[0];
          this.correctAnswers = data[1];
          if(data[2]){
            this.attempted = data[2];
          } else if(!data[2]){this.quizQues.forEach((ques: any) => {
            if(ques.selectedAnswer.trim()!=""){
              this.attempted++;
            }
          })}
          
          
        }, (error: any) => {
          console.log(error);
          
        })
  }

  printPage(){
    window.print();
  }

}
