import {Component, OnInit,TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {BsModalService} from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';
import {ProductService} from '../../../services/product.service';

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'product'
})
export class ProductPipe implements PipeTransform {
  transform(products: any[], searchproduct: string) {


    if (searchproduct == null) {
      searchproduct = '';
    }


    searchproduct = searchproduct.toLowerCase();

    return products.filter(elem => elem.nom.toLowerCase().indexOf(searchproduct) > -1);
  }


}


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products;
  searchproduct: string;
  modalRef;
  product;
  idproduct;


  constructor(private productService: ProductService,private router: Router,private modalService: BsModalService) {
  }

  ngOnInit(): void {

   this.getallproducts();
  }
  getallproducts(){
    this.productService.getAll().subscribe(res =>{
      console.log("list products", res);
      this.products=res;


    })
  }

  getproduct(id){
    console.log(id);
    this.productService.getproductByid(id).subscribe(res=>{
      console.log("product",res);
      this.product = res;
    })
  }
  removeproduct(id) {

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

        this.productService.deleteproduct(id).subscribe(res => {
          console.log(res);

          this.getallproducts();
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
    this.idproduct = id;
  }

  openModallg(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  update(id){
    this.router.navigate(['/editproduct', id]);
  }
}
