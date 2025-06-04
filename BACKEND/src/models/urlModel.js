import mongoose from "mongoose";

const shortUrlSchema = new mongoose.Schema({
  full_urls: {
    type: String,
    required: true,
  },
  short_urls: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  qrLink:{
    type:String,
    default:""
  },
  clicks: {
    type: Number,
    default: 0,
  },
  
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const ShortUrl = mongoose.model("ShortUrl", shortUrlSchema);
export default ShortUrl;
