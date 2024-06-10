import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './product.model';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'], // Corrigido para styleUrls
})
export class ProductsComponent implements OnInit, OnDestroy {
  productsByBrand: Product[];
  brand: string;
  private routeSub: Subscription;
  isLoading = true;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router, private viewportScroller: ViewportScroller
  ) {}

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params: Params) => {
      this.isLoading = true;
      this.brand = params['brand'];
      this.loadProductsByBrand();
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.viewportScroller.scrollToPosition([0, 0]);
      }
    });
  }

  loadProductsByBrand() {
    this.productService.getProductByBrand(this.brand).subscribe((products) => {
      this.productsByBrand = products;
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
