import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CartService } from '@service/cart.service';
import { CustomerService } from '@service/customer.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private cartService: CartService, public customerService: CustomerService, private ts: TranslateService) { }

  ngOnInit(): void {
  }

  get lineItemQuantity(): number {
    return this.cartService.getLineItemQuantity();
  }

  changeLanguage(ln: string){
    this.ts.use(ln);
  }

}
