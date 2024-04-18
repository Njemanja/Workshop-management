import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register1',
  templateUrl: './register1.component.html',
  styleUrls: ['./register1.component.css']
})
export class Register1Component {
  constructor(private servis: UserService){}
  ime: string;
  prezime: string;
  lozinka: string;
  lozinka1: string;
  korisnickoIme: string;
  email: string;
  telefon: string;
  nazivOrganizacije: string;
  drzava: string;
  grad: string;
  postanskiBroj: string;
  ulica: string;
  broj: number;
  maticniBrojOrganizacije: string;
  tip: number;
  poruka: string;
  slika: unknown;
  slikaDobra: boolean
  ngOnInit(){
    this.slikaDobra=true
  }
  register(){
    if(this.slikaDobra){
      if(!this.ime || !this.prezime || !this.korisnickoIme || !this.lozinka || !
        this.telefon || !this.email){
          this.poruka="Niste uneli sve podatke!"
        }else{
          if(this.lozinka!=this.lozinka1 ){
            this.poruka="Unete lozinke nisu iste!"
          }else{
            if(this.lozinka.length<8 || this.lozinka.length>16 ||  !/^[a-zA-Z]/.test(this.lozinka[0])
            ||  !/[!@#$%^&*]/.test(this.lozinka) || !/[0-9]/.test(this.lozinka) || !/[A-Z]/.test(this.lozinka)
            ){
              this.poruka="Lozinka nije u dobrom formatu!\nFormat:\nlozinka mora pocinajti slovom,\nmora da ima minimalno 8,\na maksimalno 16 karaktera,\nmora posedovati bar jedan broj,\n veliko slovo i specijalni karakter."
             
            }else{
              if(!this.slika){
                this.slika=""
              }
              if(this.slikaDobra){
                this.servis.register1(this.ime,this.prezime,this.korisnickoIme,this.lozinka,
                  this.telefon,this.email, this.slika, this.nazivOrganizacije, this.drzava
                  , this.grad, this.postanskiBroj, this.ulica, this.broj, this.maticniBrojOrganizacije).subscribe((resp)=>{
                  if(resp['poruka']=='1'){
                    location.reload()
                    alert("Uspesno ste se registrovali!")
                  }
                  else if(resp['poruka']=='2'){
                    this.poruka="Korisnik sa datim email-om ili korisnickim imenom vec postoji!"
                  }
                  else{
                    this.poruka="Niste uneli ispravne podatke!"
                  }
               })
              }
            }
           
          }
        }
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
      this.poruka="Slika mora biti izmedju 100x100px ili 300x300px!"
      this.slikaDobra=false;
    }else{
      this.convertToBase64(file)
      this.slikaDobra=true;
      this.poruka=""
    }
   }else{
    this.poruka="Slika mora biti JPG/PNG!"
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
