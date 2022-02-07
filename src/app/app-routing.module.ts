import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { CataloguePageComponent } from './catalogue-page/catalogue-page.component';
import { GuardAuthGuard } from './guard-auth.guard';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PokemonDetailedPageComponent } from './pokemon-detailed-page/pokemon-detailed-page.component';
import { TrainerPageComponent } from './trainer-page/trainer-page.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/landing-page', pathMatch: 'full'
  },
  {
    path: 'landing-page',
    component: LandingPageComponent
  },{
    path: 'catalogue',
    component: CataloguePageComponent,
    canActivate:[GuardAuthGuard]
  },{
    path: 'detailed/:id',
    component: PokemonDetailedPageComponent,
    canActivate:[GuardAuthGuard]
  },
  {
    path: 'trainer',
    component: TrainerPageComponent,
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
