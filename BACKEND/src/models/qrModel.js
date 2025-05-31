import mongoose from 'mongoose'

const qrSchema =  new mongoose.Schema({
    qrLink : {type:String , required:true},
    url : {type:String , required:true}
})

const qrCode = mongoose.model("QR" , qrSchema);
export default qrCode;