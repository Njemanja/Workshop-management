import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/users';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  constructor(private userService: UserService, private router: Router){}
  korisnickoIme: string;
  lozinka: string;
  poruka: string;
  login(){
    
   if(!this.korisnickoIme || !this.lozinka){
    this.poruka="Niste uneli sve podatke!"

   }else{
    this.userService.adminLogin(this.korisnickoIme, this.lozinka).subscribe((user: User)=>{
      if(user && !user.tip){
        localStorage.setItem("korisnickoIme", user.korisnickoIme)
        this.router.navigate(['/adminPocetna']);
      }else{
        this.poruka="Podaci nisu ispravni!"
      }
    })
   }
  }
}
