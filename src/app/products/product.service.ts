import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  
  constructor(private http : HttpClient){}

  private products: Product[] = [];

  fetchProducts(){
    return this.http.get<Product[]>("http://localhost:8080/products")
  }
    
  

  getProducts() {
    return this.products;
  }
  getProductById(id : String) {
    return this.http.get<Product>("http://localhost:8080/products/" + id)
    //return this.products.map((a)=>a).filter((p) => p.id === id);
  }
  getProductByBrand(brand) {
    console.log(brand)
    //return this.products.filter((p) => p.brand === brand);
  }
}
