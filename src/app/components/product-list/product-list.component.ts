import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '@service/product.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: ( Product[] | undefined);
  pageNum: number = 1;
  showBtn: boolean = true;
  dataLoaded: boolean = false;

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.pageNum = 1;
    this.showBtn = true;
    this.activatedRoute.queryParams
      .subscribe(qp => {
        this.productService
          .getProducts(qp['brand'], qp['category'], this.pageNum)
          .subscribe(data => {
            this.products = data;
            this.dataLoaded = true;
          });
      })
    console.log(this);
    
  }

  loadMore(): void{
    this.pageNum++;
    this.activatedRoute.queryParams
    .subscribe(qp => {
      this.productService
        .getProducts(qp['brand'], qp['category'], this.pageNum)
        .subscribe(data => {
          if (data.length > 0) {
            this.products?.push(...data);
          }
          else{
            this.showBtn=false;
          }
        });
    })
  }
}
