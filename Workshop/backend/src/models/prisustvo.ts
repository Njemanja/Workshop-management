import { Binary, Int32 } from "mongodb";
import mongoose from "mongoose";

const Schema= mongoose.Schema;
let Prisustvo= new Schema({
    idRad:{
        type:Number
    },
    korisnickoIme:{
        type:String
    },
})
export default mongoose.model('Prisustvo', Prisustvo, 'prisustvo')