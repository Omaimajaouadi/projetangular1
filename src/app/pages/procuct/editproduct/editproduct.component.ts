import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../../services/product.service';
import {CategoryService} from '../../../services/category.service';
import {ImageService} from '../../../services/image.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {
  submitted=false;
  updateForm:FormGroup;
  category;
id;
  categories;
  product;
  photo;

  filesToUpload: Array<File>;
  constructor(private productService : ProductService,private activeroute:ActivatedRoute, private categoryService : CategoryService,private formBuilder : FormBuilder, private imageservice: ImageService,private router: Router) {
  this.id=this.activeroute.snapshot.params.id;
  }
  ngOnInit(): void {
    this.getAllCategories();

    this.updateForm = this.formBuilder.group({
      nom: ['', [Validators.required]],
      prix: ['', [Validators.required]],
      taille: ['', [Validators.required]],

      category: ['', [Validators.required]],

      file: [''],

    });
    this.getProductById(this.id);
  }
  getAllCategories(){
    this.categoryService.getAll().subscribe(res =>{
      console.log("liste categories", res);
      this.categories=res;


    })
  }

  get f() {
    return this.updateForm.controls;
  }
  selectfile(file) {
    this.filesToUpload = <Array<File>>file.target.files;

    this.photo = file.target.files[0]['name'];
  }
  onSubmit() {
    this.submitted = true;

    const data = {
      nom: this.updateForm.value.nom,
      prix: this.updateForm.value.prix,
      taille: this.updateForm.value.taille,
      category:{
        "id":this.updateForm.value.category
      },

      photo: this.filesToUpload[0].name,

    };


    console.log("data from add product ",data)

    // this.productService.addproduct(data,this.marque.id,this.category.id).subscribe(res => {
    this.productService.updateproduct(data,this.id).subscribe(res => {

      this.imageservice.pushFileToStorage(this.filesToUpload[0]).subscribe(rest => {
        console.log(rest);

        this.router.navigate(["products"])
      });

    });



  }

  // tslint:disable-next-line:typedef
  onReset() {
    this.submitted = false;
    this.updateForm.reset();
  }
  getProductById(id) {

    console.log(this.product);
    this.productService.getproductByid(id).subscribe(data => {
      this.product = data;
      console.log(this.product);

      this.updateForm.get("nom").setValue(data["nom"])
      this.updateForm.get("prix").setValue(data["prix"])
      this.updateForm.get("category").setValue(data["category"])
      this.updateForm.get("taille").setValue(data["taille"])
      this.updateForm.get("photo").setValue(data["photo"])
      //this.updateForm.get("description").setValue(data["des"])




    });
  }
}
