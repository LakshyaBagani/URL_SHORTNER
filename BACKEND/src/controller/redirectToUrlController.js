import urlSchema from "../models/urlModel.js";

export const redirectToShortUrl = async (req, res) => {
  const { short_url } = req.params;
  try {
    const url = await urlSchema.findOne({ short_Url: short_url });
    if (url) {
      res.redirect(url.full_Url);
    } else {
      res.status(404).send("NOT FOUND");
    }
  } catch (error) {
    res.status(404).send({ success: false, error: error.message });
  }
};
