import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './product.model';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']  // Corrigido para styleUrls
})
export class ProductsComponent implements OnInit, OnDestroy {
  productsByBrand: Product[];
  brand: string;
  private routeSub: Subscription;

  constructor(private productService: ProductService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params: Params) => {
      this.brand = params['brand'];
      this.loadProductsByBrand();
    });
  }

  loadProductsByBrand() {
    this.productService.getProductByBrand(this.brand).subscribe(
      products => this.productsByBrand = products
    );
  }

  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}

