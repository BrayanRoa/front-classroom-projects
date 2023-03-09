import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: "dashboard/admin",
    canLoad: [AuthGuard],
    loadChildren: () => import("./administration/administration.module").then(m => m.AdministrationModule),
    canActivate:[AuthGuard],
  },
  {
    path: "dashboard",
    canLoad: [AuthGuard],
    loadChildren: () => import("./administration/administration.module").then(m => m.AdministrationModule),
    canActivate:[AuthGuard],
  },
  {
    path: "**",
    redirectTo: "auth"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
