import { Component, OnInit } from '@angular/core';
import { ProductService } from '../products/product.service';
import { Product } from '../products/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  products: Product[] = []
  isLoading = true


  constructor(private productService : ProductService){}

  ngOnInit() {
    this.productService.fetchProducts().subscribe(products =>{
      this.products = products
      this.isLoading = false
    })
  }
}
