import { Binary } from '@angular/compiler';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-azuriranje-podataka',
  templateUrl: './azuriranje-podataka.component.html',
  styleUrls: ['./azuriranje-podataka.component.css']
})
export class AzuriranjePodatakaComponent {
  constructor(private userService: UserService, private router: Router){}
  lozinka: string;
  lozinka1: string;
  ime: string;
  prezime: string;
  email: string;
  korisnickoIme: string;
  telefon: string;
  staraLozinka: string;
  slika: unknown;
  slikaDobra: boolean;
  azurirajIme(){
    if(this.ime){
      this.userService.azuriraj(this.ime, "ime", "").subscribe((resp)=>{
        alert(resp['poruka'])
        location.reload()
       })
    }else{
      alert("Unesite podatak!")
    }
   
    
  }
  azurirajPrezime(){
    if(this.prezime){
      this.userService.azuriraj(this.prezime, "prezime", "").subscribe((resp)=>{
        alert(resp['poruka'])
        location.reload()
       })
    }else{
      alert("Unesite podatak!")
    }
    
  }
  azurirajEmail(){
    if(this.email){
      this.userService.azuriraj(this.email, "email", "").subscribe((resp)=>{
        alert(resp['poruka'])
        location.reload()
       })
    }else{
      alert("Unesite podatak!")
    }
  }
  azurirajKorisnickoIme(){
    if(this.korisnickoIme){
      this.userService.azuriraj(this.korisnickoIme, "korisnickoIme", "").subscribe((resp)=>{
        alert(resp['poruka'])
        if(resp['poruka']=="Uspesno ste promenili korisnicko ime!"){
          localStorage.setItem('korisnickoIme',this.korisnickoIme)
        }
        location.reload()
       
       })
    }else{
      alert("Unesite podatak!")
    }
    
  }
  azurirajTelefon(){
    if(this.telefon){
      this.userService.azuriraj(this.telefon, "telefon", "").subscribe((resp)=>{
        alert(resp['poruka'])
        location.reload()
       })
    }else{
      alert("Unesite podatak!")
    }
  
  }
  azurirajSliku(){
    if(this.slika && this.slikaDobra){
      this.userService.azuriraj(this.slika, "slika", "").subscribe((resp)=>{
        alert(resp['poruka'])
        location.reload()
       })
    }else{
      alert("Unesite podatak ili niste uneli u dobrom formatu!")
    }
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
            this.router.navigate([''])
          }
        })
       
      }
      
    }else{
      alert("Unesite podatak!")
    }
  }


  ucitajSliku(event){
    let dobra=true
    let file= (event.target as HTMLInputElement).files[0]
    var ext = file.name.substr(file.name.lastIndexOf('.') + 1)
    if(ext!="jpg"){
      dobra=false 
    }
    if(ext=="png"){
      dobra=true
    }
    
   if(dobra){
    if(file.size>100*100 || file.size>300*300){
      alert("Slika mora biti izmedju 100x100px ili 300x300px!")
      this.slikaDobra=false;
    }else{
      this.convertToBase64(file)
      this.slikaDobra=true;
     
    }
   }else{
   alert("Slika mora biti JPG/PNG!")
    this.slikaDobra=false;
   }
  }

  convertToBase64(file){
    let ob=new Observable((subscriber)=>{
      this.readFile(file, subscriber)
    })
    ob.subscribe((slika)=>{
      this.slika=slika;
    })
  }

  readFile(file, subscriber){
    let reader=new FileReader();
    reader.readAsDataURL(file);
    reader.onload=()=>{
      subscriber.next(reader.result);
      subscriber.complite()
    }
  }

  obrisiSliku(){
    //document.getElementById("image").remove()
    this.slika=null
  }

}
