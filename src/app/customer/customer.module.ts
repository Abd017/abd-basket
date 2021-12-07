import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { OrderService } from './service/order.service';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { RegistrationComponent } from './components/registration/registration.component';
import { TranslateLoader, TranslateModule, TranslateModuleConfig } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegistrationComponent
  },
  {
    path: 'order-history',
    component: OrderHistoryComponent
  }
]

const trConfig: TranslateModuleConfig = {
  loader: {
    provide: TranslateLoader,
    deps: [HttpClient],
    useFactory: ( httpClient: HttpClient) => new TranslateHttpLoader(httpClient)
  }
};

@NgModule({
  declarations: [
    LoginComponent,
    OrderHistoryComponent,
    OrderDetailsComponent,
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    SweetAlert2Module.forRoot(),
    TranslateModule.forChild(trConfig)
  ],
  // providers: [
  //   OrderService
  // ]
})
export class CustomerModule { }
