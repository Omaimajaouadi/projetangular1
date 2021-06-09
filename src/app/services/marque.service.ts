import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarqueService {

  constructor(private http: HttpClient) { }
  addMarque(data) {
    return this.http.post(environment.base_url + '/marque/add/', data);
  }
  getAll(){
    return this.http.get(environment.base_url+"/marque/all");
  }
  updateMarque(data,id){
    return this.http.put(environment.base_url+"/marque/update/"+id ,data);
  }
  deleteMarque(id){
    return this.http.delete(environment.base_url+"/marque/delete/"+id);
  }
  getMarqueByid(id){
    return this.http.get(environment.base_url+"/marque/"+id);
  }
}
