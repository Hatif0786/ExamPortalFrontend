import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/Category';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {


  categories: any = [];

  constructor(private service: CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this.service.getCategories().subscribe((data) => {
      this.categories = data;
      
    })
  }

  delete(i : any){
    this.service.deleteCategory(i).subscribe((data) => {
      this.getCategories();
    });
  }

}
