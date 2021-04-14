import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ErrorComponent } from './error/error.component';
import { ListBooksComponent } from './list-books/list-books.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { ShoppingBagComponent } from './shopping-bag/shopping-bag.component';
import { EmptyShoppingBagComponent } from './empty-shopping-bag/empty-shopping-bag.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NotifierModule} from 'angular-notifier';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserAddComponent } from './user/user-add/user-add.component';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import {en_US, NgZorroAntdModule, NZ_I18N} from 'ng-zorro-antd';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {JwtInterceptor} from './_interceptors/jwt.interceptor';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AddBookComponent } from './add-book/add-book.component';
import { OrderListComponent } from './order-list/order-list.component';
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    ErrorComponent,
    ListBooksComponent,
    LoginRegisterComponent,
    ShoppingBagComponent,
    EmptyShoppingBagComponent,
    UserListComponent,
    UserAddComponent,
    SignUpComponent,
    AddBookComponent,
    OrderListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NotifierModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    BrowserAnimationsModule
  ],
  bootstrap: [ AppComponent ],
  providers: [
    { provide: NZ_I18N, useValue: en_US},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
]
})
export class AppModule { }
