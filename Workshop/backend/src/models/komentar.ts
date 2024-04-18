
import mongoose from "mongoose";
const Schema= mongoose.Schema;
let Komentar= new Schema({
    korisnickoIme:{
        type:String
    },
    tekst:{
        type:Array
    },
    
})
export default mongoose.model('Komentar', Komentar, 'komentar')