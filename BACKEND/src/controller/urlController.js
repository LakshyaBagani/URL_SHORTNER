import { generateNanoId } from "../utils/generateNanoid.js";
import urlSchema from "../models/urlModel.js";

export const createshortUrl = async (req, res) => {
  const { url } = req.body;
  try {
    let shortUrl;
    let isUnique = false;

    while (!isUnique) {
      shortUrl = generateNanoId(7);
      const existing = await urlSchema.findOne({ short_url: shortUrl });
      if (!existing) {
        isUnique = true;
      }
    }

    const newURL = `http://localhost:3000/${shortUrl}`
    const newUrl = new urlSchema({
      full_urls: url,
      short_urls: shortUrl,
    });
    
    await newUrl.save();
    res.status(200).send({ success: true, short_url: newURL });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
};



export const redirectToShortUrl = async (req, res) => {
  const { short_url } = req.params;
  try {
    const url = await urlSchema.findOne({ short_urls: short_url });
    if (url) {
      res.redirect(url.full_urls);
    } else {
      res.status(404).send("NOT FOUND");
    }
  } catch (error) {
    res.status(404).send({ success: false, error: error.message });
  }
};


export const getAllUrls = async (req,res)=>{
    const userId = req.user._id;
    try {
      const urls = await urlSchema.findOne({userId})
      res.status(200).message({success:true , urls});
    } catch (error) {
      res.status(500).send({success:false , message:error.message})
    }
}