import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/users';
import { RadionicaService } from '../radionica.service';
import { UserService } from '../user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private userService: UserService, private router: Router, private servis1: RadionicaService){}
  korisnickoIme: string;
  lozinka: string;
  poruka: string;
  login(){
    let nadjeno=false
    if(!this.korisnickoIme || !this.lozinka){
      this.poruka="Niste uneli sve podatke ili korisnik ne postoji!"
    }else{
      this.userService.login(this.korisnickoIme, this.lozinka).subscribe((user: User)=>{
        if(user){
          nadjeno=true
          if(user.status=="cekanje"){
            alert("Trenutno ste na cekanju za potvrdu registracije. Pokusajte kasnije!")
            this.poruka=""
          }else if(user.status=='neaktivan'){
            alert("Neaktivan- pokusajte registraciju ponovo!")
            this.poruka=""
          }
          else{
            localStorage.setItem('korisnickoIme', this.korisnickoIme);
            if(user.tip==1){
              this.router.navigate(['/user']);
            }else if(user.tip==2){
              this.router.navigate(['/user1']);
            }
            else{
              this.poruka="Podaci nisu ispravni!"
            }
          }
          
        } 
      }, (resp)=>{
        this.poruka=resp['poruka']
      })
    }
   
   
  }
}
