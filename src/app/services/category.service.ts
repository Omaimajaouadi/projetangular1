import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }
  addCategory(data) {
    return this.http.post(environment.base_url + '/category/add/', data);
  }
  getAll(){
    return this.http.get(environment.base_url+"/category/all");
  }
  updateCategory(data,id){
    return this.http.put(environment.base_url+"/category/update/"+id ,data);
  }
  deleteCategory(id){
    return this.http.delete(environment.base_url+"/category/delete/"+id);
  }
  getcategoryByid(id){
    return this.http.get(environment.base_url+"/category/"+id);
  }
}
