import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { CartService } from '../../cart/cart.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  @ViewChild('size') size!: ElementRef
  idParam: number
  product: Product
  productSize: string = ''
  
  constructor(private router: ActivatedRoute, private Router: Router ,private productService: ProductService, private cartService: CartService){
  }

  ngOnInit() {
    this.productService.getProductById(this.router.snapshot.params['id']).subscribe(product => {
      this.product = product
    })
  }
  onSelected(){
    this.productSize = this.size.nativeElement.value
  }
  onBuy(){
    if(this.productSize === ''){
      return alert('Select the size')
    }
    if(this.cartService.findByIdAndSize(this.product.id, this.productSize)){
      return this.Router.navigate(['/cart'])
    }
    this.cartService.createOrderItem(1,"1x" + this.productSize,this.product)
    this.cartService.cartLength.next(this.cartService.getCartProducts().length)
    this.Router.navigate(['/cart'])
  }

}
