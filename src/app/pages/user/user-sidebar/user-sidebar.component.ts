import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {
  menuItems: any = [];

  constructor(private cservice: CategoryService) { }

  ngOnInit(): void {
    this.cservice.getCategories().subscribe((data)=> {
      this.menuItems = data;
    })
  }

} 
