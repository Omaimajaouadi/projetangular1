import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../../services/category.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MarqueService} from '../../../services/marque.service';
import {ImageService} from '../../../services/image.service';
import {ProductService} from '../../../services/product.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  submitted=false;
  registerForm:FormGroup;
  category;

  categories;

  photo;
  id1;
  id2;
  filesToUpload: Array<File>;
  constructor(private productService : ProductService, private categoryService : CategoryService,private formBuilder : FormBuilder, private imageservice: ImageService,private router: Router) { }

  ngOnInit(): void {
    this.getAllCategories();

    this.registerForm = this.formBuilder.group({
      nom: ['', [Validators.required]],
      prix: ['', [Validators.required]],
      taille: ['', [Validators.required]],

      category: ['', [Validators.required]],

      file: [''],

    });
  }
  getAllCategories(){
    this.categoryService.getAll().subscribe(res =>{
      console.log("liste categories", res);
      this.categories=res;


    })
  }

  get f() {
    return this.registerForm.controls;
  }
  selectfile(file) {
    this.filesToUpload = <Array<File>>file.target.files;

    this.photo = file.target.files[0]['name'];
  }
  onSubmit() {
    this.submitted = true;

    const data = {
      nom: this.registerForm.value.nom,
      prix: this.registerForm.value.prix,
      taille: this.registerForm.value.taille,
      category:{
        "id":this.registerForm.value.category
      },

      photo: this.filesToUpload[0].name,

    };

    this.id1=data.category;
console.log(this.id1);
    console.log("data from add product ",data)

   // this.productService.addproduct(data,this.marque.id,this.category.id).subscribe(res => {
    this.productService.addproduct(data).subscribe(res => {

      this.imageservice.pushFileToStorage(this.filesToUpload[0]).subscribe(rest => {
        console.log(rest);

        this.router.navigate(["products"])
      });

    });



  }

  // tslint:disable-next-line:typedef
  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

}
