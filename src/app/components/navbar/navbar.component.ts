import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public login: LoginService) { }

  isLoggedIn=false;
  user = null;

  ngOnInit(): void {
    this.isLoggedIn = this.login.isLoggedIn();
    this.user =this.login.getUser();
    this.login.loginStatusSubject.asObservable().subscribe((data) => {
      console.log(data);
      this.isLoggedIn = this.login.isLoggedIn();
      this.user =this.login.getUser();
    })
  }

  


  logout(){
    this.login.logout();
    window.location.reload();
  }

}
