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
  message: string;
  noUserAlert: boolean = false;
  buyAlert: boolean = false;

  constructor(
    private cartService: CartService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.cartProducts = this.cartService.getCartProducts();
    this.userService.currentUser.subscribe((user) => (this.userId = user));
  }
  onRemove(i: number) {
    this.cartService.removeCartProduct(i);
  }
  increaseQtd(i: number) {
    this.cartService.addQtd(i);
  }
  decreaseQtd(i: number) {
    this.cartService.removeQtd(i);
  }

  closeNoUserAlert(){
    this.noUserAlert = false
  }

  closeBuyAlert(){
    this.buyAlert = false
    this.cartProducts = [];
    this.cartService.cleanCart();
  }

  onBuy() {
    if (this.userId === 0) {
      this.message = 'You need to log in to send an order';
      this.noUserAlert = true
      return
    } else {
      this.cartService.postOrderItems(this.userId).subscribe()
      this.message = 'Order sent successfully!';
      this.buyAlert = true
    }
  }

}
