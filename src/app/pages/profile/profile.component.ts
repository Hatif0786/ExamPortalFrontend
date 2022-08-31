import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private login: LoginService) { }

  user: any = this.login.getUser();

  role: any = this.login.getUserRole();

  ngOnInit(): void {
  }

  checkRole(){
    if(this.role=="ADMIN"){
      return true;
    }
    else{
      return false;
    }
  }

}
