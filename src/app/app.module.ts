import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './products/product/product.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { CartComponent } from './cart/cart.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from './common/nav-bar/nav-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { LoadingSpinnerComponent } from './common/loading-spinner/loading-spinner.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { AlertComponent } from './common/alert/alert.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'products/:brand', component: ProductsComponent},
  { path: 'product/:id', component: ProductComponent},
  { path: 'cart', component: CartComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    ProductComponent,
    HeaderComponent,
    FooterComponent,
    CartComponent,
    NavBarComponent,
    LoadingSpinnerComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
