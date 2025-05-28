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

    console.log(newURL);
    

    await newUrl.save();
    res.status(200).send({ success: true, short_url: newURL });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
};
