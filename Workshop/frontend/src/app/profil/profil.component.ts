import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { range } from 'rxjs';
import { Radionica } from '../models/radionica';
import { User } from '../models/users';
import { RadionicaService } from '../radionica.service';
import { UserService } from '../user.service';
import { Prisustvo } from '../models/prisustvo';
import { Lajk } from '../models/lajk';
import { Komentar } from '../models/komentar';
import { mojiKomentari } from '../models/mojiKomentari';
import { Poruke } from '../models/poruka';
import { Data } from 'ws';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { Poruka } from '../models/poruka1';
@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {
  korisnik: User;
  constructor(private servis: UserService,private servisRadionica: RadionicaService,private http: HttpClient) { }
  uri='http://127.0.0.1:4000'
  ime: string;
  prezime: string;
  korisnickoIme: string;
  telefon: string;
  email: string;
  mojeRadionice: Radionica[]=[];
  sveRadionice: Radionica[]=[];
  prisustvo: Prisustvo[]=[];
  lajkovi: Lajk[]=[];
  lajkovaneRadionice: Radionica[]=[];
  mojiKomentar: mojiKomentari[]=[];
  noviKomentar: string;
  poruke: Poruke[]=[];
  novaPoruka: string;
  dataNew: any = {};
  sve: Radionica[]=[];
  slika: string
  sad: number
   ngOnInit(){
    this.sad=new Date().getTime()
    let korisnickoIme=localStorage.getItem('korisnickoIme')
    this.korisnickoIme=korisnickoIme;
    this.servis.dohvatiKorisnika(korisnickoIme).subscribe((user: User)=>{
      this.ime=user.ime;
      this.prezime=user.prezime;
      this.korisnickoIme=user.korisnickoIme;
      this.telefon=user.telefon;
      this.email=user.email;
      this.slika=user.slika
    })
     this.servisRadionica.mojeRadionice(korisnickoIme).subscribe((data: Prisustvo[])=>{
        this.prisustvo=data;
        this.servisRadionica.sveRadionice().subscribe((data1: Radionica[])=>{
          this.sveRadionice=data1;
          this.prisustvo.forEach(element => {
            this.sveRadionice.forEach(element1 => {
                let d=new Date(element1.datum).getTime()
                let now=Date.now()
                if(element.idRad==element1.id && (d<now)){
                  this.mojeRadionice.push(element1)
                }
               
            });
          });
      }) 
      
    })
    this.servisRadionica.dohvatiLajkove(korisnickoIme).subscribe((data: Lajk[])=>{
      this.lajkovi=data;
      this.servisRadionica.sveRadionice().subscribe((data1: Radionica[])=>{
        this.sveRadionice=data1;
        this.lajkovi.forEach(element => {
          this.sveRadionice.forEach(element1 => {
              if(element.idRad==element1.id){
                this.lajkovaneRadionice.push(element1)
              }
          });
        });
        this.sveRadionice.forEach(element => {
         let kom= new mojiKomentari();
         kom.tekst=new Array<String>;
         kom.naziv=element.naziv;
          element.komentari.forEach(element1 => {
             
              kom.idR=element.id;
              if(element1.korisnickoIme==this.korisnickoIme){
              
                kom.tekst.push(element1.tekst);
              }
          }
          )
          if(kom.tekst.length!=0){
            this.mojiKomentar.push(kom);
          }
          
        });
        
      }) 
    })
    this.servisRadionica.poruke(korisnickoIme).subscribe((data: Poruke[])=>{
      if(data.length>0){
        this.poruke=data;
        this.poruke.reverse();
      }
    })

    }
    
    sortirajNaziv(){
      this.mojeRadionice.sort((n1,n2) => {
        if (n1.naziv > n2.naziv) {
            return 1;
        }
    
        if (n1.naziv < n2.naziv) {
            return -1;
        }
    
        return 0;
    });
    }
    sortirajDatum(){
      this.mojeRadionice.sort((n1,n2) => {
        if (n1.datum > n2.datum) {
            return 1;
        }
    
        if (n1.datum < n2.datum) {
            return -1;
        }
    
        return 0;
    });
    }
    sortirajMesto(){
      this.mojeRadionice.sort((n1,n2) => {
        if (n1.mesto > n2.mesto) {
            return 1;
        }
    
        if (n1.mesto < n2.mesto) {
            return -1;
        }
    
        return 0;
    });
    }
    sortirajBrojLajkova(){
      this.mojeRadionice.sort((n1,n2) => {
        if (n1.brojLajkova > n2.brojLajkova) {
            return -1;
        }
    
        if (n1.brojLajkova < n2.brojLajkova) {
            return 1;
        }
    
        return 0;
    });
    }

    obrisiLajk(idRad){
      this.servisRadionica.obrisiLajk(idRad, this.korisnickoIme).subscribe((resp)=>{
        let poruka=resp['poruka']
      })
      location.reload();
    }
    azurirajKomentar(idRad, komentar){
      this.servisRadionica.azurirajKomentar(idRad, komentar,this.noviKomentar).subscribe((resp)=>{
        let x=1+1
        let poruka=resp['poruka']
        
      })
      location.reload();
      
    }
    obrisiKomentar(idRad, komentar){
      this.servisRadionica.obrisiKomentar(idRad, komentar).subscribe((resp)=>{
        let x=1+1
        let poruka=resp['poruka']
       
      })
      location.reload();
    }
    posaljiPoruku(idRad,i){
      let nova= new Poruka();
      nova.datum=new Date();
      nova.from=this.korisnickoIme;
      nova.poruka=this.dataNew[i];
      this.servisRadionica.posaljiPoruku(idRad, nova, this.korisnickoIme).subscribe((resp)=>{
        let poruka=resp['poruka']
      })
      location.reload();
    }
  }


 

