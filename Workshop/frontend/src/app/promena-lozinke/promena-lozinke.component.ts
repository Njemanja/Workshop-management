import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { Location } from '@angular/common'
@Component({
  selector: 'app-promena-lozinke',
  templateUrl: './promena-lozinke.component.html',
  styleUrls: ['./promena-lozinke.component.css']
})
export class PromenaLozinkeComponent {
 
  constructor(private userService: UserService,private router: Router,private location: Location){}
  lozinka: string;
  lozinka1: string;
  korisnickoIme: string;
  staraLozinka: string;
   url: string;
  ngOnInit(){
    this.korisnickoIme=localStorage.getItem("korisnickoIme")
    let url = this.location.path();
    this.url=(url.split('/'))[1];
  }

  azurirajLozinku(){
    if(this.lozinka && this.lozinka1){
      if(this.lozinka!=this.lozinka1){
        alert("Unete lozinke nisu iste!")
      }else if( this.lozinka.length<8 || this.lozinka.length>16 ||  !/^[a-zA-Z]/.test(this.lozinka[0])
      ||  !/[!@#$%^&*]/.test(this.lozinka) || !/[0-9]/.test(this.lozinka) || !/[A-Z]/.test(this.lozinka)
      ){
        alert("Lozinka nije u dobrom formatu!")
      }else{
        let a=this.lozinka
        this.korisnickoIme=localStorage.getItem("korisnickoIme")
        this.userService.promenaLozinke(this.korisnickoIme,this.staraLozinka,a).subscribe((resp)=>{
          alert(resp['poruka'])
          if(resp['poruka']=='Uspesno ste promenili lozinku!'){
            this.router.navigate(['admin'])
          }
        })
       
      }   
    }else{
      alert("Unesite podatak!")
    }
  }
}
