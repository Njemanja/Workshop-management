import { FILE } from "dns";
import { Binary, Int32, ObjectId } from "mongodb";
import mongoose from "mongoose";

const Schema= mongoose.Schema;
let Radionica= new Schema({
    /*_id:{
        type: ObjectId
    },*/
    id:{
        type:Number
    },
    naziv:{
        type: String
    },
    datum:{
        type: Date
    },
    mesto:{
        type: String
    },
    opis:{
        type: String
    },
    duziOpis:{
        type: String
    },
    slika:{
        type: String
    },
    brojLajkova:{
        type: Number
    },
    komentari:{
        type: Array
    },
    galerija:{
        type: Array
    },
    status:{
        type: Number
    },
    organizator:{
        type: String
    },
    slobodnaMesta: {
        type: Number
    }
})
export default mongoose.model('Radionica', Radionica, 'radionica')