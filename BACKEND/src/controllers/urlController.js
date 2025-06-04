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

    const newURL = `http://localhost:3000/url/${shortUrl}`
    const newUrl = new urlSchema({
      full_urls: url,
      short_urls: shortUrl,
    });
    
    await newUrl.save();
    res.status(200).send({ success: true, short_url: newURL , shortUrl });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
};


export const redirectToShortUrl = async (req, res) => {
  const { short_url } = req.params;
  console.log("🔗 Requested short URL:", short_url);

  try {
    const url = await urlSchema.findOne({ short_urls: short_url });
    console.log("🔍 Found URL:", url);

    if (url) {
      return res.redirect(url.full_urls);
    } else {
      return res.status(404).send("NOT FOUND");
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send({ success: false, error: error.message });
  }
};


export const getAllUrls = async (req, res) => {
  try {
    const urls = await urlSchema.find(); 
    res.status(200).json({ success: true, urls }); 
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
}

