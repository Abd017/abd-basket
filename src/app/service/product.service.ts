import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { categoriesUrl, brandsUrl, productsUrl } from 'src/app/urls';
import 'rxjs/add/operator/map';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  // a 'get' function is used like a readable property 
  public get categories(): Observable<string []> {
    return this.httpClient
      .get(categoriesUrl)
      .map(value => value as string[]);
  }

  public get brands(): Observable<string []> {
    return this.httpClient
      .get(brandsUrl)
      .map(value => value as string[]);
  }

  public getProducts(brand: (string | undefined) = undefined,
    category: (string | undefined) = undefined,
    pageNum: number): Observable<Product []>{

    let params = {};
    params['_limit'] = 9;
    params['_page'] = pageNum;
    if(brand){
      params['brand'] = brand;
    }
    if(category){
      params['category'] = category;
    }
    return this.httpClient
      .get(productsUrl, { params })
      .map(value => value as Product[]);
  }

  public getProductById(id: number): Observable<Product> {
    return this.httpClient
      .get(productsUrl + id)
      .map(value => value as Product);
  }
}
