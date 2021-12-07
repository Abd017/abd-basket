import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { AppComponent } from './app.component';
import { FooterComponent } from '@components/footer/footer.component';
import { HeaderComponent } from '@components/header/header.component';
import { SidebarComponent } from '@components/sidebar/sidebar.component';
import { ProductListComponent } from '@components/product-list/product-list.component';
import { ProductCardComponent } from '@components/product-card/product-card.component';
import { ProductDetailsComponent } from '@components/product-details/product-details.component';
import { AddToCartButtonComponent } from './components/add-to-cart-button/add-to-cart-button.component';
import { ViewCartComponent } from './components/view-cart/view-cart.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CustomHttpInterceptorService } from '@service/custom-http-interceptor.service';
import { TranslateLoader, TranslateModule, TranslateModuleConfig } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// route defination: array of 'Route' objects

const routes: Routes = [
  // map a component to a route path
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'products'
  },
  {
    path: 'products',
    component: ProductListComponent
  },
  {
    path: 'products/details/:id',
    component: ProductDetailsComponent
  },
  {
    path: 'view-cart',
    component: ViewCartComponent
  },
  {
    path: 'customer',
    // lazy laoding
    loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule)
  },
  {
    path:"**",
    component: PageNotFoundComponent
  },
];

const trConfig: TranslateModuleConfig = {
  loader: {
    provide: TranslateLoader,
    deps: [HttpClient],
    useFactory: ( httpClient: HttpClient) => new TranslateHttpLoader(httpClient)
  }
};

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    ProductListComponent,
    ProductCardComponent,
    ProductDetailsComponent,
    AddToCartButtonComponent,
    ViewCartComponent,
    PageNotFoundComponent
  ],
  imports: [
    // eagerly loaded modules
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}),
    SweetAlert2Module.forRoot(),
    TranslateModule.forRoot(trConfig),
  ],
  providers: [
    {
      useClass: CustomHttpInterceptorService,
      provide: HTTP_INTERCEPTORS,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
