import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const Schema= mongoose.Schema;
let User= new Schema({
    ime:{
        type: String
    },prezime:{
        type: String
    },
    korisnickoIme:{
        type: String
    },
    lozinka:{
        type: String
    },
    telefon:{
        type: String
    },email:{
        type: String
    },
    nazivOrganizacije:{
        type: String
    },
    drzava:{
        type: String
    },
    grad:{
        type: String
    },
    postanskiBroj:{
        type: String
    },
    ulica:{
        type: String
    },
    broj:{
        type: String
    },
    maticniBrojOrganizacije:{
        type: String
    },
    tip:{
        type: Number
    }, status:{
        type: String
    },slika:{
        type: String
    }
})
export default mongoose.model('User', User, 'users')