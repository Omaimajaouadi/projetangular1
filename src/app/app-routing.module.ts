import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CategoriesComponent} from './pages/category/categories/categories.component';
import {AddcategoryComponent} from './pages/category/addcategory/addcategory.component';
import {EditproductComponent} from './pages/procuct/editproduct/editproduct.component';
import {EditcategoryComponent} from './pages/category/editcategory/editcategory.component';
import {ProductsComponent} from './pages/procuct/products/products.component';
import {AddproductComponent} from './pages/procuct/addproduct/addproduct.component';

const routes: Routes = [
  {path: 'category', component: CategoriesComponent},
  {path: 'addcategory', component: AddcategoryComponent},
  {path: 'editcategory/:id', component: EditcategoryComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'addproduct', component: AddproductComponent},
  {path: 'editproduct/:id', component: EditproductComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
