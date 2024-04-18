import { Binary } from "@angular/compiler";
import { Komentar } from "./komentar";

export class CelaPrijava{
    idRad: Number;
    naziv: string;
    datum: Date;
    mesto: string;
    nemaVremena: boolean;
    brojLajkova: Number;
    komentari: Array<Komentar>;
    zavrsena: boolean;
    status: Number;
}