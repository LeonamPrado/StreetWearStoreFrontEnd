import { Product } from "../products/product.model"

export class OrderItem{

  public qtd : number
  public size : String
  public product : Product

  constructor(qtd: number, size: String, product: Product){
    this.qtd = qtd
    this.size = size
    this.product = product
  }
}