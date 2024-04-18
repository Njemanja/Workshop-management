import { Binary } from "@angular/compiler";
import { ObjectEncodingOptions } from "fs";
import { Komentar } from "./komentar";

export class Radionica{
    id: number;
    naziv: string;
    datum: Date;
    slika: string;
    mesto: string;
    opis: number;
    brojLajkova: number;
    komentari: Array<Komentar> ;
    organizator: string;
    galerija: Array<String>;
    status: number;
    duziOpis: string;
    slobodnaMesta: number;
}