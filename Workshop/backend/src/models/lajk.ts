
import mongoose from "mongoose";
const Schema= mongoose.Schema;
let Lajk= new Schema({
    
    idRad:{
        type:Number
    },
    korisnickoIme:{
        type:String
    },
})
export default mongoose.model('Lajk', Lajk, 'lajk')