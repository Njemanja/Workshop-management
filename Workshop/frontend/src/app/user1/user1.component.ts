import { Component } from '@angular/core';
import { Radionica } from '../models/radionica';
import { User } from '../models/users';
import { RadionicaService } from '../radionica.service';
import { UserService } from '../user.service';
import * as fs from 'fs';
import { Prijave } from '../models/prijave';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Komentar } from '../models/komentar';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-user1',
  templateUrl: './user1.component.html',
  styleUrls: ['./user1.component.css']
})
export class User1Component {
  sveRadionica: Radionica[]=[]
  korisnik: User
  korisnickoIme: string
  svePrijave: Prijave[]=[];
  sviKorisnici: User[]=[]
  prijaveZaMojeRad: Prijave[]= [];
  naziv: String;
  datum: string;
  opis: String;
  duziOpis: string;
  mesto: string;
  slika: unknown;
  galerija: unknown[]=[];
  slobodnaMesta: number;
  slikaDobra=false;
  poruka: string;
  constructor(private servis: UserService, private servisRad: RadionicaService, private sanitizer: DomSanitizer){}

  ngOnInit(){
      this.galerija=[];
      this.korisnickoIme=localStorage.getItem("korisnickoIme")
      this.servis.dohvatiKorisnika(this.korisnickoIme).subscribe((user: User)=>{
        if(user){
          this.korisnik=user;
        }
      })
      this.servisRad.sveRadionice().subscribe((data: Radionica[])=>{
        this.sveRadionica=data;
        this.servisRad.prijave1().subscribe((prijave: Prijave[])=>{
          this.svePrijave=prijave
          this.sveRadionica.forEach(element => {
            if(element.organizator==this.korisnickoIme){
              this.svePrijave.forEach(element1 => {
                if(element1.idRad==element.id){
                  this.prijaveZaMojeRad.push(element1)
                }
              });
            }
          });
      })
      })
      
   
  }

fileUrl;
uploadFile(event) {
  
    const file = event.target.files[0];
    const fileReader = new FileReader();
    var f= file.name.substr(file.name.lastIndexOf('.') + 1)

    fileReader.onload = () => {
      if(f=="json"){
        const jsonData = ""+fileReader.result;
        const data = JSON.parse(jsonData);
        this.mesto=data.mesto;
        this.naziv=data.naziv;
        this.slika=data.slika;
        this.datum = new Date(data.datum).toISOString().substring(0, 16);
        this.galerija=data.galerija
        this.opis=data.opis;
        this.duziOpis=data.duziOpis;
        this.slobodnaMesta=data.slobodnaMesta;
      }else{
        alert("Fajl nije JSON!")
      }

      
    };

    fileReader.readAsText(file);
  }
ucitajSliku(event){
  this.poruka=""
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
  this.convertToBase64(file)
  this.slikaDobra=true;
  this.poruka=""
 }else{
  this.poruka="Slika mora biti JPG/PNG!"
  this.slikaDobra=false;
 }
}
ucitajGaleriju(event){
  this.galerija=[];
  if((event.target as HTMLInputElement).files.length>5){
      alert("Ne moze vise od 5 slika!")
  }else{
    for(let i=0;i<(event.target as HTMLInputElement).files.length; i++){
      let dobra=true
      let file= (event.target as HTMLInputElement).files[i]
      var ext = file.name.substr(file.name.lastIndexOf('.') + 1)
      if(ext!="jpg"){
        dobra=false 
      }
      if(ext=="png"){
        dobra=true
      }
      if(dobra){
        this.convertToBase64_Galerija(file)
      }
    }
  }
  
}
sortirajId(){
  this.sveRadionica.sort((n1,n2) => {
    if (n1.id > n2.id) {
        return -1;
    }

    if (n1.id < n2.id) {
        return 1;
    }

    return 0;
});
}
potvrdi(){
  if(!this.datum || this.duziOpis=="" || this.mesto=="" || this.naziv=="" ||
  !this.datum || !this.slika || !this.slobodnaMesta){
    this.poruka="Niste uneli sve podatke!";
  }else{
    let datum1=new Date(this.datum)
    let razlikaDatuma=datum1.getTime()-Date.now()
    if(razlikaDatuma<=0){
      this.poruka="Nepravilan datum"
    }
    else if(this.galerija.length>5 || this.slobodnaMesta<=0){
      this.poruka="Mozete dodati najive 5 slika i broj mesta mora biti veci od nule!"
    }
    else{
      this.servisRad.sveRadionice().subscribe((data: Radionica[])=>{
          if(data){
            this.sveRadionica=data;
          }
          this.sortirajId();
          this.servisRad.dodajRadionicu(this.sveRadionica[0].id+1, this.naziv,this.datum,this.mesto,
          this.opis,this.slika,0,Array<Komentar>,this.galerija,this.korisnickoIme,0, this.duziOpis, this.slobodnaMesta).subscribe((resp)=>{
              if(resp){
                alert(resp['poruka'])
              }

          })
      })
      
    }
  }
  
}
  

convertToBase64_Galerija(file){
  let ob=new Observable((subscriber)=>{
    this.readFile(file, subscriber)
  })
  ob.subscribe((slika)=>{
    this.galerija.push(slika)
  })
}

convertToBase64(file){
  let ob=new Observable((subscriber)=>{
    this.readFile(file, subscriber)
  })
  ob.subscribe((slika)=>{
    this.slika=slika;
  })
}

obrisiSlikuIzGalerije(g){
  let indexToRemove = this.galerija.findIndex(function(element) {
    return element === g;
});

if (indexToRemove !== -1) {
    this.galerija.splice(indexToRemove, 1);
}
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
  this.slika=null
  this.poruka=""
}
obrisiGaleriju(){
  this.galerija=[]
  this.poruka=""
}
  sacuvaj(idRad){
    this.sveRadionica.forEach(element => {
        if(element.id==idRad){
          let data = {
            mesto: element.mesto,
            datum: element.datum,
            slika: element.slika,
            naziv: element.naziv,
            opis: element.opis,
            duziOpis: element.duziOpis,
            galerija: element.galerija,
            slobodnaMesta: element.slobodnaMesta
          }
          const jsonData = JSON.stringify(data);
          const jsonBlob = new Blob([jsonData], {type: 'application/json'});
          const url = URL.createObjectURL(jsonBlob);
          const link = document.createElement('a');
          link.href = url;
          link.download ="Radionica_"+element.id+ '.json';
          link.click();

        }
      
    }); 
  }
  otkazi(idRad){
    this.servisRad.prijave1().subscribe((prijave: Prijave[])=>{
      this.svePrijave=prijave
      this.servis.dohvatiSveKorisnike().subscribe((korisnici: User[])=>{
        this.sviKorisnici=korisnici;
        this.svePrijave.forEach(element => {
          if(element.idRad==idRad){
            this.sviKorisnici.forEach(element1 => {
              if(element1.korisnickoIme==element.korisnickoIme){
                this.servisRad.posaljiZaOtkazivanje(idRad, element1.email).subscribe(()=>{

                })
              }
            });
          }
        });


      })
    })
  }
  prihvati(idRad, koriscnikoIme){
    this.servisRad.sveRadionice().subscribe((data: Radionica[])=>{
      let slobodno=false
      data.forEach(element => {
        if(element.id==idRad && element.slobodnaMesta>0){
          slobodno=true
        }
      });
      if(slobodno){
        this.servisRad.prihvati(idRad, koriscnikoIme).subscribe(()=>{
          location.reload()
        })
      }else{
        alert("Nema mesta na radionici broj: "+idRad)
      }

    })
   
    
  }


  parametar1: string;
  novaVrednost: unknown;
  slikaAzuriranje: unknown;
  galerija2: unknown[]=[]
  parametarRadionice: string;
  poruka1: string;
  id:string;
  azurirajRad(id){
    this.id=id;
    window.scrollTo(0, document.body.scrollHeight);
  }

  azurirajRadionicu(){
   
    if(!this.parametar1 || !this.id){
        alert("Niste uneli parametar za azuriranje ili ID radionice!")
    }else{
      this.novaVrednost=null;
      if(this.parametar1=="slika" && this.slikaAzuriranje){
        this.novaVrednost=this.slikaAzuriranje
      }else if(this.parametar1=="galerija" && this.galerija2){
        this.novaVrednost=this.galerija2
      }
      else if(this.parametar1=="datum" && this.datum){
        this.novaVrednost=this.datum
      }
      else{
        if(this.parametarRadionice){
          this.novaVrednost=this.parametarRadionice
        }
      }
      if(this.novaVrednost){
        this.servisRad.azurirajRadionicu(this.id, this.parametar1, this.novaVrednost).subscribe((resp)=>{
          alert(resp);
      })
      }else{
        alert("Niste uneli novu vrednost!")
      }
     
    }
  }

  ucitajSliku2(event){
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
      this.convertToBase64_2(file)
      this.slikaDobra=true;
      this.poruka1=""
   }else{
    this.poruka1="Slika mora biti JPG/PNG!"
    this.slikaDobra=false;
   }
  }
  convertToBase64_2(file){
    let ob=new Observable((subscriber)=>{
      this.readFile(file, subscriber)
    })
    ob.subscribe((slika)=>{
      this.slikaAzuriranje=slika;
    })
  }
  obrisiSliku2(){
    this.slikaAzuriranje=null
    this.poruka=""
  }
  ucitajGaleriju2(event){
    this.galerija2=[];
    if((event.target as HTMLInputElement).files.length>5){
        alert("Ne moze vise od 5 slika!")
    }else{
      for(let i=0;i<(event.target as HTMLInputElement).files.length; i++){
        let dobra=true
        let file= (event.target as HTMLInputElement).files[i]
        var ext = file.name.substr(file.name.lastIndexOf('.') + 1)
        if(ext!="jpg"){
          dobra=false 
        }
        if(ext=="png"){
          dobra=true
        }
        if(dobra){
          this.convertToBase64_Galerija2(file)
        }
      }
    }
    
  }
  convertToBase64_Galerija2(file){
    let ob=new Observable((subscriber)=>{
      this.readFile(file, subscriber)
    })
    ob.subscribe((slika)=>{
      this.galerija2.push(slika)
    })
  }
  obrisiSlikuIzGalerije2(g){
    let indexToRemove = this.galerija2.findIndex(function(element) {
      return element === g;
  });
  
  if (indexToRemove !== -1) {
      this.galerija.splice(indexToRemove, 1);
  }
  }
  obrisiGaleriju2(){
    this.galerija2=[]
    this.poruka=""
  }








}
