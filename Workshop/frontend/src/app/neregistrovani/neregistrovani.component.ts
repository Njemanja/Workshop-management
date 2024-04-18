import { Component } from '@angular/core';
import { RadionicaService } from '../radionica.service';
import { Radionica } from '../models/radionica';
import { NodeWithI18n } from '@angular/compiler';
@Component({
  selector: 'app-neregistrovani',
  templateUrl: './neregistrovani.component.html',
  styleUrls: ['./neregistrovani.component.css']
})
export class NeregistrovaniComponent {
  constructor(private servis: RadionicaService){}
  radionice: Radionica[]=[];
  top5: Radionica[]=[];
  naziv: string;
  mesto: string;

  ngOnInit():void{
    window.onload=this.obrisiDivove;
    this.dat=false;
    this.naz=false;
    this.servis.sveRadionice().subscribe((data: Radionica[])=>{
      //this.radionice=data;
      data.forEach(element => {
        let datum=new Date(element.datum).getTime()
        if(element.status!=0 && datum>Date.now() ){
          this.radionice.push(element)
        }
      });
      this.top5=data.sort((n1,n2) => {
        if (n1.brojLajkova > n2.brojLajkova) {
            return -1;
        }
    
        if (n1.brojLajkova < n2.brojLajkova) {
            return 1;
        }
    
        return 0;
    });
      this.top5=this.top5.slice(0,5) //5
    })
  }
  dat: boolean;
  naz: boolean;
  pretrazi(){
    if(!this.naziv){
      this.naziv=""
    }if(!this.mesto){
      this.mesto=""
    }
    this.servis.pretrazi(this.naziv, this.mesto).subscribe((data: Radionica[])=>{
      this.radionice=[];
      data.forEach(element => {
        let datum=new Date(element.datum).getTime()
        if(element.status!=0 && datum>Date.now() ){
          this.radionice.push(element)
        }
      });
      if(data.length!=0){
        this.dat=true;
        this.naz=true;
      }
    })
  }

  sortirajNaziv(){
    this.radionice.sort((n1,n2) => {
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
    this.radionice.sort((n1,n2) => {
      if (n1.datum > n2.datum) {
          return 1;
      }
  
      if (n1.datum < n2.datum) {
          return -1;
      }
  
      return 0;
  });
  }

  obrisiDivove(){
    const divovi = document.getElementsByClassName('radionica');
    for(let i=0; i<divovi.length; i++){
      let a=divovi[i] as HTMLDivElement
      let b=a.innerHTML

      if(a.childNodes.length === 1){
        a.remove()
        i-=1
      }
    }
  }
}
