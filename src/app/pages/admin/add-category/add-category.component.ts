import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/Category';
import { CategoryService } from 'src/app/service/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  constructor(private service: CategoryService, private route: Router) { }

  c: Category = new Category;

  ngOnInit(): void {
  }
  addCategory(){
    this.service.addCategory(this.c).subscribe((data) => {
      Swal.fire("Success", "Category Successfully Added!!!", "success");
      this.route.navigate(['/admin/categories']);
      console.log("Category Added !!!!");
    }, (error) => {
      console.log(error);
      
    })
  }

}
