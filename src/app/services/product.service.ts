import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }
  addproduct(data) {
    return this.http.post(environment.base_url + "/product/add", data);
  }
  getAll(){
    return this.http.get(environment.base_url+"/product/all");
  }
  updateproduct(data,id){
    return this.http.put(environment.base_url+"/product/update/"+id ,data);
  }
  deleteproduct(id){
    return this.http.delete(environment.base_url+"/product/delete/"+id);
  }
  getproductByid(id){
    return this.http.get(environment.base_url+"/product/"+id);
  }
}
