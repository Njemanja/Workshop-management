import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }


  uri='http://127.0.0.1:4000'

  prihvatiRadionicu(idRad, korisnickoIme){
    const data={
      idRad: idRad,
      korisnickoIme: korisnickoIme
    }
    return this.http.post(`${this.uri}/radionica/prihvatiRadionicu`, data);
  }
  obrisiRadionicu(idRad){
    const data={
      idRad: idRad
    }
    return this.http.post(`${this.uri}/radionica/obrisiRadionicu`, data);
  }
  azurirajRadionicu(idRad, parametar, novaVrednost){
    const data={
      idRad: idRad,
      parametar: parametar,
      novaVrednost: novaVrednost
    }
    return this.http.post(`${this.uri}/radionica/azurirajRadionicu`, data);
  }

  sveKoordinate(){
    const data={
      k: 1
    }
    return this.http.post(`${this.uri}/radionica/sveKoordinate`, data);
  }
}
