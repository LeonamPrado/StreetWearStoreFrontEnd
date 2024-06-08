import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { CartService } from '../../cart/cart.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  sizesShoes: string[] = ['34', '35', '36','37', '38', '39', '40', '41', '42', '43', '44']
  unavailableSizes: string[] = ['35', '36', '40', '44', 'PP', 'G'];
  sizesTshirts: string[] = ['PP', 'P', 'M', 'G', 'GG'];
  selectedSize: string = '';
  idParam: number;
  product: Product;
  isLoading: boolean = true;
  sizeAlert: boolean = false;

  constructor(
    private router: ActivatedRoute,
    private Router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.productService
      .getProductById(this.router.snapshot.params['id'])
      .subscribe((product) => {
        this.product = product;
        this.isLoading = false;
      });
  }

  isUnavailable(size: string): boolean {
    return this.unavailableSizes.includes(size);
  }

  selectSize(size: string) {
    this.selectedSize = size;
    console.log('Cor selecionada:', this.selectedSize);
  }

  closeAlert() {
    this.sizeAlert = false;
  }

  onBuy() {
    if (this.selectedSize === '') {
      this.sizeAlert = true;
      return;
    }
    if (this.cartService.findByIdAndSize(this.product.id, this.selectedSize)) {
      return this.Router.navigate(['/cart']);
    }
    this.cartService.createOrderItem(1, '1x' + this.selectedSize, this.product);
    this.cartService.cartLength.next(this.cartService.getCartProducts().length);
    this.Router.navigate(['/cart']);
  }
}
