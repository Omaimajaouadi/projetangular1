import {Component, OnInit, Pipe, PipeTransform, TemplateRef} from '@angular/core';
import {CategoryService} from '../../../services/category.service';
import {Router} from '@angular/router';
import {BsModalService} from 'ngx-bootstrap/modal';
import Swal from "sweetalert2";
@Pipe({
  name: 'filterPipe'
})
export class FilterPipe implements PipeTransform {

  transform(categories: any[], searchToken: string) {


    if (searchToken == null)
      searchToken = "";


    searchToken = searchToken.toLowerCase();

    return categories.filter(elem => elem.nomcateg.toLowerCase().indexOf(searchToken) > -1);
  }

}
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories;
  searchToken: string;
  modalRef;
  category;
  idcategory;
  constructor(private categoryService: CategoryService,private router: Router,private modalService: BsModalService) {
  }

  ngOnInit(): void {

    this.getAllCategories();
  }
  getAllCategories(){
    this.categoryService.getAll().subscribe(res =>{
      console.log("liste categories", res);
      this.categories=res;


  })
  }

  getcategory(id){
    console.log(id);
    this.categoryService.getcategoryByid(id).subscribe(res=>{
      console.log("categorie",res);
      this.category=res;
    })
  }
  removecategorie(id) {

    Swal.fire({
      title: 'Vous êtes sûr?',
      text: 'Vous ne pourrez pas annuler cela!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, Supprimer!',
      cancelButtonText: 'Annuler'

    }).then((result) => {
      if (result.isConfirmed) {

        this.categoryService.deleteCategory(id).subscribe(res => {
          console.log(res);

          this.getAllCategories();
          Swal.fire(
            'Supprimé!',
            'une categorie est supprimée.',
            'success'
          );
        });


      }
    });

  }

  recuper(id) {
    this.idcategory = id;
  }

  openModallg(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  update(id){
    this.router.navigate(['/editcategory', id]);
}
}
