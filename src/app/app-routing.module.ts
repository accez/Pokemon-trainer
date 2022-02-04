import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { GuardAuthGuard } from './guard-auth.guard';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TryToGuardComponent } from './try-to-guard/try-to-guard.component';

const routes: Routes = [
  { 
    path: '',   redirectTo: '/landing-page', pathMatch: 'full' 
  },
  {
    path: 'landing-page',
    component: LandingPageComponent
  },
  {
    path:'try',
    component:TryToGuardComponent,
    canActivate: [GuardAuthGuard]
  },
  { 
    path: '**', component: PageNotFoundComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthService]
})
export class AppRoutingModule { }
