import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private service: UserService, private snack: MatSnackBar, private route: Router) { }

  user1: User = new User;

  ngOnInit(): void {
  }


  validateUsername(){
    let regex= /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;

    if(this.user1.username?.match(regex) || this.user1.username==null){
      return true;
    }
    else{
      return false;
    }
  }
  validatePassword(){
    let regex=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if(this.user1.password?.match(regex) || this.user1.password==null){
      return true;
    }
    else{
      return false;
    }
  }

  ValidateString(){
    let reg = /^[a-zA-Z]*$/;
    if(this.user1.firstName?.match(reg) || this.user1.firstName==null){
        return true;
    }
    else if(this.user1.lastName?.match(reg) || this.user1.lastName==null){
        return true;
    }
    else{
      return false;
    }
}


  validateEmail(){
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if(this.user1.email?.match(regex) ||this.user1.email==null){
      return true;
    }
    else{
      return false;
  }
}

  registerForm(){
    this.user1.profile="assets/logo-a.png";
    this.service.register(this.user1).subscribe((data) => {
      this.snack.open(String(data), '', {
        duration: 3000,
      })
      Swal.fire("Success", "You're succesfully registered!!!", "success");
      this.route.navigate(['/login']);
      console.log("user registered!!!!");
      
    }, (error) =>{
      this.snack.open(String(error), '', {
        duration: 3000,
      })
      console.log("Something went wrong!!!");
    })
  }

}
  function registerForm() {
    throw new Error('Function not implemented.');
  }

