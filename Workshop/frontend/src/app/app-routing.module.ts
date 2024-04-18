import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPocetnaComponent } from './admin-pocetna/admin-pocetna.component';
import { AdminComponent } from './admin/admin.component';
import { AzuriranjePodatakaComponent } from './azuriranje-podataka/azuriranje-podataka.component';
import { InformacijeRadioniceComponent } from './informacije-radionice/informacije-radionice.component';
import { LoginComponent } from './login/login.component';
import { MojeRadioniceComponent } from './moje-radionice/moje-radionice.component';
import { NeregistrovaniComponent } from './neregistrovani/neregistrovani.component';
import { NovaLozinkaComponent } from './nova-lozinka/nova-lozinka.component';
import { OrganizatorCaskanjaComponent } from './organizator-caskanja/organizator-caskanja.component';
import { PostaniOrganizatorComponent } from './postani-organizator/postani-organizator.component';
import { ProfilComponent } from './profil/profil.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { RegisterComponent } from './register/register.component';
import { Register1Component } from './register1/register1.component';
import { UserComponent } from './user/user.component';
import { User1Component } from './user1/user1.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'user', component: UserComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'adminPocetna/lozinka', component: PromenaLozinkeComponent},
  {path: 'user1/lozinka', component: PromenaLozinkeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'register1', component: Register1Component},
  {path: 'user1', component: User1Component},
  {path: 'user/promenaLozinke', component: PromenaLozinkeComponent},
  {path: 'adminPocetna', component: AdminPocetnaComponent},
  {path: 'neregistrovaniKorisnik', component: NeregistrovaniComponent},
  {path: 'novaLozinka', component: NovaLozinkaComponent},
  {path: 'user/profil', component: ProfilComponent},
  {path: 'user/profil/azuriranjePodataka', component: AzuriranjePodatakaComponent},
  {path: 'user/mojeRadionice', component: MojeRadioniceComponent},
  {path: 'user/postaniOrganizator', component: PostaniOrganizatorComponent},
  {path: 'user/mojeRadionice/informacije/:id', component: InformacijeRadioniceComponent},
  {path: 'user1/caskanja/:id', component: OrganizatorCaskanjaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
