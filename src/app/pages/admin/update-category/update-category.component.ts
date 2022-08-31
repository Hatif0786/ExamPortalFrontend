import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/model/Category';
import { CategoryService } from 'src/app/service/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {

  cid = 0;
  c : Category = new Category();
  constructor(private _route: ActivatedRoute, private cservice: CategoryService, private route: Router) { }

  ngOnInit(): void {
    this.cid = this._route.snapshot.params['cid'];
    this.cservice.getCategory(this.cid).subscribe((data)=> {
      this.c= <Category> data;
    })
  }


  updateCategory(){
    this.cservice.updateCategory(this.cid, this.c).subscribe((data)=> {
      Swal.fire("Success", "The Category is updated successfully!!!!", "success").then((e)=> {
        this.route.navigate(['/admin/categories']);
      })
    })
  }
}
