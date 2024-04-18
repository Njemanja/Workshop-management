import mongoose from "mongoose";

const Schema= mongoose.Schema;
let novaLozinka= new Schema({
    email:{
        type: String
    },lozinka:{
        type: String},
    datum:{
        type: Date
    }
})
export default mongoose.model('novaLozinka', novaLozinka, 'novaLozinka')