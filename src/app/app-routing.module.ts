import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignupComponent } from './signup/signup.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: AuthComponent },
  { path: 'signup', component:SignupComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'PageNotFound', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/PageNotFound' }
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
