import { generateNanoId } from "../utils/generateNanoid.js";
import urlSchema from "../models/urlModel.js";

export const createshortUrl = async (req, res) => {
  const { url } = req.body;
  try {
    let shortUrl = generateNanoId(7);
    const existingUrl = await urlSchema.findOne({ short_Url: shortUrl });

    if (existingUrl) {
      shortUrl = generateNanoId(8);
    }

    const newUrl = new urlSchema({
      full_Url: url,
      short_Url: shortUrl,
    });

    await newUrl.save();

    

    res.status(200).send(shortUrl);
  } catch (error) {
    res.status(404).send({ success: false, error: error.message });
  }
};
