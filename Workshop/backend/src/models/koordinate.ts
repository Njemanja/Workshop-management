
import mongoose from "mongoose";
const Schema= mongoose.Schema;
let Koordinate= new Schema({
    mesto:{
        type:String
    },
    x:{
        type: Number
    },
    y:{
        type:Number
    }
    
})
export default mongoose.model('Koordinate', Koordinate, 'koordinate')