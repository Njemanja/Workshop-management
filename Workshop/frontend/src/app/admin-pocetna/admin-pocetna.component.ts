import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminService } from '../admin.service';
import { FileUploadService } from '../file-upload.service';
import { Komentar } from '../models/komentar';
import { Prijave } from '../models/prijave';
import { Radionica } from '../models/radionica';
import { User } from '../models/users';
import { RadionicaService } from '../radionica.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin-pocetna',
  templateUrl: './admin-pocetna.component.html',
  styleUrls: ['./admin-pocetna.component.css']
})
export class AdminPocetnaComponent {
  constructor(private adminServis: AdminService,private servis1: UserService,private fileUploadService: FileUploadService, private servis: RadionicaService){}
  korisnici: User[]=[];
  novaVrednost: any;
  parametar: string;
  korisnickoImeMenjanje: string;
  sveRadionice: Radionica[]=[];
  files: File[]=[];
  naziv: string;
  mesto: string;
  datum1: Date;
  opis: string;
  duziOpis: string;
  poruka: string;
  korisnickoIme: string;
  prijve: Prijave[]=[];
  idRad: number;
  slika: unknown;
  slikaDobra: boolean
  datum: string;
  poruka1: string;
  slika1: unknown;
  parametarRadionice: unknown;
  IDRadioniceAzuriranje: string;
  galerija2: unknown[]=[]
  slikaAzuriranje: unknown;
  parametar1: string;
  file: File = null; // Variable to store file
  ngOnInit(){
    this.slikaDobra=true;
    this.korisnickoIme="admin"
    this.servis1.dohvatiSveKorisnike().subscribe((users: User[])=>{
      this.korisnici=users;
    })
    this.servis.sveRadionice().subscribe((radionice: Radionica[])=>{
      this.sveRadionice=radionice;
    })
  }

  /*azurirajKorisnika(){
    if(!this.novaVrednost || !this.korisnickoImeMenjanje){
      alert("Niste uneli podatke za azuriranje");
    }else{
      this.servis1.dohvatiSveKorisnike().subscribe((users: User[])=>{
        this.korisnici=users;
        let greska=false
        if(this.parametar=="korisnickoIme" || this.parametar=="email"){
          this.korisnici.forEach(element => {
              if(element.korisnickoIme==this.novaVrednost){
                alert("Korisnicko ime vec postoji")
                greska=true;
              }
              if(element.email==this.novaVrednost){
                alert("Email ime vec postoji")
                greska=true;
              }
          });
        }
        if(!greska){
          this.servis1.azurirajKorisnika(this.korisnickoImeMenjanje,this.parametar ,this.novaVrednost).subscribe((resp)=>{
            if(resp){
              alert(resp['poruka'])
              location.reload()
            }
            location.reload()
          })
        
        }
      })
    }

  }*/

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
      this.poruka1="Slika mora biti izmedju 100x100px ili 300x300px!"
      this.slikaDobra=false;
    }else{
      this.convertToBase64(file)
      this.slikaDobra=true;
      this.poruka1=""
    }
   }else{
    this.poruka1="Slika mora biti JPG/PNG!"
    this.slikaDobra=false;
   }
  }


  ucitajSliku1(event){
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
      this.poruka1=""
   }else{
    this.poruka1="Slika mora biti JPG/PNG!"
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

  


  azuriraj(){
    if(this.parametar=="slika"){
      this.novaVrednost=this.slika1
    }
    if(!this.novaVrednost || !this.slikaDobra || !this.korisnickoImeMenjanje || !this.parametar){
      alert("Niste uneli podatke za azuriranje ili parametri nisu dobri!");
    }else{
      this.servis1.azuriraj1(this.novaVrednost, this.parametar,this.korisnickoImeMenjanje).subscribe((resp)=>{
        alert(resp['poruka'])
        location.reload()
      })
    }
  }
  obrisiKorisnika(korisnickoIme){
    this.servis1.obrisiKorisnika(korisnickoIme).subscribe((resp)=>{
      if(resp){
        alert(resp['poruka']);
        location.reload()
      }
      location.reload()
    })
  }
  obrisiRadionicu(idRad){
    this.adminServis.obrisiRadionicu(idRad).subscribe((resp)=>{
      if(resp){
        alert(resp['poruka']);
        location.reload()
      }
      location.reload()
    })
    location.reload()
  }
  prihvatiRadionicu(idRad, korisnickoIme){
      this.servis.prijave(korisnickoIme).subscribe((prijave: Prijave[])=>{
        if(prijave.length>0){
          alert("Korisnik ima aktivne prijave!");
        }else{
          this.adminServis.prihvatiRadionicu(idRad, korisnickoIme).subscribe((resp)=>{
            location.reload()
          })
        }
      })
     
  }
  /*azurirajRadionicu(){
    this.servis.sveRadionice().subscribe((radionice: Radionica[])=>{
      this.sveRadionice=radionice;
      let nadjenaRadionica= false;
      this.sveRadionice.forEach(element => {
          
          if(element.id==this.idRad){
            nadjenaRadionica=true;
          }

      });
      if(nadjenaRadionica){
        let posalji=false
        if(this.parametar=="datum"){
          if(this.datum1){
            this.novaVrednost=this.datum1
            posalji=true
          }
          else{
            alert("Niste uneli datum!")
          }
         
        }else if(this.parametar=="slika"){
          if(this.file){
            posalji=true
            this.novaVrednost=this.file
          }
          else{
            alert("Niste uneli sliku!")
          }
         
        }
        else{
          if(this.novaVrednost){
            posalji=true
          }else{
            alert("Niste uneli parametar!")
          }
        }
        if(posalji){
          this.adminServis.azurirajRadionicu(this.idRad, this.parametar, this.novaVrednost).subscribe((resp)=>{
            location.reload()
          })
        }
       
      }else{
        alert("Nije dobar ID!")
      }
    })
    
  }*/


  azurirajRadionicu(){
    if(!this.parametar1 || !this.IDRadioniceAzuriranje){
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
        this.adminServis.azurirajRadionicu(this.IDRadioniceAzuriranje, this.parametar1, this.novaVrednost).subscribe((resp)=>{
          alert(resp);
      })
      }else{
        alert("Niste uneli novu vrednost!")
      }
     
    }
  }
// On file Select
onChange(event) {
  this.file = event.target.files[0];
}

// OnClick of button Upload
/*onUpload() {
  let min=100*100
  let max=300*300
  if(this.file.size > max || this.file.size < min){
    alert("Slika je prevelika ili premala!")
  }else{
    this.fileUploadService.upload(this.file).subscribe(
      (event: any) => {
          if (typeof (event) === 'object') {

          }
      }
  );
}
}*/

potvrdi(){
if(!this.datum || this.duziOpis=="" || this.mesto=="" || this.naziv=="" ||
!this.datum){
  this.poruka1="Niste uneli sve podatke!";
}else{
  let datum1=new Date(this.datum)
  let razlikaDatuma=datum1.getTime()-Date.now()
  if(razlikaDatuma<=0){
    this.poruka1="Nepravilan datum"
  }
  else if(this.files.length>5){
    this.poruka1="Mozete dodati najive 5 slika!"
  }
  else{
    this.servis.sveRadionice().subscribe((data: Radionica[])=>{
        if(data){
          this.sveRadionice=data;
        }
        this.sortirajId();
        this.servis.dodajRadionicu(this.sveRadionice[0].id+1, this.naziv,this.datum,this.mesto,
        this.opis,this.slika,0,Array<Komentar>,this.galerija,this.korisnickoIme,0, this.duziOpis, 20).subscribe((resp)=>{
            if(resp){
              alert(resp['poruka'])
            }
            location.reload();

        })
    })
    
  }
}

}
sortirajId(){
  this.sveRadionice.sort((n1,n2) => {
    if (n1.id > n2.id) {
        return -1;
    }

    if (n1.id < n2.id) {
        return 1;
    }

    return 0;
});
}


galerija: unknown[]=[];
slobodnaMesta: number;
obrisiGaleriju(){
  this.galerija=[]
  this.poruka=""
}
obrisiGaleriju2(){
  this.galerija2=[]
  this.poruka=""
}
convertToBase64_Galerija(file){
  let ob=new Observable((subscriber)=>{
    this.readFile(file, subscriber)
  })
  ob.subscribe((slika)=>{
    this.galerija.push(slika)
  })
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
readFile(file, subscriber){
  let reader=new FileReader();
  reader.readAsDataURL(file);
  reader.onload=()=>{
    subscriber.next(reader.result);
    subscriber.complite()
  }
}
obrisiSlikuIzGalerije2(g){
  let indexToRemove = this.galerija2.findIndex(function(element) {
    return element === g;
});

if (indexToRemove !== -1) {
    this.galerija.splice(indexToRemove, 1);
}
}








obrisiSlikuIzGalerije(g){
  let indexToRemove = this.galerija.findIndex(function(element) {
    return element === g;
});

if (indexToRemove !== -1) {
    this.galerija.splice(indexToRemove, 1);
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
      }else{
        alert("Fajl nije JSON!")
      }

      
    };

    fileReader.readAsText(file);
  }
  obrisiSliku(){
    this.slika=null
    this.poruka=""
  }
  
}
