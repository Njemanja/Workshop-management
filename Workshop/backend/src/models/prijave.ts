
import mongoose from "mongoose";
const Schema= mongoose.Schema;
let Prijave= new Schema({
    korisnickoIme:{
        type:String
    },
    idRad:{
        type: Number
    },
    status:{
        type: Number
    }
})
export default mongoose.model('Prijave', Prijave, 'prijave')