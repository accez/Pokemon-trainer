import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MaterialModule } from './helper/material-module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'

import { CataloguePageComponent } from './catalogue-page/catalogue-page.component';
import { PokemonDetailedPageComponent } from './pokemon-detailed-page/pokemon-detailed-page.component';
import { NavbarComponent } from './navbar/navbar.component'
import { TrainerPageComponent } from './trainer-page/trainer-page.component'

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    CataloguePageComponent,
    PageNotFoundComponent,
    PokemonDetailedPageComponent,
    NavbarComponent,
    TrainerPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
