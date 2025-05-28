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
    console.log("shortUrl to be saved:", shortUrl);

    const newUrl = new urlSchema({
      full_urls: url,
      short_urls: shortUrl,
    });

    await newUrl.save();
    res.status(200).send({ success: true, short_url: shortUrl });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
};
