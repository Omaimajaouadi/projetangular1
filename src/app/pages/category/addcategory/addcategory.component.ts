import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../../services/category.service';
import {Route, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ImageService} from '../../../services/image.service';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit {
  photo;
  submitted = false;
  category;
  registerForm: FormGroup;
  filesToUpload: Array<File>;

  constructor(private formBuilder: FormBuilder, private categoryService: CategoryService, private imageservice : ImageService,private router: Router) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      nomcateg: ['', Validators.required],
      photo: [''],
    });
    console.log(this.registerForm);
  }

  get f() {
    return this.registerForm.controls;
  }

  selectfile(file) {
    this.filesToUpload = <Array<File>> file.target.files;

    this.photo = file.target.files[0]['name'];
  }

  onSubmit() {
    console.log(this.registerForm.value.nomcateg);
    console.log("submit");
    console.log("submit");
    this.submitted = true;

    const data = {
      nomcateg: this.registerForm.value.nomcateg,
      photo: this.filesToUpload[0].name,
    };

    console.log("data from add category ", data)

    this.categoryService.addCategory(data).subscribe(res => {

      this.imageservice.pushFileToStorage(this.filesToUpload[0]).subscribe(rest => {
        console.log(rest);

        this.router.navigate(["category"])
      });

    });


  }

  // tslint:disable-next-line:typedef
  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}
