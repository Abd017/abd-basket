import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '@service/cart.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-add-to-cart-button',
  templateUrl: './add-to-cart-button.component.html',
  styleUrls: ['./add-to-cart-button.component.css']
})
export class AddToCartButtonComponent implements OnInit {

  @Input()
  product: Product = new Product();

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  get isInCart(): boolean{
    return this.cartService.isInCart(this.product);
  }

  get quantity(): number {
    return this.cartService.getQuantity(this.product);
  }

  addToCart(): void{
    this.cartService.addToCart(this.product);
  }

  increment(): void{
    this.cartService.incrementQuantity(this.product);
  }
  
  decrement(): void{
    this.cartService.decrementQuantity(this.product);
  }
}
