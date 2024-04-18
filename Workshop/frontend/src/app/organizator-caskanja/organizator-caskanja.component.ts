import { Component } from '@angular/core';
import { disableDebugTools } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { json } from 'stream/consumers';
import { Poruke } from '../models/poruka';
import { Poruka } from '../models/poruka1';
import { RadionicaService } from '../radionica.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-organizator-caskanja',
  templateUrl: './organizator-caskanja.component.html',
  styleUrls: ['./organizator-caskanja.component.css']
})

export class OrganizatorCaskanjaComponent {
  constructor(private servis: UserService, private route: ActivatedRoute,private servisRad: RadionicaService){}
  poruke: Poruke[]=[]
  dataNew: any = {};
  id: number;
  korisnickoIme: string;
  prikazi: [];
  nizOtvorenih: number[];
  ngOnInit(){
    window.onload=this.inicijalizacija;
    this.nizOtvorenih=JSON.parse(localStorage.getItem("nizOtvorenih"))
    if(!this.nizOtvorenih){
      this.nizOtvorenih=[];
    }
    this.korisnickoIme=localStorage.getItem("korisnickoIme")
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.servisRad.poruke1(this.id).subscribe((data: Poruke[])=>{
        this.poruke=data;
        
        this.poruke.sort((a, b) => {
          if (a.poruke[a.poruke.length-1].datum < b.poruke[b.poruke.length-1].datum ) {
            return 1;
          }
          if (a.poruke[a.poruke.length-1].datum  > b.poruke[b.poruke.length-1].datum ) {
            return -1;
          }
          return 0;
        });
        localStorage.setItem("broj", JSON.stringify(this.poruke.length))
    })
    
  }
  
  
  posaljiPoruku(idRad,i, k1){
    let nova= new Poruka();
    nova.datum=new Date();
    nova.from=this.korisnickoIme;
    nova.poruka=this.dataNew[i];
    this.servisRad.posaljiPoruku(idRad, nova, k1).subscribe((resp)=>{
      let poruka=resp['poruka']
      this.servisRad.poruke1(this.id).subscribe((data: Poruke[])=>{
        this.poruke=data;
        location.reload();
      })
        
    })
   
  }
  zatvori(id){
    this.nizOtvorenih = this.nizOtvorenih.filter((item) => item !== id);
    localStorage.setItem("nizOtvorenih", JSON.stringify(this.nizOtvorenih))
    let div=document.getElementById("zatvori_"+id)
    div.style.display='none'

  }
  otvori(id){
    this.nizOtvorenih.push(id)
    localStorage.setItem("nizOtvorenih", JSON.stringify(this.nizOtvorenih))
    let div=document.getElementById("zatvori_"+id)
    div.style.display='block'
  }

  inicijalizacija(){
    /*let broj=JSON.parse(localStorage.getItem("broj"))
    this.nizOtvorenih=JSON.parse(localStorage.getItem("nizOtvorenih"))
    for(let i=0; i<broj; i++ ){
      if(this.nizOtvorenih.includes(i)){
        this.nizOtvorenih.push(i)
        localStorage.setItem("nizOtvorenih", JSON.stringify(this.nizOtvorenih))
        let div=document.getElementById("zatvori_"+i)
        div.style.display='block'
      }
    }*/
  }

}
declare const window: Window;

