import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  uri='http://127.0.0.1:4000'

  login(korisnickoIme, lozinka){
    const data={
      korisnickoIme: korisnickoIme,
      lozinka: lozinka
    }
    return this.http.post(`${this.uri}/users/login`, data);
  }
  adminLogin(korisnickoIme, lozinka){
    const data={
      korisnickoIme: korisnickoIme,
      lozinka: lozinka
    }
    return this.http.post(`${this.uri}/admin/login`, data);
  }

  register(ime, prezime, korisnickoIme, lozinka,telefon, email, slika){
      const data={
        ime: ime,
        prezime: prezime,
        korisnickoIme: korisnickoIme,
        lozinka: lozinka,
        telefon: telefon,
        email: email,
        nazivOrganizacije: "",
        drzava: "",
        grad: "",
        postanskiBroj: "",
        ulica: "",
        broj: "",
        tip:1,
        slika: slika
      }
      return this.http.post(`${this.uri}/users/register`, data);
  }
  register1(ime, prezime, korisnickoIme, lozinka,telefon, email, slika,nazivOrganizacije,
    drzava, grad, postanskiBroj,ulica,broj, maticniBrojOrganizacije){
    if(!nazivOrganizacije){
      nazivOrganizacije=""
    }
    if(!drzava){
      drzava=""
    }
    if(!grad){
      grad=""
    }
    if(!postanskiBroj){
      postanskiBroj=""
    }
    if(!ulica){
      ulica=""
    }
    if(!broj){
      broj=""
    }
    if(!maticniBrojOrganizacije){
      maticniBrojOrganizacije=""
    }
    const data={
      ime: ime,
      prezime: prezime,
      korisnickoIme: korisnickoIme,
      lozinka: lozinka,
      telefon: telefon,
      email: email,
      nazivOrganizacije: nazivOrganizacije,
      drzava: drzava,
      grad: grad,
      postanskiBroj:postanskiBroj,
      ulica: ulica,
      broj: broj,
      tip:2,
      slika:slika,
      maticniBrojOrganizacije: maticniBrojOrganizacije
    }
    return this.http.post(`${this.uri}/users/register`, data);}
  novaLozinka(email, novaLozinka){
    const data={
      email: email,
      novaLozinka: novaLozinka,
    }
    return this.http.post(`${this.uri}/users/novaLozinka`, data);
  }

  promenaLozinke(korisnickoIme,staraLozinka, novaLozinka){
    const data={
      korisnickoIme: korisnickoIme,
      staraLozinka: staraLozinka,
      novaLozinka:novaLozinka,
    }
    return this.http.post(`${this.uri}/users/promenaLozinke`, data);
  }

  dohvatiKorisnika(korisnickoIme){
    const data={
      korisnickoIme: korisnickoIme,
    }
    return this.http.post(`${this.uri}/users/dohvatiKorisnika`, data);
  }
  dohvatiSveKorisnike(){
    const data=null;
    return this.http.post(`${this.uri}/users/dohvatiSveKorisnike`, data);
  }
  
  azuriraj(novo, tip, staraLozinka){
    const data={
      novo: novo,
      tip: tip,
      korisnickoIme: localStorage.getItem('korisnickoIme'),
      staraLozinka: staraLozinka
    }
    return this.http.post(`${this.uri}/users/azuriraj`, data);
  }
  azuriraj1(novo, tip, korisnickoIme){
    const data={
      novo: novo,
      tip: tip,
      korisnickoIme: korisnickoIme
    }
    return this.http.post(`${this.uri}/users/azuriraj`, data);
  }
  azurirajKorisnika(korisnickoIme,parametar, novaVrednost){
    const data={
      korisnickoIme: korisnickoIme,
      parametar: parametar,
      novaVrednost: novaVrednost
    };
    return this.http.post(`${this.uri}/users/azurirajKorisnika`, data);
  }
  obrisiKorisnika(korisnickoIme){
    const data={
      korisnickoIme: korisnickoIme
    };
    return this.http.post(`${this.uri}/users/obrisiKorisnika`, data);
  }
  posaljiMejl(idRad, email){
    const data={
      idRad: idRad,
      email: email
    };
    return this.http.post(`${this.uri}/users/posaljiMejl`, data);
  }
 
  
}
