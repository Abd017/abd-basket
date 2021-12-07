import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '@service/customer.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  name: string = '';
  email: string = '';
  password: string = '';
  showPassword: boolean = false;

  constructor(private customerSerive: CustomerService,
    private router: Router) { }

  ngOnInit(): void {
  }

  register() : void {
    this.customerSerive
      .register(this.name, this.email, this.password)
      .subscribe(resp => {
        sessionStorage.setItem('jwt', resp.token);
        sessionStorage.setItem('customer', resp.name);
        this.router.navigate(['/']);
      })
  }

}
