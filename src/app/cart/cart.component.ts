import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CartService } from './cart.service';
import { Product } from '../products/product.model';
import { OrderItem } from './orderItem.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  //@ViewChild('qtd') qtd!: ElementRef;
  cartProducts: OrderItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartProducts = this.cartService.getCartProducts()
  }
  onSelected(i: number) {
    //this.cartProducts[i].qtd = +this.qtd.nativeElement.value
  }
  onRemove(i: number) {
    this.cartService.removeCartProduct(i)
  }
  increaseQtd(i: number){
    this.cartService.addQtd(i)
  }
  decreaseQtd(i: number){
    this.cartService.removeQtd(i)
  }

  onBuy(){

    this.cartService.postOrderItems().subscribe(
      responseData =>  {
        console.log(responseData)
      }
    )
    alert("Pedido enviado com sucesso!")
    this.cartProducts = []
    this.cartService.cleanCart()
  }
}
