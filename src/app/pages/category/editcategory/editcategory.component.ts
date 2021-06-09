import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {CategoryService} from '../../../services/category.service';
import {ImageService} from '../../../services/image.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-editcategory',
  templateUrl: './editcategory.component.html',
  styleUrls: ['./editcategory.component.css']
})
export class EditcategoryComponent implements OnInit {
category;
id;
updateForm;
filesToUpload: Array<File>;
photo;
  submitted=false;
  constructor(private formBuilder: FormBuilder, private categoryService: CategoryService,  private activeroute:ActivatedRoute, private imageservice : ImageService,private router: Router) {
    this.id=this.activeroute.snapshot.params.id
  }

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      nomcateg: ['', Validators.required],
      photo: [''],
    });
    this.getcategorybyId(this.id);
  }

  getcategorybyId(id){
    this.categoryService.getcategoryByid(id).subscribe(data=>{
      console.log(data);
      this.category=data;

    this.updateForm.get("nomcateg").setValue(data["nomcateg"])

    this.updateForm.get("photo").setValue(data["photo"])
    })}

  get f() {
    return this.updateForm.controls;
  }

  selectfile(file) {
    this.filesToUpload = <Array<File>> file.target.files;

    this.photo = file.target.files[0]['name'];
  }

  onSubmit() {


    this.submitted = true;

    const data = {
      nomcateg: this.updateForm.value.nomcateg,
      photo: this.filesToUpload[0].name,
    };

    console.log("data from add category ", data)

    this.categoryService.updateCategory(data,this.id).subscribe(res => {

      this.imageservice.pushFileToStorage(this.filesToUpload[0]).subscribe(rest => {
        console.log(rest);

        this.router.navigate(["category"])
      });

    });


  }

  // tslint:disable-next-line:typedef
  onReset() {
    this.submitted = false;
    this.updateForm.reset();
  }
}

