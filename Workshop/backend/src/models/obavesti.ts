import mongoose from "mongoose";

const Schema= mongoose.Schema;
let Obavesti= new Schema({
    email:{
        type: String
    },
    idRad:{
        type:Number
    }
})
export default mongoose.model('Obavesti', Obavesti, 'obavesti')