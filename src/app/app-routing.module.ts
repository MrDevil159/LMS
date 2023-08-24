import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isAuthenticatedGuard } from './shared/guards/is-authenticated.guard';
import { isAdminGuard } from './shared/guards/is-admin.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'leaves',
    loadChildren: () => import('./leaves/leaves.module').then(m => m.LeavesModule),
    canActivate: [isAuthenticatedGuard]
  },
  {
    path: 'users',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    canActivate: [isAuthenticatedGuard, isAdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
