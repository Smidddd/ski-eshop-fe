import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductPageComponent } from './product/product-page/product-page.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductDetailPageComponent } from './product/product-detail-page/product-detail-page.component';
import { ProductFilterComponent } from './product/product-filter/product-filter.component';
import { OrderPageComponent } from './order/order-page/order-page.component';
import { OrderPaymentComponent } from './order/order-payment/order-payment.component';
import { OrderInformationComponent } from './order/order-information/order-information.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import { UserChangepassComponent } from './user/user-changepass/user-changepass.component';
import { ProductUpdateComponent } from './product/product-update/product-update.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductPageComponent,
    ProductListComponent,
    ProductDetailPageComponent,
    ProductFilterComponent,
    OrderPageComponent,
    OrderPaymentComponent,
    OrderInformationComponent,
    UserLoginComponent,
    UserRegisterComponent,
    UserChangepassComponent,
    ProductUpdateComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
