import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '@service/cart.service';
import { CustomerService } from '@service/customer.service';
import { ProductService } from '@service/product.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  brands: string[] = [];
  categories: string[] = [];
  activeBrand: string | undefined = undefined;
  activeCategory: string | undefined = undefined;
  
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    public customerService: CustomerService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(){
    this.productService.brands.subscribe(data => this.brands = data);
    this.productService.categories.subscribe(data => this.categories = data);
    this.activatedRoute.queryParams.subscribe(qp => {
      this.activeBrand = 'brand' in qp ? qp['brand'] : 'all';
      this.activeCategory = 'category' in qp ? qp['category'] : 'all';
    })
  }

  get cartValue(): number{
    return this.cartService.getCartValue();
  }

  get cartSavings(): number {
    return this.cartService.getCartSavings();
  }

  get lineItemQuantity(): number {
    return this.cartService.getLineItemQuantity();
  }
}
