import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginRegisterComponent} from './login-register/login-register.component';
import {ListBooksComponent} from './list-books/list-books.component';
import {ShoppingBagComponent} from './shopping-bag/shopping-bag.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'sign-in',
    component: LoginRegisterComponent,
  },
  {
    path: 'register',
    component: LoginRegisterComponent,
  },
  {
    path: 'list-books',
    component: ListBooksComponent,
  },
  {
    path: 'shopping-bag',
    component: ShoppingBagComponent,
  },
  // {
  //   path: 'register',
  //   component: LoginRegisterComponent,
  //   children: [
  //     {
  //       path: 'clients',
  //       loadChildren: () => import('./client/client.module').then(m => m.ClientModule),
  //       canActivate: [AuthGuard, PermissionGuard]
  //     },
  //     {
  //       path: 'systems',
  //       loadChildren: () => import('./system/system.module').then(m => m.SystemModule),
  //       canActivate: [AuthGuard, PermissionGuard]
  //     },
  //     {
  //       path: 'vendors',
  //       loadChildren: () => import('./vendor/vendor.module').then(m => m.VendorModule),
  //       canActivate: [AuthGuard, PermissionGuard]
  //     },
  //     {
  //       path: 'companies',
  //       loadChildren: () => import('./company/company.module').then(m => m.CompanyModule),
  //       canActivate: [AuthGuard, PermissionGuard]
  //     },
  //     {
  //       path: 'users',
  //       loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
  //       canActivate: [AuthGuard, PermissionGuard]
  //     },
  //     {
  //       path: 'roles',
  //       loadChildren: () => import('./roles/roles.module').then(m => m.RolesModule),
  //       canActivate: [AuthGuard, PermissionGuard]
  //     },
  //     {
  //       path: 'permissions',
  //       loadChildren: () => import('./permissions/permissions.module').then(m => m.PermissionsModule),
  //       canActivate: [AuthGuard, PermissionGuard]
  //     },
  //     {
  //       path: 'taxes',
  //       loadChildren: () => import('./tax/tax.module').then(m => m.TaxModule),
  //       canActivate: [AuthGuard, PermissionGuard]
  //     },
  //     {
  //       path: 'logs',
  //       loadChildren: () => import('./log/log.module').then(m => m.LogModule),
  //       canActivate: [AuthGuard, PermissionGuard]
  //     }
  //   ]
  // },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
