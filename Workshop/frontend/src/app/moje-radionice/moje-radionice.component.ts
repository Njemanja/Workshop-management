import { Component } from '@angular/core';
import { CelaPrijava } from '../models/celaPrijava';
import { Komentar } from '../models/komentar';
import { Lajk } from '../models/lajk';
import { Obavesti } from '../models/obavesti';
import { Poruka } from '../models/poruka1';
import { Prijave } from '../models/prijave';
import { Radionica } from '../models/radionica';
import { User } from '../models/users';
import { RadionicaService } from '../radionica.service';
import { UserService } from '../user.service';
import * as fs from 'fs';
import { DomSanitizer } from '@angular/platform-browser';
import { elementAt } from 'rxjs';
@Component({
  selector: 'app-moje-radionice',
  templateUrl: './moje-radionice.component.html',
  styleUrls: ['./moje-radionice.component.css']
})
export class MojeRadioniceComponent {
  constructor(private servis: RadionicaService, private servis1: UserService, private sanitizer: DomSanitizer){}
  korisnickoIme: string;
  mojePrijave: Prijave[]=[];
  sveRadionice: Radionica[]=[];
  celePrijave: CelaPrijava[]=[]
  lajk: boolean;
  lajkovi: Lajk[]=[];
  komentar: Komentar[]=[];
  dataNew: any = {};
  dataNew1: any = {};
  korisnik: User;
  sve: Radionica[]=[];
  porukaZaOrganizatora: string;
  fileUrl;
  ngOnInit(): void{
      /*const data = 'some text';
      const jsonData = JSON.stringify(data);
      const jsonBlob = new Blob([jsonData], {type: 'application/json'});

      this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(jsonBlob));*/
      this.korisnickoIme=localStorage.getItem("korisnickoIme")
      this.servis1.dohvatiKorisnika(this.korisnickoIme).subscribe((data: User)=>{
        if(data){
          this.korisnik=data;
        }
      })
    this.servis.prijave(this.korisnickoIme).subscribe((data: Prijave[])=>{
      this.servis.sveRadionice().subscribe((data1: Radionica[])=>{
          data1.forEach(element => {
            let datum1= Date.now()
            let datum2=new Date(element.datum)
            let datum3=datum2.getTime()
            if((datum1-datum3)<0 && element.status!=0){
               this.sve.push(element)
            }
          });
          this.mojePrijave=data;
          this.sveRadionice=data1;
          this.mojePrijave.forEach(element => {
              let celaPrijava= new CelaPrijava();
              let nasao=true;
              data1.forEach(element1 => {
                  if(element.idRad==element1.id && nasao){
                    celaPrijava.datum=element1.datum;
                    celaPrijava.idRad=element.idRad;
                    celaPrijava.mesto=element1.mesto;
                    celaPrijava.naziv=element1.naziv;
                    celaPrijava.brojLajkova=element1.brojLajkova;
                    celaPrijava.komentari=element1.komentari;
                    celaPrijava.status=element.status;
                    let datum1 = Date.now();
                    let datum2 = new Date(celaPrijava.datum).getTime();
                    let time = datum2 - datum1;  //msec
                    if(time<0){
                      celaPrijava.zavrsena=true;
                    }else{
                      celaPrijava.zavrsena=false;
                    }
                    let hoursDiff = time / (3600 * 1000);
                    if(hoursDiff>12){
                      celaPrijava.nemaVremena=true;
                    }else{
                      celaPrijava.nemaVremena=false;
                    }
                    this.celePrijave.push(celaPrijava);
                    nasao=false;
                  }
              });
          });
          
      })
    })
    this.servis.sviLajkovi().subscribe((data2: Lajk[])=>{
      this.lajkovi=data2;
    })
  }

  obrisiPrijavu(idRad){
    
    this.servis.obrisiPrijavu(this.korisnickoIme, idRad).subscribe(()=>{
      this.servis.svaObavestenja(idRad).subscribe((data: Obavesti[])=>{
        data.forEach(element => {
          this.servis1.posaljiMejl(idRad, element.email).subscribe((resp)=>{
           
          })
        });
        this.servis.obrisiObavestene(idRad).subscribe((data: Obavesti[])=>{})
        location.reload();
      })
      
    })
    
  }
  dodajLajk(idRad){
    this.servis.dodajLajk(this.korisnickoIme, idRad).subscribe((resp)=>{
      if(resp){
        location.reload();
      }
      location.reload();
    })
    
  }
  dodajKomentar(idRad, i){
    
    if(this.dataNew[i]){
      this.servis.dodajKomentar(this.korisnickoIme, idRad, this.korisnik.slika, this.dataNew[i]).subscribe((resp)=>{
        if(resp){
          location.reload();
        }
        location.reload();
      })
    }
   
    
  }

  posaljiPoruku(idRad, i){
    let nova= new Poruka();
    nova.datum=new Date();
    nova.from=this.korisnickoIme;
    nova.poruka=this.dataNew1[i];

    this.servis.posaljiPoruku(idRad,nova, this.korisnickoIme).subscribe((res)=>{
      alert("Uspesno ste poslali poruku")
    })
  }

  dodajZaObavestenje(idRad){
    let posalji=true;
    let prijavljen=false;
    this.servis.svaObavestenja(idRad).subscribe((data: Obavesti[])=>{
      data.forEach(element => {
        if(element.email==this.korisnik.email){
          posalji=false;
        }
      });
      this.servis.prijave(this.korisnickoIme).subscribe((data1: Prijave[])=>{
        data1.forEach(element1 => {
            if(element1.idRad==idRad){
              prijavljen=true;
            }
        });

        if(prijavljen){
          alert("Vi ste prijavljeni na radionici!")
        }else{
          if(posalji){
            alert("Uspesno ste prijavljeni za obavestenje!")
            this.servis.sacuvajZaObavestenje(idRad, this.korisnik.email).subscribe((resp)=>{
            })
          }
          else{
            alert("Vec ste se prijavili da bute obavesteni!")
          }
        }


      })
      
    })
   
  }

  prijaviMe(idRad, datum){
    let prijavi=true;
    this.servis.prijave(this.korisnik.korisnickoIme).subscribe((resp: Prijave[])=>{
      
      resp.forEach(element => {
        if(element.idRad==idRad){
          prijavi=false
        }
        
      });
      if(prijavi){
        this.servis.prijaviMe(idRad, datum,this.korisnik.korisnickoIme).subscribe((resp)=>{
        })
      }else{
        alert("Vec ste se prijavili!")
      }
    })
   
    
  }
}
