import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Register1Component } from './register1/register1.component';
import { User1Component } from './user1/user1.component';
import { NovaLozinkaComponent } from './nova-lozinka/nova-lozinka.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { AdminPocetnaComponent } from './admin-pocetna/admin-pocetna.component';
import { NeregistrovaniComponent } from './neregistrovani/neregistrovani.component';
import { ProfilComponent } from './profil/profil.component';
import { AzuriranjePodatakaComponent } from './azuriranje-podataka/azuriranje-podataka.component';
import { MojeRadioniceComponent } from './moje-radionice/moje-radionice.component';
import { PostaniOrganizatorComponent } from './postani-organizator/postani-organizator.component';
import { InformacijeRadioniceComponent } from './informacije-radionice/informacije-radionice.component';
import { OrganizatorCaskanjaComponent } from './organizator-caskanja/organizator-caskanja.component';
import { CommonModule } from '@angular/common';
import { NgImageSliderModule } from 'ng-image-slider';
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    AdminComponent,
    Register1Component,
    User1Component,
    NovaLozinkaComponent,
    PromenaLozinkeComponent,
    AdminPocetnaComponent,
    NeregistrovaniComponent,
    ProfilComponent,
    AzuriranjePodatakaComponent,
    MojeRadioniceComponent,
    PostaniOrganizatorComponent,
    InformacijeRadioniceComponent,
    OrganizatorCaskanjaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgImageSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
