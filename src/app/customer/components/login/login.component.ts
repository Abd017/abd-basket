import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../../service/customer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData: { email: string, password: string } = { email: '', password:'' };

  constructor(private customerService: CustomerService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.customerService.isLoggedIn) {
      this.router.navigate(['/']);
    }
  }

  handleSuccessfullLogin(resp: any){
    // store the login response (token, ..) in the local/session storage
    sessionStorage.setItem('jwt', resp.token);
    this.router.navigate(['/']);
  }

  handleFailedLogin(err: any){

  }

  async login() {
    let { email, password} = this.loginData;
    try {
      let resp: any = await this.customerService.login(email, password);
      sessionStorage.setItem('jwt', resp.token);
      sessionStorage.setItem('customer', resp.name);
      this.activatedRoute.queryParams.subscribe(qp => {
        let { redirectTo } = qp;
        if(!redirectTo) {
          redirectTo = '/'
        }
        this.router.navigate([redirectTo]);
      })
    }
    catch (err){
      console.log('error is ', err);
    }
  }
}
