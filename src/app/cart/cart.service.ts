import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { OrderItem } from './orderItem.model';
import { Product } from '../products/product.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CartService {
  constructor(private http: HttpClient) {}

  public cartProducts: OrderItem[] = [];

  cartLength = new Subject<number>();

  createOrderItem(qtd: number, size: String, product: Product) {
    const orderItem = new OrderItem(qtd, size, product);
    this.cartProducts.push(orderItem);
    localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));
  }

  getCartProducts() {
    const storageProducts = JSON.parse(localStorage.getItem('cartProducts'));
    if (storageProducts) {
      this.cartProducts = storageProducts;
    }
    this.cartLength.next(this.cartProducts.length);
    return this.cartProducts;
  }

  removeCartProduct(i: number) {
    this.cartProducts.splice(i, 1);
    localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));
    this.cartLength.next(this.cartProducts.length);
  }

  addQtd(i: number) {
    this.cartProducts[i].qtd += 1;
    let size = this.cartProducts[i].size.split('x')[1];
    this.cartProducts[i].size =
      this.cartProducts[i].qtd.toString() + 'x' + size;
    localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));
  }

  removeQtd(i: number) {
    if (this.cartProducts[i].qtd <= 1) {
      this.removeCartProduct(i);
      this.cartLength.next(this.cartProducts.length);
    } else {
      this.cartProducts[i].qtd -= 1;
      let size = this.cartProducts[i].size.split('x')[1];
      this.cartProducts[i].size =
        this.cartProducts[i].qtd.toString() + 'x' + size;
    }
    localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));
  }

  cleanCart() {
    this.cartProducts = [];
    this.cartLength.next(this.cartProducts.length);
    localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));
  }

  findByIdAndSize(id: number, size: String) {
    let find = this.cartProducts.findIndex(
      (i) => i.size.split('x')[1] === size && i.product.id === id
    );
    if (find === -1) {
      return false;
    } else {
      this.addQtd(find);
      return true;
    }
  }

  postOrderItems(userId: number) {
    let itemsToSend: OrderItem[] = [];
    this.cartProducts.forEach((item) => {
      let findItem = itemsToSend.find((i) => i.product.id === item.product.id);
      if (findItem !== undefined) {
        itemsToSend.forEach((itemToSend) => {
          if (itemToSend.product.id === item.product.id) {
            itemToSend.size = itemToSend.size + ' , ' + item.size;
            itemToSend.qtd += item.qtd;
          }
        });
      } else {
        itemsToSend.push(item);
      }
    });
    console.log(itemsToSend);
    return this.http.post('http://localhost:8080/order', {
      orderItems: itemsToSend,
      userId,
    });
  }
}
