import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { customerUrl, loginUrl } from 'src/app/urls';
import { Customer } from '../customer/model/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  loggedInCustomerName: ( string | undefined | null );

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(email: string, password: string): Promise<any> {
    return this.httpClient
      .post(loginUrl, { email, password })
      .toPromise();
  }

  get isLoggedIn(): boolean {
    this.loggedInCustomerName = sessionStorage.getItem('customer');
    return 'jwt' in sessionStorage;
  }

  logout(): void {
    sessionStorage.clear();
    this.loggedInCustomerName = undefined;
    this.router.navigate(['/customer/login']);
  }

  register(name: string, email: string, password: string): Observable<any>{
    let cust = new Customer();
    cust.name = name;
    cust.email = email;
    cust.password = password;
    return this.httpClient.post(customerUrl, cust);
  }
}
