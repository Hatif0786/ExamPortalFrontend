import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { LoginData } from 'src/app/model/LoginData';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ldata : LoginData = new LoginData();

  constructor(private snack: MatSnackBar, private service: LoginService, private route:Router) { }

  ngOnInit(): void {
  }

  formSubmit(){
    if(this.ldata.username?.trim()=='' || this.ldata.username==null){
      this.snack.open("Invalid Username", '', {
        duration: 3000
      })
    }

    if(this.ldata.password?.trim()=='' || this.ldata.password==null){
      this.snack.open("Invalid password", '', {
        duration: 3000
      })
    }
    
    this.service.generateToken(this.ldata).subscribe((data: any) =>{
      console.log(data);
      this.service.loginToken(data.token);

      this.service.getUserFromBE().subscribe((user: any) =>{
        this.service.setUserDetails(user);
        console.log(user);


        if(this.service.getUserRole()=="ADMIN"){
          this.service.loginStatusSubject.next(true);
          this.route.navigateByUrl("/admin");
        }else if(this.service.getUserRole()=="NORMAL"){
          this.service.loginStatusSubject.next(true);
          this.route.navigateByUrl("/user");
        }else{
          this.service.logout();
          this.route.navigateByUrl("/login")
          this.snack.open("Invalid details", "Try again", {
            duration: 3000
          })
          

        }
        
      } )
      
    }, (error) => {
      console.log(error);
      this.snack.open("Invalid details", "Try again", {
        duration: 3000
      })
      
    })


    return;
  }
}
