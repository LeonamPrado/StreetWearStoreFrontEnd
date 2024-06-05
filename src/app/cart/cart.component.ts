import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CartService } from './cart.service';
import { OrderItem } from './orderItem.model';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartProducts: OrderItem[] = [];
  userId: number;

  constructor(private cartService: CartService, private userService: UserService) {}

  ngOnInit() {
    this.cartProducts = this.cartService.getCartProducts()
    this.userService.currentUser.subscribe(user => this.userId = user)
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
    if(this.userId === 0){
      alert("You need to log in to send an order")
    }else{
      this.cartService.postOrderItems(this.userId).subscribe(
        responseData =>  {
          console.log(responseData)
        }
      )
      alert("Order sent successfully!")
      this.cartProducts = []
      this.cartService.cleanCart()
    }
  }
}
