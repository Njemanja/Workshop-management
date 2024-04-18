import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Radionica } from '../models/radionica';
import { RadionicaService } from '../radionica.service';
import * as L from 'leaflet';
import { Koordinate } from '../models/koordinate';
import { AdminService } from '../admin.service';
@Component({
  selector: 'app-informacije-radionice',
  templateUrl: './informacije-radionice.component.html',
  styleUrls: ['./informacije-radionice.component.css']
})
export class InformacijeRadioniceComponent {
  id: number;
  sveRadionice: Radionica[]=[];
  sve: Radionica[]=[];
  trenutnaRadionica: Radionica;
  svaMesta: Koordinate[]=[]
  x: any;
  y: any;
  constructor(private route: ActivatedRoute, private servis: RadionicaService, private as: AdminService) { }
  private map;
  ngOnInit() {
    this.x=0
    this.y=0
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.servis.sveRadionice().subscribe((data: Radionica[])=>{
      this.sveRadionice=data;
      this.sveRadionice.forEach(element => {
        
        if(element.id==this.id){
          this.trenutnaRadionica=element;
        }
      });
      this.as.sveKoordinate().subscribe((data: Koordinate[])=>{
        this.svaMesta=data;
        this.svaMesta.forEach(element => {
          if(element.mesto==this.trenutnaRadionica.mesto){
              this.x=element.x;
              this.y=element.y;
          }
        });
        this.map = L.map('map').setView([this.x, this.y], 13);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
        var marker = L.marker([this.x, this.y]).addTo(this.map);
    })
    })
  }
  
}
