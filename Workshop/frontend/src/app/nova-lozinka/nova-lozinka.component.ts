import { Component } from '@angular/core';
import { User } from '../models/users';
import { UserService } from '../user.service';

@Component({
  selector: 'app-nova-lozinka',
  templateUrl: './nova-lozinka.component.html',
  styleUrls: ['./nova-lozinka.component.css']
})
export class NovaLozinkaComponent {
  email: string;
  novaLozinka: string;
  constructor(private servis: UserService){}
  generisiLozinku(){
    
    if(this.email){
    let novaLozinka= Array(10).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$").map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('');;
    let a=/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]/.test(novaLozinka)
    while(!a){
      novaLozinka=Array(10).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$").map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('');;
      a=/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]/.test(novaLozinka)
    }
    novaLozinka='n'+novaLozinka

    this.servis.dohvatiSveKorisnike().subscribe((data: User[])=>{
      let nadjeno=false;
      data.forEach(element => {
        if(element.email==this.email){
          nadjeno=true;
          this.servis.novaLozinka(this.email,novaLozinka).subscribe((resp)=>{
            if(resp['poruka']=='1'){
              alert("Poslali smo Vam poruku na mail adresu!")
            }else{
              alert("Molimo Vas proverite mail!")
            }
          });
        }
        
      });
      if(!nadjeno){
        alert("Korisnik sa datim emailom ne postoji!")
      }
    })
    }else{
      alert("Molimo unesite email!")
    }
  }
}
