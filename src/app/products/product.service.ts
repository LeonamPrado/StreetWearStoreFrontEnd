import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  
  constructor(private http : HttpClient){}

  fetchProducts(){
    return this.http.get<Product[]>("http://localhost:8080/products")
  }
    
  getProductById(id : String) {
    return this.http.get<Product>("http://localhost:8080/products/" + id)
  }
  getProductByBrand(brand) {
    return this.http.get<Product[]>("http://localhost:8080/products/brand/" + brand)
  }
}
