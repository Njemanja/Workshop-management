import { IfStmt } from '@angular/compiler';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FileUploadService } from '../file-upload.service';
import { Komentar } from '../models/komentar';
import { Radionica } from '../models/radionica';
import { RadionicaService } from '../radionica.service';

@Component({
selector: 'app-postani-organizator',
templateUrl: './postani-organizator.component.html',
styleUrls: ['./postani-organizator.component.css']
})
export class PostaniOrganizatorComponent {
file: File = null; // Variable to store file
files: File[]=[];
naziv: string;
mesto: string;
datum: Date;
opis: string;
duziOpis: string;
poruka: string;
korisnickoIme: string;
sveRadionce: Radionica[]=[];
slika: unknown;
slikaDobra: boolean;
galerija: unknown[]=[];
slobodnaMesta: Number;
// Inject service 
constructor(private fileUploadService: FileUploadService, private servis: RadionicaService) { }

ngOnInit(): void {
  this.galerija=[]
  this.korisnickoIme=localStorage.getItem("korisnickoIme")
  this.slikaDobra=true
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

convertToBase64_Galerija(file){
  this.galerija=[]
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



potvrdi(){
  if(!this.datum || this.duziOpis=="" || this.mesto=="" || this.naziv=="" ||
  !this.datum || !this.slika){
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
      this.servis.sveRadionice().subscribe((data: Radionica[])=>{
          if(data){
            this.sveRadionce=data;
          }
          this.sortirajId();
          this.servis.dodajRadionicu(this.sveRadionce[0].id+1, this.naziv,this.datum,this.mesto,
          this.opis,this.slika,0,Array<Komentar>,this.galerija,this.korisnickoIme,0, this.duziOpis, this.slobodnaMesta).subscribe((resp)=>{
              if(resp){
                alert(resp['poruka'])
              }

          })
      })
      
    }
  }
  
}
sortirajId(){
  this.sveRadionce.sort((n1,n2) => {
    if (n1.id > n2.id) {
        return -1;
    }

    if (n1.id < n2.id) {
        return 1;
    }

    return 0;
});
}



}