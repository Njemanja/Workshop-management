import { HttpClient } from '@angular/common/http';
import { NodeWithI18n } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { concatAll } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RadionicaService {

  constructor(private http: HttpClient) { }

  uri='http://127.0.0.1:4000'
  sveRadionice(){
    
    return this.http.get(`${this.uri}/radionica/sve`)
  }
  pretrazi(naziv,mesto){
    const data={
      naziv: naziv,
      mesto: mesto
    }
    return this.http.post(`${this.uri}/radionica/pretrazi`, data)
  }

   mojeRadionice(korisnickoIme){
    const data={
      korisnickoIme:korisnickoIme
    }
    return this.http.post(`${this.uri}/radionica/moje`, data)
  }
  jednaRadionica(idRad){
    const data={
        idRad: idRad
    }
    return this.http.post(`${this.uri}/radionica/jednaRadionica`, data)
  }
  dohvatiLajkove(korisnickoIme){
    const data={
      korisnickoIme: korisnickoIme
    }
    return this.http.post(`${this.uri}/radionica/lajkovi`, data)
  }
  obrisiLajk(idRad, korisnickoIme){
    const data={
        idRad: idRad,
        korisnickoIme: korisnickoIme
    }
    return this.http.post(`${this.uri}/radionica/obrisiLajk`, data)
  }

  azurirajRadionicu(idRad, parametar, novaVrednost){
    const data={
      idRad: idRad,
      parametar: parametar,
      novaVrednost: novaVrednost
    }
    return this.http.post(`${this.uri}/radionica/azurirajRadionicu`, data);
  }
  azurirajKomentar(idRad, komentar, noviKomentar){
    const data={
      idRad: idRad,
      komentar: komentar,
      noviKomentar: noviKomentar
    }
  return this.http.post(`${this.uri}/radionica/azurirajKomentar`, data)
  }
  obrisiKomentar(idRad, komentar){
    const data={
      idRad: idRad,
      komentar: komentar,
    }
  return this.http.post(`${this.uri}/radionica/obrisiKomentar`, data)
  }
  poruke(korisnickoIme){
    const data={
      korisnickoIme: korisnickoIme
    }
  return this.http.post(`${this.uri}/radionica/poruke`, data)
  }
  posaljiPoruku(idRad, novaPoruka, korisnickoIme){
    const data={
      korisnickoIme: korisnickoIme,
      idRad: idRad,
      novaPoruka: novaPoruka
    }
  return this.http.post(`${this.uri}/radionica/posaljiPoruku`, data)
  }
  posaljiPoruku1(idRad, novaPoruka, korisnickoIme){
    const data={
      korisnickoIme: korisnickoIme,
      idRad: idRad,
      novaPoruka: novaPoruka
    }
  return this.http.post(`${this.uri}/radionica/posaljiPoruku1`, data)
  }

  prijave( korisnickoIme){
    const data={
      korisnickoIme: korisnickoIme
    }
  return this.http.post(`${this.uri}/radionica/svePrijave`, data)
  }
  prijave1(){
    const data={
    }
  return this.http.post(`${this.uri}/radionica/svePrijave1`, data)
  }

  obrisiPrijavu( korisnickoIme, idRad){
    const data={
      idRad: idRad,
      korisnickoIme: korisnickoIme
    }
  return this.http.post(`${this.uri}/radionica/obrisiPrijavu`, data)
  }

  dodajLajk( korisnickoIme, idRad){
    const data={
      idRad: idRad,
      korisnickoIme: korisnickoIme
    }
  return this.http.post(`${this.uri}/radionica/dodajLajk`, data)
  }
  sviLajkovi( ){
  return this.http.post(`${this.uri}/radionica/sviLajkovi`, null)
  }
  dodajKomentar( korisnickoIme, idRad, slika, tekst){
    let datum= Date.now();
    const data={
      idRad: idRad,
      korisnickoIme: korisnickoIme,
      tekst: tekst,
      slika: slika,
      datum: datum
    }
  return this.http.post(`${this.uri}/radionica/dodajKomentar`, data)
  }
  dodajRadionicu(idRad,naziv,datum,mesto,opis,file,brojLajkova,
  komentari,galerija,organizator,status, duziOpis, slobodnaMesta){
  const data={
      idRad: idRad,
      naziv: naziv,
      opis: opis,
      mesto: mesto,
      slika: file,
      datum: datum,
      brojLajkova: brojLajkova,
      komentari: komentari,
      galerija: galerija,
      organizator: organizator,
      status: status,
      duziOpis: duziOpis,
      slobodnaMesta: slobodnaMesta
  }

  return this.http.post(`${this.uri}/radionica/dodajRadionicu`, data)
  }

  prijaviMe(idRad,datum,korisnickoIme){
    const data={
        idRad: idRad,
        korisnickoIme: korisnickoIme,
        datum: datum
    }
    return this.http.post(`${this.uri}/radionica/prijaviMe`, data)
  }
  svaObavestenja(idRad){
    const data={
        idRad: idRad,
    }
    return this.http.post(`${this.uri}/radionica/svaObavestenja`, data)
  }
  obrisiObavestene(idRad){
    const data={
        idRad: idRad,
    }
    return this.http.post(`${this.uri}/radionica/obrisiObavestene`, data)
  }
  sacuvajZaObavestenje(idRad, email){
    const data={
        idRad: idRad,
        email: email
    }
    return this.http.post(`${this.uri}/radionica/sacuvajZaObavestenje`, data)
  }

  posaljiZaOtkazivanje(idRad, email){
    const data={
        idRad: idRad,
        email: email
    }
    return this.http.post(`${this.uri}/radionica/posaljiZaOtkazivanje`, data)
  }

  svePrijaveIDRad(idRad){
    const data={
        idRad: idRad
    }
    return this.http.post(`${this.uri}/radionica/svePrijaveIDRad`, data)
  }

  prihvati(idRad, koriscnikoIme){
    const data={
      idRad: idRad,
      koriscnikoIme: koriscnikoIme
    }
    return this.http.post(`${this.uri}/radionica/prihvatiPrijavu`, data)
  }
  poruke1(idRad){
    const data={
      idRad: idRad,
     
    }
    return this.http.post(`${this.uri}/radionica/poruke1`, data)
  }
}
