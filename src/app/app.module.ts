import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { SidemenuComponent } from './layout/sidemenu/sidemenu.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LoaderComponent } from './layout/loader/loader.component';
import { HomeComponent } from './pages/home/home.component';
import {ProductPipe, ProductsComponent} from './pages/procuct/products/products.component';
import { AddproductComponent } from './pages/procuct/addproduct/addproduct.component';
import { EditproductComponent } from './pages/procuct/editproduct/editproduct.component';
import {CategoriesComponent, FilterPipe} from './pages/category/categories/categories.component';
import { AddcategoryComponent } from './pages/category/addcategory/addcategory.component';
import { EditcategoryComponent } from './pages/category/editcategory/editcategory.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ClientComponent } from './pages/client/client.component';
import { MarquesComponent } from './pages/marque/marques/marques.component';
import { AddmarqueComponent } from './pages/marque/addmarque/addmarque.component';
import { EditmarqueComponent } from './pages/marque/editmarque/editmarque.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductPipe,
    NavbarComponent,
    SidemenuComponent,
    FooterComponent,
    LoaderComponent,
    HomeComponent,
    ProductsComponent,
    AddproductComponent,
    EditproductComponent,
    CategoriesComponent,
    AddcategoryComponent,
    EditcategoryComponent,
    ClientComponent,
    FilterPipe,
    ProductPipe,
    MarquesComponent,
    AddmarqueComponent,
    EditmarqueComponent
  ],
  imports: [
    BrowserModule,

    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,ModalModule.forRoot(),


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
