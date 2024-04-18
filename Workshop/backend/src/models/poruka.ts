import mongoose from "mongoose";

const Schema= mongoose.Schema;
let Poruka= new Schema({
    korisnickoIme1:{
        type: String
    },
    korisnickoIme2:{
        type: String
    },
    slika1:{
        type: String
    },
    slika2:{
        type: String
    },
    poruke:{
        type: Array
    },
    idRad:{
        type: Number
    },
    naziv:{
        type: String
    },

})
export default mongoose.model('Poruka', Poruka, 'poruka')