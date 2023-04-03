import {ProductPageComponent} from "./product/product-page/product-page.component";
import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ProductDetailPageComponent} from "./product/product-detail-page/product-detail-page.component";
import {ProductFilterComponent} from "./product/product-filter/product-filter.component";
import {OrderPageComponent} from "./order/order-page/order-page.component";
import {OrderPaymentComponent} from "./order/order-payment/order-payment.component";
import {OrderInformationComponent} from "./order/order-information/order-information.component";
import {UserLoginComponent} from "./user/user-login/user-login.component";
import {UserRegisterComponent} from "./user/user-register/user-register.component";

  const routes: Routes = [
    {
      path: '',
      component: ProductPageComponent
    },
    {
      path: 'detail',
      component: ProductDetailPageComponent
    },
    {
      path: 'filter',
      component: ProductFilterComponent
    },
    {
      path: 'main',
      component: ProductPageComponent
    },
    {
      path: 'order',
      component: OrderPageComponent
    },
    {
      path: 'checkout',
      component: OrderPaymentComponent
    },
    {
      path: 'orderInformation',
      component: OrderInformationComponent
    },
    {
      path: 'login',
      component: UserLoginComponent
    }
    ,
    {
      path: 'register',
      component: UserRegisterComponent
    }
  ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
