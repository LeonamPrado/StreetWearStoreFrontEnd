import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { OrderItem } from "./orderItem.model";
import { Product } from "../products/product.model";

@Injectable({providedIn: 'root'})

export class CartService{
  public cartProducts: OrderItem[] = []

  cartLength = new Subject<number>()
  
  createOrderItem(qtd: number, size: String, product: Product){
    const orderItem = new OrderItem(qtd, size, product)
    this.cartProducts.push(orderItem)
  }

  getCartProducts(){
    return this.cartProducts
  }

  removeCartProduct(i: number){
    this.cartProducts.splice(i,1)
  }
  addQtd(i: number){
    this.cartProducts[i].qtd += 1
  }
  removeQtd(i: number){
    if(this.cartProducts[i].qtd <= 1){
      this.removeCartProduct(i)
    }else{
      this.cartProducts[i].qtd -= 1

    }
  }
}